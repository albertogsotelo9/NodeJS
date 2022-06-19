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

        
                
                    
            async create (productos){        
                    const carrito = await this.ruta.add(productos);
                    console.log("Carrito Creado")
            }

            async List (){    
                const todosLosCarritos = await this.ruta.get()
                todosLosCarritos.forEach( doc => 
                            console.log(doc.data())
                        )
                console.log("Carritos pulled")   
            }

            async update(){
                await this.ruta.doc(carrito.id).update({nombre: ""})
                console.log("Nombre de producto de carrito actualizado")
            }

            async delete(){
                await this.ruta.doc(carrito.id).delete()
                console.log("Ccarrito eliminado")
            }

}

export default ContenedorFirebase;