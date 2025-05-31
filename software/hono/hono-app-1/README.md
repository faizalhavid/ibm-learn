# 🧩 Hono API Cheatsheet

This project uses **[Hono](https://hono.dev/)**, a fast and lightweight web framework for building modern web APIs in **TypeScript**. It includes examples of routing, middleware, validation, cookies, JSX components, and more.

---

## 🚀 Quick Start

Run server (with Bun):

```bash
bun run --hot src/index.tsx
```

---

## 📦 Features Overview

### 1. 🧭 Routing

```ts
app.get('/hello/:name', (c) => c.text(`Hello ${c.req.param('name')}!`));
```

Supported routing features:
- Path params: `/user/:id`
- Optional params: `/user/address/:city?`
- Regex route: `/user/regex/:id{\\d+}`
- Wildcard/slash route: `/user/profile/:name/*`
- Chained routing: `.get().post().delete()`
- Grouped routes with `.basePath()`

---

### 2. 🔧 Context Access

Access HTTP method, headers, URL:

```ts
const method = c.req.method;
const url = c.req.url;
const headers = c.req.header();
```

Return JSON response:

```ts
return c.json({ message: 'Context accessed!' });
```

---

### 3. 📥 Hono Request

Handle JSON body and query parameters:

```ts
const body = await c.req.json();
const query = c.req.query();
```

---

### 4. 📤 Hono Response

```ts
c.text('Plain text');
c.json({ key: 'value' });
c.html('<h1>HTML</h1>');
c.text('Not Found', 404);
c.redirect('https://example.com');
```

---

### 5. ❌ HTTP Exceptions

Using `HTTPException`:

```ts
throw new HTTPException(400, {
  res: new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 })
});
```

Global error handler:

```ts
app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  return c.text('Server Error', 500);
});
```

---

### 6. 🧱 Middleware

Basic middleware chain:

```ts
app.use(async (_, next) => { await next(); });
```

Middleware by route group:

```ts
admin.use(async (c, next) => {
  const token = c.req.header("Authorization");
  if (!token) throw new HTTPException(401);
  await next();
});
```

Built-in middleware:
- `basicAuth({ username, password })`
- `requestId()` for tracing

---

### 7. 🍪 Cookie Helpers

```ts
setCookie(c, 'key', 'value');
getCookie(c); // => { key: 'value' }
deleteCookie(c, 'key');
```

---

### 8. 🧪 Unit Testing with Bun

Test file:

```ts
import { describe, it, expect } from "bun:test";
import app from "../src";

describe("API", () => {
  it("GET /hello/:name", async () => {
    const res = await app.request("/hello/jocko");
    expect(await res.text()).toBe("Hello jocko!");
  });
});
```

Run tests:

```bash
bun test
```

---

### 9. ✅ Validation

#### a. Built-in Hono Validator

```ts
app.post('/posts',
  validator('form', (value, c) => {
    if (!value.body || typeof value.body !== 'string') {
      return c.text('Invalid!', 400);
    }
    return { body: value.body };
  }),
);
```

#### b. Zod Validation

Install dependencies:

```bash
bun add zod @hono/zod-validator
```

```ts
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(3).max(10)
});

app.post('/login',
  zValidator('json', schema),
  async (c) => {
    const body = await c.req.json();
    return c.json({ data: `Hello, ${body.username}` });
  }
);
```

---

### 10. 🧬 JSX Support

Hono supports JSX components using Bun + `.tsx`:

```tsx
app.get('/home', (c) => {
  return c.html(<HomeComponent />);
});
```

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

---

## 🌐 Grouped Routes Example

```ts
const book = new Hono().basePath('/api');

book.get('/', (c) => c.text('List Books'));
book.get('/:id', (c) => c.text(`Book ID: ${c.req.param('id')}`));
book.post('/', (c) => c.text('Create Book'));

app.route('/book', book);
```

---

## 🖼️ Serving Static Files in Hono

Hono provides a convenient way to serve static files (such as images, CSS, or JavaScript) using the `serveStatic` middleware.

For example, to serve files from a `public` directory, you can use:

```typescript
app.use("/public/*", serveStatic({ root: "./" }));
```

---

## 🧠 Summary

Hono is a powerful, ultra-fast, and modern web framework ideal for:
- Edge Functions & Bun
- Type-safe APIs
- Middleware, Auth, Routing
- Developer-friendly experience

---

## 📎 Useful Commands

```bash
bun run --hot src/index.tsx     # Start dev server
bun test                        # Run unit tests
bun add zod                     # Install Zod
```

---





## References
- [Hono Documentation](https://hono.dev/docs/)
- [Pak Eko Slides](https://docs.google.com/presentation/d/1enOzazdU_yy30bRWx2khCJf2_9LExAWKDaM9YyEhyIM/edit?slide=id.p#slide=id.p)