import fs from 'fs';


const ProductListed =  async(req,res) => {
    
    try {   
            const read = await fs.promises.readFile('./productos_PE.txt','utf-8')
            const produc = JSON.parse(read)
            
            res.json(produc)

       
    }catch(err){
   console.log(err) 
   throw new Error('Error en la lectura del archivo', +err)
}
} 
    
    

const ProductById = (req,res) => {
    const { id } = req.params
    const product = pan[id-1] 
    res.json(product)
}

const ProductUpdate = (req,res) => {
    const { pos } = req.params
    const {id, timestamp, nombre, descripcion, código,
        foto, precio, stock} = req.body
        const fs = require('fs');
        const car = fs.readFileSync('./productos_PE.txt','utf-8')
        const pan = JSON.parse(car)    
   pan[parseInt(pos) - 1] = {id, timestamp, nombre, descripcion, código,
    foto, precio, stock}
   
   res.send('actualizado')
    
}

const ProductDelete = (req, res)=>{
    const {pos} = req.params
    const fs = require('fs');
    const car = fs.readFileSync('./productos_PE.txt','utf-8')
    const pan = JSON.parse(car) 
    const producto = pan.splice(parseInt(pos) - 1, 1)
    res.send({borrado: producto})
 }

const InsertProducts = (req,res) => {
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
}


export  { 
    InsertProducts,
    ProductListed, 
    ProductById,
    ProductUpdate,
    ProductDelete
};