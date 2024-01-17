require('dotenv').config({ path: './.env' })
const express = require('express')
const handleReferBypass = require('./main')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('reffer bypass status ok'))
app.get('/start', (req, res) => {

    const { t = null, r = null } = req.query
    handleReferBypass(+t, r, false)
    res.send('reffer bypass started')
})

app.listen(port, async () => {
    console.log('started refer bypassing server on port : ' + port)
})