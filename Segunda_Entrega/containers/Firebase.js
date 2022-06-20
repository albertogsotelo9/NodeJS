import admin from "firebase-admin";
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("./db/segundaentrega-1dfba-firebase-adminsdk-6p15g-a1c2ab5175.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    
console.log("Conectado a Firebase correctamente");  

class ContenedorFirebase {

            constructor(){
                const db = admin.firestore();
                this.ruta = db.collection("carritos");
            }

        
                
                    
            async createCart (carrito){        
                     await this.ruta.add(carrito);
                    console.log("Carrito Creado")
            }

          
            async List(){    
                const todosLosCarritos = await this.ruta.get()
                
                console.log(todosLosCarritos)   
            }

            async update(carrito){
                await this.ruta.doc(carrito.id).update({id: carrito.id,nombre: carrito.nombre, timestamp: carrito.timestamp, descripcion: carrito.descripcion, código: carrito.código, foto: carrito.foto, precio: carrito.precio, stock: carrito.stock })
                console.log("Nombre de producto de carrito actualizado")
            }

            async delete(cart){
                await this.ruta.doc(cart.id).delete()
                console.log("Ccarrito eliminado")
            }

}

export default ContenedorFirebase;