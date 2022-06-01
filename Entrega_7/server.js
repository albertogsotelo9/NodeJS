import express  from 'express';
//const handlebars = require('express-handlebars');
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);
import { options } from './options/mysqlConnection.js'
import ClienteSQL from './sql.js'


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

    socket.on('update', async (data) => {
      productos.push(data)
      const sql = new ClienteSQL(options)

          try{
                            await sql.crearTabla()
                            console.log('1. Tabla Creada')

                            await sql.insertarArticulos(productos)
                            console.log('2. Articulos Insertados')

                            const articulosLeidos = await sql.listarArticulos()
                            console.log('3. Listar Articulos')
                            console.table(articulosLeidos)
                  
              }catch (e) {
                console.log(e);
              }finally{
                sql.close()
              } 
        io.sockets.emit('productos', productos)
    })    

    socket.emit('messages', messages)

    socket.on('new-message', data => {
      messages.push(data)
      io.sockets.emit('messages', messages)
    })  
    

})