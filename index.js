require('dotenv').config({ path: './.env' })
const express = require('express')
const handleReferBypass = require('./main')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('reffer bypass status ok'))

app.listen(port, async () => {
    console.log('started refer bypassing')
    await handleReferBypass()
})