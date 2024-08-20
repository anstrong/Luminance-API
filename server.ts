//import { closeConnection } from './database/client';
import { RequestHandler, ErrorHandler, ResponseHandler } from './middleware';
import { VocabHandler } from './handlers';
const express = require("express")
const helmet = require("helmet")

const PORT = process.env.PORT || 3000

const app = express()

app.use(helmet())
app.use(express.json())

app.use(RequestHandler)

app.get("/vocabulary", VocabHandler.getVocabulary)

app.use(ErrorHandler)
app.use(ResponseHandler)

app.listen(PORT, () => {
    console.log(`Starting Express server on http://localhost:${PORT}`)
})

process.on("SIGINT", async () => {
    //await closeConnection().then(() => console.log("Connection closed"))
    console.log('Connection closed');
    process.exit();
})
