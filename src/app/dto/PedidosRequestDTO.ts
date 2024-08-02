import {Pedidos} from '../bo/Pedidos';

export class PedidosRequestDTO {

  pedidos: Pedidos;
  fechaInicio: string;
  fechaFin: string;
  idSucursal: number;
  estadoProducto: string;
  page: number;
  size: number;

  constructor(pedidos: Pedidos, fechaInicio: string, fechaFin: string, idSucursal: number, estadoProducto: string, page: number, size: number) {
    this.pedidos = pedidos;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.idSucursal = idSucursal;
    this.estadoProducto = estadoProducto;
    this.page = page;
    this.size = size;
  }
}
