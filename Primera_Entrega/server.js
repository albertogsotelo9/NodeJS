const express = require('express');
//const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const {Router} = express

const routerProductos = new Router()
const routerCarrito = new Router()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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


routerCarrito.get('/:id/productos',(req,res) => {
    res.json(cart)
})

const carro = []
routerCarrito.post('/',(req,res) => {
    const { timestamp } = req.body
    let newId
    if (cart.length == 0){
        newId = 1
    } else{
        newId = cart[cart.length - 1].id + 1
    }   
    const newProd = {...{ timestamp: timestamp }, id: newId, productos: [{ id:"", timestamp:"", nombre:"", descripcion:"", código:"",
        foto:"", precio:"", stock:"" }]}
    carro.push(newProd)    
    const fs = require('fs');    
    fs.writeFile('./carrito.txt',JSON.stringify(newProd, null, 2),err => {
            if(err){
                console.log('Error de Escritura', +err)
                throw new Error('Failed to read file', +err)
            }
            console.log('Escritura exitosa' )
        })
    const read = fs.readFileSync('./carrito.txt','utf-8')     
    res.json(read)       
    
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

routerCarrito.delete('/:pos/productos/:id_prod', (req, res)=>{
    const {pos} = req.params
    const fs = require('fs');
    const carr = fs.readFileSync('./carrito.txt','utf-8')
    const cart = JSON.parse(carr) 
    const producto = cart.splice(parseInt(pos) - 1, 1)
    res.send({borrado: producto})
 })


 
app.use(express.static('./public'));


app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


httpServer.listen(8080, () => console.log('Server ON'))

