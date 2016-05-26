import path from 'path'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import graphqlHTTP from 'express-graphql'
import { PORT, DOMAIN, authConfig, dbConfig } from './config'
import mongoose from 'mongoose'
import Schema from './data/schema'
import Router from './api'

// Express =====================================================================
let app = express()

// static content
app.use('/static', express.static(path.resolve(__dirname, '../public/static')))

// MongoDB connect
mongoose.connect(dbConfig.MONGODB_DATABASE_URL)

// Router
app.use(Router())

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true
}))

// Auth ========================================================================
app.use(session(authConfig.serverCode))
app.use(passport.initialize())
app.use(passport.session())

// Listen ======================================================================
app.listen(PORT, function() {
  console.log(`✔ Server API listening on ${ DOMAIN }, Ctrl+C to stop`)
})
