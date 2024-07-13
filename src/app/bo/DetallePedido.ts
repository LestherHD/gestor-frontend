import {Productos} from './Productos';

export class DetallePedido {
  id: number;
  producto: Productos;
  descripcion: string;
  cantidad: number;
  precio: number;


  constructor(id: number, producto: Productos, descripcion: string,
              cantidad: number, precio: number) {
    this.id = id;
    this.producto = producto;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}
