class Contenedor{
    constructor() {
        this.ruta = './producto_2.txt'
        }


        async save(obj){

               const fs = require('fs');
               try{ const read = await fs.promises.readFile(this.ruta,'utf8')
                    const produc = JSON.parse(read)
                    let newId 
                    if(produc.length == 0){
                         newId = 1
                         
                    }else {
                         newId = produc[produc.length - 1].id + 1
                         
                     }
                     
                     const newObj = {...obj, id: newId}
                     produc.push(newObj)

 
                     fs.writeFile(this.ruta,JSON.stringify(produc, null, 2),err => {
                                if(err){
                                    console.log('Error de Escritura', +err)
                                    throw new Error('Failed to read file', +err)
                                }
                                console.log('Escritura exitosa' )
                            })
                
               }  catch(err){
                        console.log(err) 
                        throw new Error('Error en la lectura del archivo', +err)
               }  
        }

        async getById(Number){
            const fs = require('fs');
            try {const read = await fs.promises.readFile(this.ruta,'utf8')
                 const produc = JSON.parse(read)
                 for(const producto of produc){
                    if(producto.id == Number){
                        console.log(producto)
                    } else {
                        
                    }
                 }
          }catch(err){
                console.log(err) 
                throw new Error('Error en la lectura del archivo', +err)
           }  
        }
        
        async getAll(){
            try{const fs = require('fs');
             const read = await  fs.promises.readFile(this.ruta,'utf8')
                const produc = JSON.parse(read)
                console.log(produc)
            }catch(err){
                console.log(err) 
                throw new Error('Error en la lectura del archivo', +err)
           }  
        }

        async deleteById(Number){
            const fs = require('fs');
            try{ const read = await fs.promises.readFile(this.ruta,'utf8')
                const produc = JSON.parse(read)
                for(const producto of produc){
                    if(producto.id == Number){
                       const delte = delete produc[Number - 1]
                       fs.writeFile(this.ruta,JSON.stringify(produc, null, 2),err => {
                        if(err){
                            console.log('Error de Escritura', +err)
                            throw new Error('Failed to read file', +err)
                        }
                        console.log('Escritura exitosa' )
                    }) 


                    } else {
                       
                    }
                 }
            }catch(err){
                console.log(err) 
                throw new Error('Error en la lectura del archivo', +err)
           }  
        }

        async deleteAll(){
            const fs = require('fs');
            try { const read =  await fs.promises.readFile(this.ruta,'utf8')
                    const produc = JSON.parse(read)
                    fs.writeFile(this.ruta,JSON.stringify([],null,2),err => {
                        if(err){
                            console.log('Error de Escritura', +err)
                        
                        }
                        console.log('Escritura exitosa' )
                    })
            }catch(err){
                console.log(err) 
                throw new Error('Error en la lectura del archivo', +err)
           }  
        }     

}    

   
   
    const coque = new Contenedor()

  //  coque.save(({nombre: 'tito', edad: 31}))

 //   coque.getById(2)

  //  coque.getAll()
  //  coque.deleteById(3)
//coque.deleteAll()
