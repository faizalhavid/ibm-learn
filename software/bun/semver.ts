const appVersion = "1.2.3";

console.info(Bun.semver.satisfies(appVersion, "1.x.x")); // true
console.info(Bun.semver.satisfies(appVersion, "1.2.x")); // true
console.info(Bun.semver.satisfies(appVersion, "1.2.3")); // true
console.info(Bun.semver.satisfies(appVersion, "1.2.4")); // false
console.info(Bun.semver.satisfies(appVersion, "1.3.x")); // false
console.info(Bun.semver.satisfies(appVersion, "2.x.x")); // false
console.info(Bun.semver.satisfies(appVersion, ">=1.2.3")); // true
console.info(Bun.semver.satisfies(appVersion, "<1.2.3")); // false
console.info(Bun.semver.satisfies(appVersion, ">=1.2.3 <1.3.0")); // true
console.info(Bun.semver.satisfies(appVersion, ">=1.2.3 <1.2.4")); // true
console.info(Bun.semver.satisfies(appVersion, ">=1.2.3 <1.2.3")); // false
console.info(Bun.semver.satisfies(appVersion, ">=1.2.3 <1.2.2")); // false
console.info(Bun.semver.satisfies(appVersion, ">=1.2.3 <1.2.3")); // false