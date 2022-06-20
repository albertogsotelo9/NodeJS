import fs from 'fs';
import ContenedorMongoDB from '../containers/MongoDB.js'


const ProductListed =  async(req,res) => {
    const mongo = new ContenedorMongoDB() 
    try {   
            
        const ProdListed = await mongo.List()
             
        res.json(ProdListed)

       
    }catch(err){
        console.log(err) 
        throw new Error('Error en la lectura del archivo', +err)
    }
} 
    
    

const ProductById = async (req,res) => {
    const { id } = req.params
    const mongo = new ContenedorMongoDB() 
    try{
        const ProdListed = await mongo.List()
        
        const product = ProdListed[id-1]

        res.json(product)
    }catch(err){
        console.log("Error: ", err); 
    }
}

const ProductUpdate = async (req,res) => {
    const { pos } = req.params
    const {id, timestamp, nombre, descripcion, código,
        foto, precio, stock} = req.body


    const ProdUp = req.body
    await mongo.productUpdate(ProdUp)
        
   
   
   res.send('actualizado')
    
}

const ProductDelete = async(req, res)=>{
    try{
        const {pos} = req.params
        const mongo = new ContenedorMongoDB()
        const ProdListed = await mongo.List()
        const product = ProdListed[id-1]
        
        await deleteProduct(product)
        res.send({borrado: product})
    }catch(err){
        console.log("Error: ", err)
    }
 }

const InsertProducts = async (req,res) => {
     
    const {timestamp, nombre,descripcion,código,foto,precio,stock} = req.body
    const mongo = new ContenedorMongoDB();
    const ProdListed = await mongo.List();
    
    console.log(ProdListed)
     
    try{        let newId
            if (ProdListed.length == 0){
                newId = 1
            } else{
                newId = ProdListed[ProdListed.length - 1].id + 1
            }   
            const newProd = {...req.body, id: newId}
            await mongo.Create(newProd)
            
            res.json(newProd)
        }catch(err){
            console.log("Error: ", err)
        }        
}


export  { 
    InsertProducts,
    ProductListed, 
    ProductById,
    ProductUpdate,
    ProductDelete
};