import { Hono } from 'hono'
import { userController } from './user/controllers/user-controller'
import { authController } from './auth/controllers/auth-controller';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { error } from 'winston';

const app = new Hono()




app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/users', userController);
app.route('/auth', authController);



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

export default app
