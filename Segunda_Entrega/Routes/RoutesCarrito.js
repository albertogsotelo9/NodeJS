import * as CarroFunc from './CarritoFunctions.js'
import express  from 'express';
import Router from 'express'
const app = express();

const routerCarrito = express.Router();



routerCarrito.get('/:id/productos', CarroFunc.productListed)
routerCarrito.post('/', CarroFunc.createCart)
routerCarrito.post('/:id/productos', CarroFunc.insertProdToCartById)
routerCarrito.delete('/:pos/productos/:id_prod', CarroFunc.deleteProdById)
routerCarrito.delete('/:id', CarroFunc.deleteCart)

export  {routerCarrito};