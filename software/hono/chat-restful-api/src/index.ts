import { Hono } from 'hono'
import { userController } from './user/controllers/user-controller'

const app = new Hono()
app.basePath('/api/v1')


app.route('/users', userController);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
