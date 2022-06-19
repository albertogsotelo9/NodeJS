import mongoose from "mongoose";
import * as models from '../models/productos.js'



class ContenedorMongoDB {
        
    
    async ReadFromDB(){

            try { 
                const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.tnxvfhc.mongodb.net/ecommerce?retryWrites=true&w=majority"

                let conexion = await mongoose.connect(URL);
                console.log("Conexion exitosa");


                //Read usuarios
                const productos = await models.productos.find();
                console.log(productos);

                //Create username

                const producto = new models.productos({
                    id: "",
                    timestamp: "Date.now()",
                    nombre: "",
                    descripcion: "",
                    código:"",
                    foto: "",
                    precio:"",
                    stock: ""
                })
                await producto.save();
                console.log("Producto Creado");
                return
            } catch (e) {
                console.log(e);
            }
        }
}

export default ContenedorMongoDB;