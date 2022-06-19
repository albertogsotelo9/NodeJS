import mongoose from "mongoose";

const ususariosCollection = 'productos';


const UsuariosSchema = new mongoose.Schema({
                    id: Number,
                    timestamp: Date,
                    nombre: String,
                    descripcion: String,
                    código:String,
                    foto: URL,
                    precio:Number,
                    stock: Number,
})

export const productos = mongoose.model(ususariosCollection, UsuariosSchema)

