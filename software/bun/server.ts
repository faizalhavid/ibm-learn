Bun.serve({
    port: 3000,
    fetch(request, server) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            return new Response("<h1>Hello, World!</h1>", {
                headers: { "Content-Type": "text/html" },
            });
        } else if (url.pathname === "/api") {
            return new Response(JSON.stringify({ message: "Hello from API!" }), {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response("Not Found", { status: 404 });
        }
    }
});