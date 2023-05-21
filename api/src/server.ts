import 'dotenv/config'
import { resolve } from 'node:path'
import fastify from 'fastify'

import { authRouter } from './routes/auth'
import { memoriesRouter } from './routes/memories'
import { uploadRouter } from './routes/upload'

const app = fastify()

app.register(require('@fastify/cors'), {
  origin: true,
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(require('@fastify/multipart'))

app.register(require('@fastify/jwt'), {
  secret: 'spacetime',
})

app.register(authRouter)
app.register(memoriesRouter)
app.register(uploadRouter)

app
  .listen({
    port: 3001,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server running on http://localhost:3001')
  })
