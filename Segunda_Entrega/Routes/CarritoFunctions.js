import fs from 'fs';
import ContenedorFirebase from '../containers/Firebase.js';


const productListed =  async (req,res) => {
    const { id } = req.params;
    const fire = new ContenedorFirebase();
    
            try{ 
                 //const read = await fs.promises.readFile('./carrito.txt','utf-8')
                 const listado = await fire.List();
                 const produc = JSON.parse(listado)
                 const product = produc[id-1] 
                 res.json(product)

                                 
            }catch(err){
                    console.log(err) 
                    throw new Error('Error en la lectura del archivo', +err)
            }  
}

const createCart = async (req,res) => {
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    const fire = new ContenedorFirebase()
    try{
        const Listado = await fire.List()
        const carrito = JSON.parse(Listado)
        
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
        await fire.createCart(carrito)

    }  catch(err){
        console.log(err) 
        throw new Error('Error en la lectura del archivo', +err)
    }     
    
}

const insertProdToCartById = async (req,res) => {
    
    const { id } = req.params
    const fire = new ContenedorFirebase()
    try{
       // const listaProd =  ;
        const productos = JSON.parse(listaProd)
        const producto = productos[id-1]
        
        const tolv =  await fire.List();
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

       

             await fire.update(carritoE)
                
            
        

        }
              
        res.json(carrito) 
        
             
    }catch(err){
        console.log(err) 
        throw new Error('Error en la lectura del archivo', +err)
    }  
    
       
}

const deleteProdById = async (req, res)=>{
    const {pos, id_prod} = req.params
    const fire = new ContenedorFirebase()
        
        try{
            const tolv =  await fire.List();
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
                await fire.update(carritoE);
                
            
            }    
            res.json(carrito) 
             
                  
            
                 
        }catch(err){
            console.log(err) 
            throw new Error('Error en la lectura del archivo', +err)
        }  
    // const producto = cart.splice(parseInt(pos) - 1, 1)
    // res.send({borrado: producto})}
       
}

const deleteCart = async (req, res)=>{
    const {id} = req.params
    const fire = new ContenedorFirebase()
    const carr = await fire.List();
    const cart = JSON.parse(carr) 
    const carrito = cart[id-1]

    await fire.delete(carrito)
    res.send({borrado: producto})
 }

export  {
    productListed,
    createCart,
    insertProdToCartById,
    deleteProdById, 
    deleteCart
}
