import {Sucursales} from './Sucursales';
import {DetallePedido} from './DetallePedido';

export class Pedidos {
  id: number;
  estado: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  departamento: string;
  sucursal: Sucursales;
  metodoPago: string;
  detallePedido: DetallePedido[];
  total: number;


  constructor(id: number, estado: string, nombres: string,
              apellidos: string, telefono: string,
              departamento: string, sucursal: Sucursales, metodoPago: string,
              detallePedido: DetallePedido[], total: number) {
    this.id = id;
    this.estado = estado;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.departamento = departamento;
    this.sucursal = sucursal;
    this.metodoPago = metodoPago;
    this.detallePedido = detallePedido;
    this.total = total;
  }
}
