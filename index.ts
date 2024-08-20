import { VocabHandler } from './handlers';
const express = require("express")
const helmet = require("helmet")

const PORT = process.env.PORT || 3000

const app = express()

app.use(helmet())

app.get("/vocabulary", VocabHandler.getVocabulary)

app.listen(PORT, () => {
    console.log(`Starting Express server on http://localhost:${PORT}`)
})
