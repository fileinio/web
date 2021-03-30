const express = require('express')

const app = express()

app.get('/', (_req, res) => {
	res.send('filein')
})

app.listen(process.env.PORT || '5000')
