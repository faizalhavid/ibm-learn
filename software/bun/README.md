# 📘 Bun Learning Cheatsheet

This project is a personal learning log for exploring [**Bun**](https://bun.sh), a fast all-in-one JavaScript runtime. Below is a quick reference guide for common tasks, commands, and concepts within Bun — organized for warm-up, review, and practical use.

---

## 📂 Project Overview

This project includes basic usage of:
- JSX syntax in Bun
- Environment variable handling
- Running with Bun in different modes
- Using Bun's package manager and test runner
- Bun workspace basics
- Bun's built-in module runner

---

## 🧪 Sample Code Snippet (index.tsx)

```tsx
import { testString } from "./functions";

const name = <h1>John</h1>;
console.log(`Hello, ${name.props.children}!`);
```

---

## 🌱 Environment Variables

Bun can read environment variables from `.env` files. Example usage:

```ts
const database = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};
console.info(database);
```

### ✅ Run with a specific environment file

```bash
# On Windows
set NODE_ENV=production
bun --env-file .env.production index.tsx

# On Unix/macOS
NODE_ENV=production bun --env-file .env.production index.tsx
```

---

## 🔄 Run in Watch Mode

Bun can rerun files automatically when changes are made.

```bash
bun --watch index.tsx
```

---

## 📦 Bun Package Manager

Bun offers its own ultra-fast package manager with the following commands:

```bash
# Install a package
bun add react

# Remove a package
bun remove react

# Install all dependencies
bun install

# Install only production dependencies
bun install --prod

# Install only dev dependencies
bun install --dev

# Install peer dependencies
bun install --peer
```

---

## 🧹 Cache Management

```bash
# Clean Bun's cache
bun cache clean

# List cached packages
bun cache list

# Remove a specific cached package
bun cache remove <package-name>
```

---

## 🧪 Testing with Bun

Bun includes a built-in test runner with zero setup.

```bash
# Run all tests
bun test

# Watch for changes and rerun tests
bun test --watch

# Generate code coverage
bun test --coverage

# Update test snapshots
bun test --update-snapshot
```

> To enable autocomplete for `test`, `expect`, etc., add `"types": ["bun"]` in your `tsconfig.json`.

---

## 🚀 Bun Package Runner

Use `bunx` to run CLI tools from npm packages without installing them globally.

```bash
# Example usage
bunx cowsay "Hello from Bun!"
```

---

## 🧱 Workspaces

Bun supports monorepo-style project setups via **workspaces**.

### Example `package.json` (root):

```json
{
  "name": "my-monorepo",
  "workspaces": [
    "packages/*"
  ]
}
```

> All workspace dependencies are hoisted to the root `node_modules/`, improving performance and avoiding duplication.

---


## 📝 Bun Configuration
Bun can be configured using a `bunfig.toml` file in the project root. This file allows you to set various options like entry points, environment variables, and more.
```toml
# Example bunfig.toml
entry = "index.tsx"
env = { NODE_ENV = "production" }
```
---
you can see more details in the [Bunfig Documentation](https://bun.sh/docs/runtime/bunfig).



## 🌐 Bun HTTP Server
Bun includes a built-in HTTP server that can be used to serve static files or create APIs.
```ts
import { serve } from "bun";
const server = serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello, Bun!");
  },
});
console.log(`Server running at http://localhost:${server.port}`);
```
---


## 📂 File I/O
Bun provides a simple API for file operations, similar to Node.js.

```ts
import { readFile, writeFile } from "bun";
async function readAndWriteFile() {
  const data = await readFile("input.txt", "utf-8");
  console.log("File content:", data);
  
  await writeFile("output.txt", "Hello, Bun!");
  console.log("File written successfully.");
}
readAndWriteFile().catch(console.error);
```
---

## 🔐 Hashing
Bun provides built-in support for hashing data using various algorithms.

```ts
import { hash } from "bun";
async function hashData() {
  const data = "Hello, Bun!";
  const hashed = await hash(data, "sha256");
  console.log("Hashed data:", hashed);
}
hashData().catch(console.error);
```
---


<!-- Semantic Versioning -->
## 📅 Bun Semantic Versioning
Bun follows [Semantic Versioning](https://semver.org/) principles. The version number is structured as `MAJOR.MINOR.PATCH`:
- **MAJOR**: Incremented for incompatible API changes.
- **MINOR**: Incremented for new features that are backward-compatible.
- **PATCH**: Incremented for backward-compatible bug fixes.
---

<!-- Bun Build -->
## 🏗️ Bun Build System
Bun includes a powerful build system that can compile TypeScript, JSX, and more. You can use it to bundle your application for production.

```bash
bun build index.tsx --outdir dist
bun build index.tsx --minify --outdir dist
bun build index.tsx --minify --outdir --sourcemap dist

bun run dist/index.js

```

## 🏃 Bun Build as Executable
Bun can compile your application into a single executable file, making it easy to distribute.

```bash
bun build express.ts --compile --minify --sourcemap --outfile dist/express
```
---


## 📌 Notes

- Bun supports **JSX/TSX** out of the box.
- Bun handles **env files**, **modules**, **testing**, **watching**, and **package management** natively.
- This repo serves as a reference and learning log — each section will evolve as I explore more features.

---

## ✅ Next Steps / Learning Goals

- [ ] Learn how to use Bun with React + JSX fully.
- [ ] Explore Bun's transpiler and compiler options.
- [ ] Integrate workspace testing across multiple packages.
- [ ] Benchmark Bun performance vs. Node.






## References
- [Bun Documentation](https://bun.sh/docs)
- [Pak Eko Slides](https://docs.google.com/presentation/d/1zmkKviKIhaZMv1R9d_Zg9tzgnEBSJA-xWmyGzvWM7H0/edit?slide=id.g26d8a671324_0_192#slide=id.g26d8a671324_0_192)