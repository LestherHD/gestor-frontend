import {Productos} from './Productos';
import {Caracteristicas} from './Caracteristicas';

export class ProductosCaracteristicas {
  id: number;
  producto: Productos;
  caracteristica: Caracteristicas;
  valor: string;
  idTemporal: number;

  constructor(id: number, producto: Productos, caracteristica: Caracteristicas, valor: string) {
    this.id = id;
    this.producto = producto;
    this.caracteristica = caracteristica;
    this.valor = valor;
  }
}
