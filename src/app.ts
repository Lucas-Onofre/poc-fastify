import fastify from 'fastify'
import cors from '@fastify/cors'
const server = fastify()

import { database } from './database'

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

server.get('/users', (request, reply) => {
  const sql = 'SELECT * FROM users'

  database.all(sql, [], (err, rows) => {
    if (err) {
      reply.status(400).send({ error: err.message })
    }

    reply.send(rows)
  })
})

server.post('/users', async (request, reply) => {
  const { name, email } = request.body as any 

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)'
  const params = [name, email]

  database.run(sql, params, (err) => {
    console.log(err)
  })

  reply.status(201).send({ name, email })
})

server.listen({ path: '0.0.0.0', port: 10000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Started server at ${address}`)
})