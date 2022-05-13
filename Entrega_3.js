const express = require('express')

const PORT = 8080

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const fs = require('fs');
const productos = fs.readFileSync('./producto_3.txt','utf-8')
const prod = JSON.parse(productos)    

app.get('/productos', (req, res) =>{
         res.send(prod)
})






const car = fs.readFileSync('./producto_3.txt','utf-8')
const pan = JSON.parse(car) 
function iut(pan){
    
    let iD = pan[0].id
    
    for (const producto of pan) {
        if(producto.id < iD){
            
          iD = producto.id
         
        }
    }
    
    return iD
   }




const boc = fs.readFileSync('./producto_3.txt','utf-8')
const product = JSON.parse(boc) 

function pip(product) 
            {
                let iDmayor = product[0].id


            for (const producto of product) {
                if(producto.id > iDmayor){
                    iDmayor = producto.id
                    
                }
            }
            return iDmayor
        }
const max = pip(product)
const min = iut(pan)
        

function getAleatiorios(min, max){
        
                return parseInt(Math.random()* (max - min) + min)
        }
        
        
        



app.get('/productosRandom', (req, res) =>{
    res.send(prod[getAleatiorios(min, max)
    ])
    
})





const server = app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT)
 })
 server.on('error', error=> console.log(`Error en servidor ${error}`))