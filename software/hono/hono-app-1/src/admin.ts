import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const admin = new Hono().basePath("/admin")

admin.use(async (c, next) => {
    const token = c.req.header("Authorization");

    if (!token) {
        throw new HTTPException(401)
    }

    await next();
})

admin.get('/a', (c) => c.text("Admin 1"))
admin.get('/b', (c) => c.text("Admin 1"))
admin.get('/c', (c) => c.text("Admin 1"))
