import {Productos} from './Productos';
import {Caracteristicas} from './Caracteristicas';

export class ProductosCaracteristicas {
  id: number;
  producto: Productos;
  caracteristica: Caracteristicas;
  valor: string;
  precio: number;
  idTemporal: number;

  constructor(id: number, producto: Productos, caracteristica: Caracteristicas, valor: string, precio: number) {
    this.id = id;
    this.producto = producto;
    this.caracteristica = caracteristica;
    this.valor = valor;
    this.precio = precio;
  }
}
