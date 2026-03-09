const { default: axios } = require("axios");
const fs = require("fs");
const readline = require("readline");

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

function separator(label = "") {
    const line = "─".repeat(50);
    console.log(label ? `\n┌${line}\n│  ${label}\n└${line}` : `\n└${"─".repeat(50)}`);
}

function ask(rl, question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function fetchYoutubeData(query, { hl = "en", gl = "US", sortBy = "" } = {}) {
    let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=${hl}&gl=${gl}`;
    if (sortBy) url += `&sp=${encodeURIComponent(sortBy)}`;
    const { data } = await axios.get(url, {
        headers: { "Accept-Language": `${hl};q=0.9,en;q=0.8` },
    });
    const match = data.match(/var ytInitialData\s*=\s*(\{.*?\});/s);
    if (!match) throw new Error("ytInitialData not found in response");
    return JSON.parse(match[1]);
}

// ─────────────────────────────────────────────
//  URL / PARAM CRAWLERS
// ─────────────────────────────────────────────

function collectUrls(obj, urls = new Set()) {
    if (typeof obj === "string") {
        if (obj.includes("?") && (obj.startsWith("/") || obj.startsWith("http")))
            urls.add(obj);
    } else if (Array.isArray(obj)) {
        obj.forEach(item => collectUrls(item, urls));
    } else if (obj && typeof obj === "object") {
        Object.values(obj).forEach(v => collectUrls(v, urls));
    }
    return urls;
}

function detectParams(urls) {
    const params = new Map();
    urls.forEach(url => {
        try {
            const full = url.startsWith("http") ? url : `https://www.youtube.com${url}`;
            new URL(full).searchParams.forEach((value, key) => {
                if (!params.has(key)) params.set(key, new Set());
                params.get(key).add(value);
            });
        } catch (_) { }
    });
    return params;
}

function extractVideoIds(urls) {
    const ids = new Set();
    urls.forEach(url => {
        try {
            const full = url.startsWith("http") ? url : `https://www.youtube.com${url}`;
            const parsed = new URL(full);
            if (parsed.pathname === "/watch" && parsed.searchParams.has("v"))
                ids.add(parsed.searchParams.get("v"));
        } catch (_) { }
    });
    return ids;
}

// ─────────────────────────────────────────────
//  SP FILTER DECODER
// ─────────────────────────────────────────────

const SP_FILTERS = {
    "EgIQAQ==": "Sort: Upload Date",
    "EgIQAg==": "Sort: View Count",
    "EgIQCQ==": "Sort: Rating",
    "EgIQBA==": "Sort: Relevance",
    "CAASAhAB": "Type: Video",
    "EgQQARgB": "Type: Video + Sort: Date",
    "EgQQAhgB": "Type: Video + Sort: Views",
    "EgJAAQ==": "Duration: Short (< 4 min)",
    "EgJYAQ==": "Duration: Long (> 20 min)",
    "EgJ4AQ==": "Upload: Last hour",
    "EgIgAQ==": "Upload: Today",
    "EgI4AQ==": "Upload: This week",
};

function decodeSpFilter(spValues, query) {
    return spValues.map(sp => {
        const decoded = decodeURIComponent(sp);
        return {
            sp: decoded,
            meaning: SP_FILTERS[decoded] || `Unknown (${decoded})`,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=${encodeURIComponent(decoded)}`,
        };
    });
}

// ─────────────────────────────────────────────
//  VIEW COUNT PARSER & SORT OPTIONS
// ─────────────────────────────────────────────

const SORT_OPTIONS = {
    "relevance": { label: "Relevance (default)", sp: "" },
    "date": { label: "Upload Date", sp: "EgIQAQ==" },
    "views": { label: "View Count", sp: "EgIQAg==" },
    "rating": { label: "Rating", sp: "EgIQCQ==" },
};

function parseViewCount(text) {
    if (!text) return 0;
    const t = text.replace(/views?/i, "").replace(/,/g, "").replace(/\s/g, "");
    if (/[\d.]+[Bb]/.test(t)) return Math.round(parseFloat(t) * 1_000_000_000);
    if (/[\d.]+[Mm]/.test(t)) return Math.round(parseFloat(t) * 1_000_000);
    if (/[\d.]+[Kk]/.test(t)) return Math.round(parseFloat(t) * 1_000);
    return parseInt(t) || 0;
}

// ─────────────────────────────────────────────
//  MENU ACTIONS
// ─────────────────────────────────────────────

async function menuScrapeVideos(query, filters = {}) {
    const { hl = "en", gl = "US", minViews = 0, sortBy = "" } = filters;
    const sortLabel = Object.values(SORT_OPTIONS).find(o => o.sp === sortBy)?.label ?? "Relevance";
    separator(`Scrape Videos  →  "${query}"  [${gl} / ${hl} / ${sortLabel}]`);
    const json = await fetchYoutubeData(query, { hl, gl, sortBy });
    const contents = json
        ?.contents
        ?.twoColumnSearchResultsRenderer
        ?.primaryContents
        ?.sectionListRenderer
        ?.contents?.[0]
        ?.itemSectionRenderer
        ?.contents ?? [];

    const dataset = [];
    let skipped = 0;

    contents.forEach((item) => {
        const v = item.videoRenderer;
        if (!v) return;

        // Views
        const viewText = v.viewCountText?.simpleText
            ?? (v.viewCountText?.runs ?? []).map(r => r.text).join("")
            ?? "";
        const viewCount = parseViewCount(viewText);
        if (minViews > 0 && viewCount < minViews) { skipped++; return; }

        // Channel
        const channelId = v.ownerText?.runs?.[0]
            ?.navigationEndpoint?.browseEndpoint?.browseId ?? "";
        const isVerified = (v.ownerBadges ?? []).some(b =>
            b?.metadataBadgeRenderer?.tooltip === "Verified" ||
            b?.metadataBadgeRenderer?.tooltip === "Official Artist Channel"
        );

        // Extras
        const badges = (v.badges ?? []).map(b => b?.metadataBadgeRenderer?.label).filter(Boolean);
        const description = (v.descriptionSnippet?.runs ?? []).map(r => r.text).join("").trim();
        const thumbnails = (v.thumbnail?.thumbnails ?? []).map(t => t.url);
        const thumbnail = thumbnails.at(-1) ?? "";

        const record = {
            videoId: v.videoId,
            url: `https://www.youtube.com/watch?v=${v.videoId}`,
            title: v.title?.runs?.[0]?.text ?? "",
            channel: {
                name: v.ownerText?.runs?.[0]?.text ?? "",
                id: channelId,
                url: channelId ? `https://www.youtube.com/channel/${channelId}` : "",
                verified: isVerified,
            },
            views: {
                text: viewText,
                count: viewCount,
            },
            duration: v.lengthText?.simpleText ?? "",
            publishedAt: v.publishedTimeText?.simpleText ?? "",
            description,
            thumbnail,
            thumbnails,
            badges,
            isLive: !!(v.badges ?? []).find(b => b?.metadataBadgeRenderer?.label === "LIVE"),
            meta: {
                query,
                language: hl,
                country: gl,
                sortBy: sortLabel,
                scrapedAt: new Date().toISOString(),
            },
        };

        dataset.push(record);

        console.log(`\n  [${dataset.length}] ${record.title}`);
        console.log(`      Channel  : ${record.channel.name}${record.channel.verified ? " ✓" : ""}`);
        console.log(`      Views    : ${record.views.text}`);
        console.log(`      Duration : ${record.duration || "N/A"}`);
        console.log(`      Published: ${record.publishedAt || "N/A"}`);
        console.log(`      URL      : ${record.url}`);
        if (record.description)
            console.log(`      Desc     : ${record.description.slice(0, 80)}...`);
    });

    // JSONL — one JSON object per line, standard for AI training datasets
    const slug = query.replace(/\s+/g, "_").replace(/[^\w-]/g, "").toLowerCase();
    const filename = `dataset_${slug}_${gl}_${hl}.jsonl`;
    fs.writeFileSync(filename, dataset.map(r => JSON.stringify(r)).join("\n"), "utf8");

    console.log(`\n  ✓ Saved   : ${filename}`);
    console.log(`  Records   : ${dataset.length}  |  Filtered out: ${skipped}`);
    console.log(`  Format    : JSONL (JSON Lines) — ready for AI training`);
}

async function menuDetectParams(query, filters = {}) {
    const { hl = "en", gl = "US" } = filters;
    separator(`Detect URL Params  →  "${query}"  [${gl} / ${hl}]`);
    const json = await fetchYoutubeData(query, filters);
    const allUrls = collectUrls(json);
    const params = detectParams(allUrls);

    params.forEach((values, key) => {
        const examples = [...values].slice(0, 3).join("  |  ");
        console.log(`  ?${key.padEnd(16)} →  ${examples}`);
    });
    console.log(`\n  Total params   : ${params.size}`);
    console.log(`  Total URLs     : ${allUrls.size}`);

    const slug = query.replace(/\s+/g, "_").replace(/[^\w-]/g, "").toLowerCase();
    const filename = `dataset_params_${slug}.json`;
    const paramObj = Object.fromEntries(
        [...params.entries()].map(([k, v]) => [k, [...v]])
    );
    fs.writeFileSync(filename, JSON.stringify({ query, capturedAt: new Date().toISOString(), params: paramObj }, null, 2), "utf8");
    console.log(`  ✓ Saved        : ${filename}`);
}

async function menuExtractVideoIds(query, filters = {}) {
    const { hl = "en", gl = "US" } = filters;
    separator(`Extract Video IDs  →  "${query}"  [${gl} / ${hl}]`);
    const json = await fetchYoutubeData(query, filters);
    const allUrls = collectUrls(json);
    const videoIds = extractVideoIds(allUrls);

    const ids = [...videoIds];
    ids.forEach(id => console.log(`  https://www.youtube.com/watch?v=${id}`));
    console.log(`\n  Total IDs found: ${videoIds.size}`);

    const slug = query.replace(/\s+/g, "_").replace(/[^\w-]/g, "").toLowerCase();
    const filename = `dataset_ids_${slug}.json`;
    const output = {
        query,
        country: gl,
        language: hl,
        capturedAt: new Date().toISOString(),
        total: ids.length,
        videos: ids.map(id => ({
            videoId: id,
            url: `https://www.youtube.com/watch?v=${id}`,
        })),
    };
    fs.writeFileSync(filename, JSON.stringify(output, null, 2), "utf8");
    console.log(`  ✓ Saved          : ${filename}`);
}

async function menuDecodeFilters(query, filters = {}) {
    const { hl = "en", gl = "US" } = filters;
    separator(`Decode ?sp Filters  →  "${query}"  [${gl} / ${hl}]`);
    const json = await fetchYoutubeData(query, filters);
    const allUrls = collectUrls(json);
    const params = detectParams(allUrls);
    const spValues = params.get("sp") ? [...params.get("sp")] : [];

    if (!spValues.length) return console.log("  No ?sp params found.");

    decodeSpFilter(spValues, query).forEach(({ sp, meaning, url }) => {
        console.log(`\n  sp=${sp}`);
        console.log(`     Meaning : ${meaning}`);
        console.log(`     URL     : ${url}`);
    });
}

async function menuDecodeTimestamps(query, filters = {}) {
    const { hl = "en", gl = "US" } = filters;
    separator(`Decode ?t Timestamps  →  "${query}"  [${gl} / ${hl}]`);
    const json = await fetchYoutubeData(query, filters);
    const allUrls = collectUrls(json);
    const params = detectParams(allUrls);
    const tValues = params.get("t") ? [...params.get("t")] : [];

    if (!tValues.length) return console.log("  No ?t params found.");

    tValues.forEach(t => {
        const secs = parseInt(t);
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        console.log(`  t=${t.padEnd(8)} →  ${h}h ${m}m ${s}s`);
    });
}

async function menuSetFilters(rl, filters) {
    let running = true;
    while (running) {
        const sortLabel = Object.values(SORT_OPTIONS).find(o => o.sp === filters.sortBy)?.label ?? "Relevance";
        separator("Set Filters");
        console.log(`  Language  : ${filters.hl}`);
        console.log(`  Country   : ${filters.gl}`);
        console.log(`  Sort by   : ${sortLabel}`);
        console.log(`  Min views : ${filters.minViews.toLocaleString()}`);
        console.log();
        console.log("  ┌─── FILTER MENU ──────────────────────────┐");
        console.log("  │  1. Language   (en, id, ja, ko, fr, de)  │");
        console.log("  │  2. Country    (US, ID, JP, KR, GB, AU)  │");
        console.log("  │  3. Sort by    (relevance/date/views/     │");
        console.log("  │                rating)                   │");
        console.log("  │  4. Min views  (e.g. 1000, 500K, 1M)     │");
        console.log("  │  0. Back                                 │");
        console.log("  └──────────────────────────────────────────┘");

        const choice = await ask(rl, "\n  Choose [0-4]: ");
        switch (choice) {
            case "1": {
                const val = await ask(rl, "  Language code (e.g. en, id, ja, ko): ");
                if (val.trim()) filters.hl = val.trim().toLowerCase();
                break;
            }
            case "2": {
                const val = await ask(rl, "  Country code (e.g. US, ID, JP, KR): ");
                if (val.trim()) filters.gl = val.trim().toUpperCase();
                break;
            }
            case "3": {
                console.log("  Options: relevance | date | views | rating");
                const val = await ask(rl, "  Sort by: ");
                const opt = SORT_OPTIONS[val.trim().toLowerCase()];
                if (opt) { filters.sortBy = opt.sp; console.log(`  Set to: ${opt.label}`); }
                else console.log("  Unknown option, keeping current.");
                break;
            }
            case "4": {
                const val = await ask(rl, "  Min views (e.g. 1000, 500K, 1M): ");
                filters.minViews = parseViewCount(val.trim());
                console.log(`  Min views set to: ${filters.minViews.toLocaleString()}`);
                break;
            }
            case "0": running = false; break;
            default: console.log("  Invalid choice.");
        }
    }
}

// ─────────────────────────────────────────────
//  MAIN MENU
// ─────────────────────────────────────────────

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║        YouTube Scraper  v1.0             ║");
    console.log("╚══════════════════════════════════════════╝");

    let query = await ask(rl, "\n  Search query: ");
    const filters = { hl: "en", gl: "US", minViews: 0, sortBy: "" };

    let running = true;
    while (running) {
        const sortLabel = Object.values(SORT_OPTIONS).find(o => o.sp === filters.sortBy)?.label ?? "Relevance";
        console.log(`\n  Query   : "${query}"`);
        console.log(`  Filters : lang=${filters.hl}  country=${filters.gl}  sort=${sortLabel}  minViews=${filters.minViews.toLocaleString()}`);
        console.log("\n  ┌─── MENU ───────────────────────────┐");
        console.log("  │  1. Scrape video list              │");
        console.log("  │  2. Detect all URL params          │");
        console.log("  │  3. Extract video IDs              │");
        console.log("  │  4. Decode ?sp search filters      │");
        console.log("  │  5. Decode ?t timestamps           │");
        console.log("  │  6. Set filters                   │");
        console.log("  │  7. Change search query            │");
        console.log("  │  0. Exit                           │");
        console.log("  └────────────────────────────────────┘");

        const choice = await ask(rl, "\n  Choose [0-7]: ");

        try {
            switch (choice) {
                case "1": await menuScrapeVideos(query, filters); break;
                case "2": await menuDetectParams(query, filters); break;
                case "3": await menuExtractVideoIds(query, filters); break;
                case "4": await menuDecodeFilters(query, filters); break;
                case "5": await menuDecodeTimestamps(query, filters); break;
                case "6": await menuSetFilters(rl, filters); break;
                case "7": query = await ask(rl, "  New search query: "); break;
                case "0": running = false; break;
                default: console.log("  Invalid choice.");
            }
        } catch (err) {
            console.error("  Error:", err.message);
        }
    }

    rl.close();
    console.log("\n  Goodbye!\n");
}

main();