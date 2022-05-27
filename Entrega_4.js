const express = require('express')
const {Router} = express

const routerProductos = new Router()

const PORT = 8080


const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const Producto = [{
    title: 'sorbetes_eco',
    price: 500,
    thumbnail: 'http://suenaacampo.com/prueba1/wp-content/uploads/2022/02/sorbete-ecologico.jpg',
    id: 25
    }]

routerProductos.get('/productos',(req,res) => {
    res.json(Producto)
})
routerProductos.get('/productos/:id',(req,res) => {
    const { id } = req.params
    const product = Producto[id-1] 
    res.json(product)
})
routerProductos.post('/productos',(req,res) => {
    const {produ} = req.body
    let newId
    if (Producto.length == 0){
        newId = 1
    } else{
        newId = Producto[Producto.length - 1].id + 1
    }   
    const newProd = {...{produ}, id: newId}
    Producto.push(newProd)
    res.json(Producto)
})

routerProductos.put('/productos/:pos',(req,res) => {
    const { pos } = req.params
    const {title, price, thumbnail} = req.body
   Producto[parseInt(pos) - 1] = {title, price, thumbnail}
   
   res.send('actualizado')
    
})

routerProductos.delete('/productos/:pos', (req, res)=>{
    const {pos} = req.params
    const producto = Producto.splice(parseInt(pos) - 1, 1)
    res.send({borrado: producto})
 })

app.use('/api', routerProductos)

app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT)
})