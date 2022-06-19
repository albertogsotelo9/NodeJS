import express from 'express';
import * as RouterProd from './Routes/RoutesProductos.js'
import * as RouterCarrito from './Routes/RoutesCarrito.js'
import { createServer } from 'http';



const app = express();
const httpServer = new createServer(app);


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api/productos', RouterProd.routerProductos)
app.use('/api/carrito', RouterCarrito.routerCarrito)


httpServer.listen(8080, () => console.log('Server ON'))

