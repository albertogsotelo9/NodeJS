
import * as ProdFunc from './ProductFunctions.js'
import express  from 'express';
const app = express();
import Router from 'express';


const routerProductos = express.Router();

routerProductos.get('/', ProdFunc.ProductListed)
routerProductos.get('/:id', ProdFunc.ProductById)
routerProductos.post('/', ProdFunc.InsertProducts)
routerProductos.put('/:pos', ProdFunc.ProductUpdate)
routerProductos.delete('/:pos', ProdFunc.ProductDelete)

export {routerProductos};




