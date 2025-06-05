import { Hono } from 'hono'
import { userController } from './user/controllers/user-controller'
import { authController } from './auth/controllers/auth-controller';
import { profileController } from './user/controllers/profile-controller';
import { messagesController } from './message/controllers/message-controller';
import { messageGroupsController } from './message/controllers/message-groups-controller';
import { HonoContext } from '@types/hono-context';
import { authMiddleware } from './core/middleware';
import { errorHandler } from './core/handlers/error-handler';
import { websocket, webSocketConfig } from './core/websocket-config';

const app = new Hono<{ Variables: HonoContext }>();

app.get('/ws', webSocketConfig);
app.use(authMiddleware);
app.onError(errorHandler);
app.get('/', (c) => c.text('Hello Hono!'))
app.route('/users', userController);
app.route('/auth', authController);
app.route('/profile', profileController);
app.route('/messages', messagesController);
app.route('/message-groups', messageGroupsController);
export default app;

export const server = Bun.serve({ fetch: app.fetch, port: 3000, websocket });
