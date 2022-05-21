const express = require('express');
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: 'index.html',
      layoutsDir: __dirname + "/public",
      partialsDir: __dirname + '/views/partials/'

    })
);


 app.set ('views', './views');

 app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/productos',(req, res)=>{
    res.render("main");
})

httpServer.listen(8080, () => console.log('Server ON'))

io.on('connection', (socket) => {
    console.log('Cliente conectado')

  

    socket.on('update', productos => {
        io.sockets.emit('productos', productos)
    })    

    

})