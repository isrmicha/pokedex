var compression = require('compression')
var express = require('express')
var app = express()
app.use(compression())

app.use(express.static('build'))
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Started on http://localhost:${port}`))
