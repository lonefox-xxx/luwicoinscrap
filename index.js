require('dotenv').config({ path: './.env' })
const express = require('express')
const handleReferBypass = require('./main')
const parseArgs = require('./utils/parsargs')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('reffer bypass status ok'))

app.listen(port, async () => {
    console.log('started refer bypassing')

    const args = parseArgs(process.argv)
    console.log(args) 
    const totalrefcount = +args.t
    const refcode = args.r
    await handleReferBypass(totalrefcount, refcode)
})