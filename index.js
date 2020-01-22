const express = require('express') // npm install --save express
const app = express() 
const port = 3045
const cors = require('cors')
const configureDB = require('./config/database')
const router = require('./config/routes')
app.use(express.json())
configureDB()
app.use(cors())

// Route Handlers || Request Handlers 
app.get('/', (req, res) => {
    res.send('welcome to the notes app')
})

app.use('/', router)


app.listen(port, () => {
    console.log('listening on port', port)
})
