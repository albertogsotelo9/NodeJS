import fs from 'fs';


const productListed = ( async (req,res) => {
    const { id } = req.params
    
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

const createCart = (async (req,res) => {
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
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

const insertProdToCartById = (async (req,res) => {
   
    const { id } = req.params
    
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

const deleteProdById = (async (req, res)=>{
    const {pos, id_prod} = req.params
    
        
        try{
            
            
            const tolv =  await fs.promises.readFile('./carrito.txt','utf-8')
            const carrito = JSON.parse(tolv)
            const carritoE = carrito[pos-1]
            
             if(carritoE.id == id_prod){
    
    
                 carritoE.productos.id = ""
                 carritoE.productos.timestamp = ""
                 carritoE.productos.nombre = ""
                 
                carritoE.productos.descripcion = ""
                carritoE.productos.código = ""
                carritoE.productos.foto = ""
                carritoE.productos.precio = ""
                carritoE.productos.stock = ""
                
                
                 carrito[pos-1] = carritoE
   
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
    // const producto = cart.splice(parseInt(pos) - 1, 1)
    // res.send({borrado: producto})}
       
})

const deleteCart = (async (req, res)=>{
    const {id} = req.params
    const carr = fs.readFileSync('./carrito.txt','utf-8')
    const cart = JSON.parse(carr) 
    const producto = cart.splice(parseInt(id) - 1, 1)

    res.send({borrado: producto})
 })

export  {
    productListed,
    createCart,
    insertProdToCartById,
    deleteProdById, 
    deleteCart
}
