const express = require('express')
const https = require('https') // a Node.js building feature
const fs = require('fs') //fs: file system, coming from Node
const startup = require('./routes/startup')

const app = express()
// const sslCert = fs.readFileSync('./ssl/cert.pem')
// const key = fs.readFileSync('./ssl/key.pem')


const httpsOptions = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

const server = https.createServer(httpsOptions, app)
app.use(express.json()) //parse json
app.use('/https-web-service/v1', startup) // import startup.js
// domain-name/web-service name/v1/<route/path/endpoint>
// Create an endpoint for web service:
// safeway.com/order-purchases/v1/purchaseHistory

app.get('/', (req, res) => {
    res.send("It's Working!!")
})

app.get('/alive', (req, res) => {
    res.send('HTTPS-Web-Service is main Alive')
})


server.listen(8080, () => {
    console.log('Server is up')
})