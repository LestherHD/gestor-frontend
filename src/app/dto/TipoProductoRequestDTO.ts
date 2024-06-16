import {TipoProducto} from '../bo/TipoProducto';

export class TipoProductoRequestDTO {

  tipoProducto: TipoProducto;
  page: number;
  size: number;

  constructor(tipoProducto: TipoProducto, page: number, size: number) {
    this.tipoProducto = tipoProducto;
    this.page = page;
    this.size = size;
  }
}
