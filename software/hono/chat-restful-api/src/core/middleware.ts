import { HTTPException } from 'hono/http-exception';
import { UserService } from '@/user/services/user-service';
import { Context } from 'hono';

const publicRoutes = ['/auth'];

export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
    const token = c.req.header('Authorization');
    const currentPath = c.req.path;
    const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
    if (!isPublicRoute && !token) {
        throw new HTTPException(401, { message: 'Unauthorized: Token is required for this route' });
    }
    if (!isPublicRoute && token) {
        const authenticatedUser = await UserService.getUser(token);
        c.set('authenticatedUser', authenticatedUser);
    }
    return next();
};