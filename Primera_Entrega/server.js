const express = require('express');
//const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const {Router} = express
const router = Router()
const routerProductos = new Router()
const routerCarrito = new Router()

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

const fs = require('fs');
const car = fs.readFileSync('./productos_PE.txt','utf-8')
const pan = JSON.parse(car) 


routerProductos.get('/:id',(req,res) => {
    const { id } = req.params
    const product = pan[id-1] 
    res.json(product)
})

routerProductos.post('/',(req,res) => {
    const {produ} = req.body
    let newId
    if (Producto.length == 0){
        newId = 1
    } else{
        newId = Producto[Producto.length - 1].id + 1
    }   
    const newProd = {...req.body, id: newId}
    const fs = require('fs');
    const car = fs.readFileSync('./productos_PE.txt','utf-8')
    const pan = JSON.parse(car)
    pan.push(newProd)
    res.json(pan)
})

routerProductos.put('/:pos',(req,res) => {
    const { pos } = req.params
    const {id, timestamp, nombre, descripcion, código,
        foto, precio, stock} = req.body
        const fs = require('fs');
        const car = fs.readFileSync('./productos_PE.txt','utf-8')
        const pan = JSON.parse(car)    
   pan[parseInt(pos) - 1] = {id, timestamp, nombre, descripcion, código,
    foto, precio, stock}
   
   res.send('actualizado')
    
})

routerProductos.delete('/:pos', (req, res)=>{
    const {pos} = req.params
    const fs = require('fs');
    const car = fs.readFileSync('./productos_PE.txt','utf-8')
    const pan = JSON.parse(car) 
    const producto = pan.splice(parseInt(pos) - 1, 1)
    res.send({borrado: producto})
 })


//-----------------------------------------------------------------//
//                               CARRITO                           //
//-----------------------------------------------------------------//


const carr = fs.readFileSync('./carrito.txt','utf-8')
const cart = JSON.parse(carr) 


routerCarrito.get('/:id',(req,res) => {
    const { id } = req.params
    const carrito = cart[id-1] 
    res.json(carrito)
})

routerCarrito.post('/',(req,res) => {
    const {produ} = req.body
    let newId
    if (Producto.length == 0){
        newId = 1
    } else{
        newId = Producto[Producto.length - 1].id + 1
    }   
    const newProd = {...req.body, id: newId}
    const fs = require('fs');
    const carr = fs.readFileSync('./carrito.txt','utf-8')
    const cart = JSON.parse(carr)
    pan.push(newProd)
    res.json(cart)
})

routerCarrito.put('/:pos',(req,res) => {
    const { pos } = req.params
    const {id, timestamp, nombre, descripcion, código,
        foto, precio, stock} = req.body
        const fs = require('fs');
        const carr = fs.readFileSync('./carrito.txt','utf-8')
        const cart = JSON.parse(carr)    
   cart[parseInt(pos) - 1] = {id, timestamp, nombre, descripcion, código,
    foto, precio, stock}
   
   res.send('actualizado')
    
})

routerCarrito.delete('/:pos', (req, res)=>{
    const {pos} = req.params
    const fs = require('fs');
    const carr = fs.readFileSync('./carrito.txt','utf-8')
    const cart = JSON.parse(carr) 
    const producto = cart.splice(parseInt(pos) - 1, 1)
    res.send({borrado: producto})
 })


 
app.use(express.static('./public'));





httpServer.listen(8080, () => console.log('Server ON'))

