import express from 'express'
import morgan from 'morgan'
// import projectRouter from './src/users/project.router'
// import actionRouter from './src/posts/action.router'

const server = express()

const jsonSyntaxErrorHandler = (error, _req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: 'JSON syntax error' })
  } else {
    next()
  }
}

server.use(express.json())
server.use(morgan('dev'))
server.use(jsonSyntaxErrorHandler)
// server.use('/api/projects', projectRouter)
// server.use('/api/actions', actionRouter)

server.get('/', (_req, res) => {
  res.send(`<h1>Node API Challenge</h1>`)
})

export default server
