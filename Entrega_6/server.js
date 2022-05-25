const express = require('express');
//const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


// app.engine(
//     "hbs",
//     handlebars.engine({
//       extname: ".hbs",
//       defaultLayout: 'index.html',
//       layoutsDir: __dirname + "/public",
//       partialsDir: __dirname + '/views/'

//     })
// );


//  app.set ('views', './public');

//  app.set('view engine', 'hbs');

const productos = []
const messages = []
app.use(express.static('./public'));



app.get('/',(req, res)=>{
    res.render("main", {sin: productos.length <= 0});
})
app.get('/', (req, res) => {
 // res.render("main");
  res.sendFile('index.html', {root: __dirname});
  
})

httpServer.listen(8080, () => console.log('Server ON'))

io.on('connection', (socket) => {
    console.log('Cliente conectado')

    socket.emit('productos', productos)

    socket.on('update', data => {
        productos.push(data)
        io.sockets.emit('productos', productos)
    })    

    socket.emit('messages', messages)

    socket.on('new-message', data => {
      messages.push(data)
      io.sockets.emit('messages', messages)
    })  
    

})