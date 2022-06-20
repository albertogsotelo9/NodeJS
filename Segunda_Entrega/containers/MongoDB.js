import mongoose from "mongoose";
import * as models from '../models/productos.js'



class ContenedorMongoDB {
        
        constructor(){
            const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.tnxvfhc.mongodb.net/ecommerce?retryWrites=true&w=majority"
            this.ruta = mongoose.connect(URL);
            console.log("Conexion exitosa");
        }
    
    async List(){
        const productos = await models.productos.find();
        return productos
        console.log(productos);
    }

    async Create (producto){
                //Read usuarios
                //Create username
                const produc = new models.productos({
                    id: `${producto.id}`,
                    timestamp: `${producto.timestamp}`,
                    nombre: `${producto.nombre}`,
                    descripcion: `${producto.descripcion}`,
                    código:`${producto.código}`,
                    foto: `${producto.foto}`,
                    precio:`${producto.precio}`,
                    stock: `${producto.stock}`
                })
                await produc.save();
                console.log("Producto Creado");
                return
    }

    async productUpdate(productUpdate){
        models.productos.updateById({id: `${productUpdate.id}`},{timestamp:`${productUpdate.timestamp}`, nombre:`${productUpdate.nombre}`, descripcion:`${productUpdate.descripcion}`, código:`${productUpdate.código}`, foto:`${productUpdate.foto}`, precio:`${productUpdate.precio}`, stock:`${productUpdate.stock}`})
        return 
    }

    async deleteProduct(productDelete){
        models.productos.deleteById({id: productDelete.id})
        return
    }
}

export default ContenedorMongoDB;