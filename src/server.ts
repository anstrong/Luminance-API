import { RequestHandler, ErrorHandler, ResponseHandler } from './middleware';
import { UserHandler, VocabHandler } from './handlers';

const express = require("express")
const helmet = require("helmet")

const app = express()

app.use(helmet())
app.use(express.json())

app.use(RequestHandler)

app.get("/vocabulary", VocabHandler.getVocabulary)
app.get("/users/get", UserHandler.getUser)
app.get("/users/add", UserHandler.addUser)

app.use(ErrorHandler)
app.use(ResponseHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Starting Express server on http://localhost:${PORT}`)
})

process.on("SIGINT", async () => {
    console.log('API stopped');
    process.exit();
})
