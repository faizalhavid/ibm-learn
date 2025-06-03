import { Hono } from 'hono'
import { userController } from './user/controllers/user-controller'
import { authController } from './auth/controllers/auth-controller';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { profileController } from './user/controllers/profile-controller';
import { UserService } from './user/services/user-service';
import { HonoContext } from '@types/hono-context';
import { createBunWebSocket } from 'hono/bun';
import { serve, ServerWebSocket } from 'bun';
import { messagesController } from './message/controllers/message-controller';

const app = new Hono<{ Variables: HonoContext }>();
const { upgradeWebSocket, websocket } = createBunWebSocket();
const publicRoutes = ['/auth']
const topic = 'messages';
export const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
  websocket
});

app.get('/ws', upgradeWebSocket((_) => ({
  onOpen(_, ws) {
    const rawWs = ws.raw as ServerWebSocket;
    rawWs.subscribe(topic);
    console.log(`WebSocket server opened and subscribed to topic '${topic}'`);
  },
  onMessage(evt, ws) {
    const rawWs = ws.raw as ServerWebSocket;
    const message = typeof evt.data === 'string' ? evt.data : '';
    rawWs.publish(topic, message);
    console.log('WebSocket message received and broadcast:', message);
  },
  onClose(_, ws) {
    const rawWs = ws.raw as ServerWebSocket;
    rawWs.unsubscribe(topic);
    console.log(
      `WebSocket server closed and unsubscribed from topic '${topic}'`
    );
  },
})));

// Middleware
app.use(async (c, next) => {
  console.log('Middleware: Checking authentication');
  const token = c.req.header('Authorization');
  const currentPath = c.req.path;
  const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
  console.log(`Current path: ${currentPath}, Is public route: ${isPublicRoute}, Token: ${token}`);
  if (!isPublicRoute && !token) {
    throw new HTTPException(401, { message: 'Unauthorized: Token is required for this route' });
  }
  if (!isPublicRoute && token) {
    const authenticatedUser = await UserService.getUser(token);
    c.set('authenticatedUser', authenticatedUser);
  }
  return next();
});

// Error Hanldling
app.onError((err, c) => {

  if (err instanceof HTTPException) {
    c.status(err.status)
    return c.json({
      status: err.status,
      errors: [err.message || 'Internal Server Error'],
    });
  }

  if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      status: 400,
      message: 'Validation Error',
      errors: err.errors.map(e => ({
        fields: e.path,
        message: e.message,
        code: e.code
      }))
    });
  }

  return c.json({
    status: 500,
    message: err.message || 'Internal Server Error'
  }, 500);
});


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/users', userController);
app.route('/auth', authController);
app.route('/profile', profileController);
app.route('/messages', messagesController);


export default app
