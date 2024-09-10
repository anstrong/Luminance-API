import { RequestHandler, ErrorHandler, ResponseHandler } from './middleware';
import { UserHandler, VocabHandler } from './handlers';

const health = require('express-ping');
const express = require("express")
const helmet = require("helmet")

const app = express()

app.use(helmet())
app.use(health.ping())
app.use(express.json())

app.use(RequestHandler)

app.get("/users/get", UserHandler.getUser)
app.get("/users/vocabulary/get", VocabHandler.getUserVocabulary)

app.post("/users/add", UserHandler.addUser)
app.post("/vocabulary/add", VocabHandler.addToVocabulary)
app.post("/users/vocabulary/add", VocabHandler.addWordToUser)

app.use(ErrorHandler)
app.use(ResponseHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Starting Express server on http://localhost:${PORT}\n`)
})

process.on("SIGINT", async () => {
    console.log('\nAPI stopped');
    process.exit();
})
