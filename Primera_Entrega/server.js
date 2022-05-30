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

routerProductos.post('/',  (req,res) => {
    const {timestamp, nombre,descripcion,código,foto,precio,stock} = req.body
        
            let newId
            if (pan.length == 0){
                newId = 1
               
            } else{
                newId = pan[pan.length - 1].id + 1
                
            }   
            const newProd = {...req.body, id: newId}
            pan.push(newProd)
            fs.writeFile('./productos_PE.txt',JSON.stringify(pan, null, 2),err => {
                if(err){
                    console.log('Error de Escritura', +err)
                    throw new Error('Failed to read file', +err)
                }
                console.log('Escritura exitosa' )
            })
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
 
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routerCarrito.get('/:id/productos',async (req,res) => {
    const { id } = req.params
    const fs = require('fs');
            try {const read = await fs.promises.readFile('./carrito.txt','utf-8')
                 const produc = JSON.parse(read)
                    const product = produc[id-1] 
                    res.json(product)
                 }
          catch(err){
                console.log(err) 
                throw new Error('Error en la lectura del archivo', +err)
           }  
        
    
})


routerCarrito.post('/', async (req,res) => {
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    const fs = require('fs')
    try{
        const tolv =  await fs.promises.readFile('./carrito.txt','utf-8')
        const carrito = JSON.parse(tolv)
        
        const { timestamp } = req.body
        let newId
        if (carrito.length == 0){
            newId = 1
        } else{
            newId = carrito[carrito.length - 1].id + 1
        }   
        const newProd = {...{timestamp: timestamp }, id: newId, productos: { id:"", timestamp:"", nombre:"", descripcion:"", código:"",
            foto:"", precio:"", stock:"" }}
        carrito.push(newProd)    
        console.log(carrito.length)    
        fs.writeFile('./carrito.txt',JSON.stringify(carrito, null, 2),err => {
                if(err){
                    console.log('Error de Escritura', +err)
                    throw new Error('Failed to read file', +err)
                }
                console.log('Escritura exitosa' )
            })
        const read = fs.readFileSync('./carrito.txt','utf-8')
        const carrito2 = JSON.parse(read)      
        res.json(carrito2)
    }  catch(err){
        console.log(err) 
        throw new Error('Error en la lectura del archivo', +err)
    }     
    
})



routerCarrito.post('/:id/productos',async (req,res) => {
   
    const { id } = req.params
    const fs = require('fs'); 
    try{
        const lista =  await fs.promises.readFile('./productos_PE.txt','utf-8')
        const productos = JSON.parse(lista)
        const producto = productos[id-1]
        
        const tolv =  await fs.promises.readFile('./carrito.txt','utf-8')
        const carrito = JSON.parse(tolv)
        const carritoE = carrito[id-1]
        
         if(carritoE.id == producto.id){


             carritoE.productos.id = producto.id
             carritoE.productos.timestamp = producto.timestamp
             carritoE.productos.nombre = producto.nombre
             
            carritoE.productos.descripcion = producto.descripcion 
            carritoE.productos.código = producto.código
            carritoE.productos.foto = producto.foto
            carritoE.productos.precio = producto.precio
            carritoE.productos.stock = producto.stock
            
            
             carrito[id-1] = carritoE


            //console.log(carrito)

       

             fs.writeFile('./carrito.txt',JSON.stringify(carrito, null, 2),err => {
                 if(err){
                    console.log('Error de Escritura', +err)
                    throw new Error('Failed to read file', +err)
                }
                console.log('Escritura exitosa' )
            })
        

        }
              
        res.json(carrito) 
        
             
    }catch(err){
        console.log(err) 
        throw new Error('Error en la lectura del archivo', +err)
    }  
    
       
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

