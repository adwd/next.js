const express = require('express')
const graphqlHTTP = require('express-graphql')
const next = require('next')
const { buildSchema } = require('graphql')
const fs = require('fs')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const schema = buildSchema(fs.readFileSync('./schema.graphql').toString());

const root = {
  todos: () => {
    return [
      { id: '1', text: 'learn next.js', done: false },
      { id: '2', text: 'learn GraphQL', done: true },
    ];
  },
};

app.prepare()
  .then(() => {
    const server = express()

    server.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));

    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })

    // server.get('/b', (req, res) => {
    //   return app.render(req, res, '/a', req.query)
    // })

    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
