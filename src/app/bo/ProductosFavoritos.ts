import {Productos} from './Productos';

export class ProductosFavoritos {
  id: number;
  producto: Productos;
  orden: number;

  constructor(id: number, producto: Productos, orden: number) {
    this.id = id;
    this.producto = producto;
    this.orden = orden;
  }
}
