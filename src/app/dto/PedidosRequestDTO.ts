import {Pedidos} from '../bo/Pedidos';

export class PedidosRequestDTO {

  pedidos: Pedidos;
  fechaInicio: Date;
  fechaFin: Date;
  page: number;
  size: number;

  constructor(pedidos: Pedidos, fechaInicio: Date, fechaFin: Date, page: number, size: number) {
    this.pedidos = pedidos;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.page = page;
    this.size = size;
  }
}
