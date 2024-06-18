import {Productos} from '../bo/Productos';

export class ProductosRequestDTO {

  producto: Productos;
  page: number;
  size: number;

  constructor(producto: Productos, page: number, size: number) {
    this.producto = producto;
    this.page = page;
    this.size = size;
  }
}
