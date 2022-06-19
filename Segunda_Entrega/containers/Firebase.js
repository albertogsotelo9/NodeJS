import admin from "firebase-admin";
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("./db/segundaentrega-1dfba-firebase-adminsdk-6p15g-a1c2ab5175.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    
console.log("Conectado a Firebase correctamente");  

class ContenedorFirebase {

            constructor(ruta){
                this.ruta = serviceAccount;
            }

        
                
                    
            async create (){        
                    const db = admin.firestore();
                    const query = db.collection("carritos");

                    const carrito = await query.add({nombre: ""});

                    console.log("Carrito Creado")

                    const todosLosCarritos = await query.get()
                    todosLosCarritos.forEach( doc => 
                                console.log(doc.data())
                            )
                    console.log("Carritos pulled")   

                    await query.doc(carrito.id).update({nombre: ""})
                    console.log("Nombre de producto de carrito actualizado")

                    await query.doc(carrito.id).delete()
                    console.log("Ccarrito eliminado")
                }
}

export default ContenedorFirebase;