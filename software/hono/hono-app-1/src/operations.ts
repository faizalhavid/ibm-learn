import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { requestId } from "hono/request-id";

export const operation = new Hono().basePath('/operation');

operation.use(basicAuth({
    username: "admin",
    password: "admin"
}))

operation.use(requestId());

operation.get('/a', (c) => c.text(`operation 1 : ${c.get("requestId")}`))
operation.get('/b', (c) => c.text(`operation 2 : ${c.get("requestId")}`))
operation.get('/c', (c) => c.text(`operation 3 : ${c.get("requestId")}`))
