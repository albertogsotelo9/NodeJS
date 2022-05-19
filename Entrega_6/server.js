const express = require('express')
//const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.engine('handlebars', handlebars.engine())

app.set ('views', './views')

app.set('view engine', 'handlebars')





const messages = []

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

httpServer.listen(8080, () => console.log('Server ON'))

io.on('connection', (socket) => {
    console.log('Cliente conectado')

    socket.emit('messages', messages)
    
    io.sockets.emit('messages', messages)

    

})