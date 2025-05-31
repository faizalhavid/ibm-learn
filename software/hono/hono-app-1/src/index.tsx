import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { basicAuth } from 'hono/basic-auth'
import { requestId } from 'hono/request-id'
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'
import HomeComponent from './home'

import { validator } from 'hono/validator'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator';
import { admin } from './admin'
import { operation } from './operations'
import { serveStatic } from "hono/bun"


const app = new Hono()

// 1. Routing
app.get('/hello/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`Hello ${name}!`)
})


//  Path parameters
app.get('/user/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`User ID: ${id}`)
})

// url : http://localhost:3000/user/123

app.get('/user/profile/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`User Name: ${name}`)
});
// url : http://localhost:3000/user/profile/john

// optional
app.get('/user/address/:city?', (c) => {
  const city = c.req.param('city')
  return c.text(`User City: ${city}`)
});
// url : http://localhost:3000/user/address/London

// regex
app.get('/user/regex/:id{\\d+}', (c) => {
  const id = c.req.param('id')
  return c.text(`User ID (regex): ${id}`)
});
// url : http://localhost:3000/user/regex/456


// Including slashes
app.get('/user/profile/:name/*', (c) => {
  const name = c.req.param('name')
  const rest = c.req.param('0') // captures everything after the name
  return c.text(`User Name: ${name}, Rest: ${rest}`)
});
// url : http://localhost:3000/user/profile/john/some/extra/path




// Chained routing
app
  .get('/endpoint', (c) => {
    return c.text('GET /endpoint')
  })
  .post((c) => {
    return c.text('POST /endpoint')
  })
  .delete((c) => {
    return c.text('DELETE /endpoint')
  })
// url : http://localhost:3000/endpoint

// Grouping routes
// Base path
const book = new Hono().basePath('/api')

book.get('/', (c) => c.text('List Books')) // GET /book
book.get('/:id', (c) => {
  // GET /book/:id
  const id = c.req.param('id')
  return c.text('Get Book: ' + id)
})
book.post('/', (c) => c.text('Create Book')) // POST /book

// const app = new Hono()
app.route('/book', book)



// 2. Context

app.get('/context', async (c) => {
  // Accessing request context
  const method = c.req.method
  const url = c.req.url
  const headers = c.req.header()
  return c.json({
    method,
    url,
    headers,
    message: 'Context accessed successfully!'
  })
})


app.get('/context.json', async (c) => {
  return c.json({
    message: 'This is a JSON response',
    status: 'success'
  })
});

// 3. Hono Request

app.post('/request', async (c) => {
  // Accessing request properties
  const method = c.req.method
  const url = c.req.url
  const headers = c.req.header()
  const query = c.req.query()
  const body = await c.req.json().catch(() => null) // Handle JSON parsing errors
  return await c.json({
    method,
    url,
    headers,
    query,
    body,
    message: 'Request accessed successfully!'
  })
})
// path: http://localhost:3000/request?name=John&age=30
// curl command : curl -X POST http://localhost:3000/request -H "Content-Type: application/json" -d '{"key":"value"}'

// 4. Hono Response
app.get('/response', (c) => {
  // Creating different types of responses
  const textResponse = c.text('This is a plain text response')
  const jsonResponse = c.json({ message: 'This is a JSON response' })
  const htmlResponse = c.html('<h1>This is an HTML response</h1>')
  const statusResponse = c.text('Not Found', 404)
  const redirectResponse = c.redirect('https://example.com')
  return c.json({
    textResponse: textResponse.body,
    jsonResponse: jsonResponse.body,
    htmlResponse: htmlResponse.body,
    statusResponse: statusResponse.body,
    redirectResponse: redirectResponse.headers.get('Location')
  })
})

// 5. Http Exceptions
app.get('auth', async (c) => {
  const username = c.req.query('username')
  const password = c.req.query('password')
  if (!username || !password) {
    throw new HTTPException(400, {
      res: new Response(JSON.stringify({
        error: "username and password is required"
      }), {
        status: 400,
        headers: {
          'Authentification': 'error'
        }
      })
    });
  }
  return c.text(`welcome back ${username}`);
});
//path : http://localhost:3000/auth?username=John&password=secret

// Error handling

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  c.status(500)
  return c.text('Eror Kontlo !')
})

class CustomErrorHandlingException extends Error {

}

app.get('/handling-error', (c) => {
  throw new CustomErrorHandlingException();
});


// 6. Middleware
app.use(async (_, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
})
app.use(async (_, next) => {
  console.log('middleware 2 start')
  await next()
  console.log('middleware 2 end')
})
app.use(async (_, next) => {
  console.log('middleware 3 start')
  await next()
  console.log('middleware 3 end')
})

app.get('/middleware-handler', (c) => {
  console.log('handler')
  return c.text('Hello!')
})


app.route('/', admin);

// Hono built-in Middleware
/// basic auth and request id

app.route('/', operation);

// Helpers
/// cookie
app.get('/cookies/set', (c) => {
  const value = c.req.query('value') as string;
  setCookie(c, 'cookie-1', value, { path: '/' });
  return c.text('Success set cookie');
});

app.get('/cookies/get', (c) => {
  const cookie = getCookie(c);
  return c.text(`Cookie value is: ${cookie['cookie-1']}`);
})

app.get('/cookies/delete', (c) => {
  deleteCookie(c, 'cookie-1');
  return c.text("Cookie succesfully deleted");
});


// 7.Hono jsx
// change tsconfig.json and add jsx file
app.get('/home', (c) => {
  return c.html(<HomeComponent />)
})
// run bun run --hot src/index.tsx

// 8.Unit Test
/// create test/index.test/ts
/* 
import { describe, expect, it } from "bun:test";
import app from "../src";


describe("Application", () => {
    it("Get /hello/:name", async () => {
        const res = await app.request("/hello/jocko", {
            method: "Get"
        })
        // pass expect
        expect(await res.text()).toBe("Hello jocko!")
        // fail expect
        expect(await res.text()).toBe("Hello huwani!")
    })
})
*/

// 9.Validation
/// validation with built in hono
app.post(
  '/posts',
  validator('form', (value, c) => {
    const body = value['body']
    if (!body || typeof body !== 'string') {
      return c.text('Invalid!', 400)
    }
    return {
      body: body,
    }
  }),
)
/// use zod dependensi
/// install zod
/// bun add zod
const schema = z.object({
  body: z.string(),
})

const route = app.post(
  '/posts-zod',
  validator('form', (value, c) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
      return c.text('Invalid!', 401)
    }
    return parsed.data
  }),
  (c) => {
    const { body } = c.req.valid('form')
    // ... do something
    return c.json(
      {
        message: 'Created!',
      },
      201
    )
  }
)
/// zod validator Middleware
// bun add @hono/zod-validator

app.post('/login',
  zValidator('json', z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(3).max(10)
  })),
  async (c) => {
    const body = await c.req.json();

    return c.json({
      data: `Hello, ${body.username}`
    })
  })

app.use("/public/*", serveStatic({ root: "./" }));

export default app
