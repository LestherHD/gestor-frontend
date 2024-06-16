import {Sucursales} from '../bo/Sucursales';

export class SucursalesRequestDTO {

  sucursales: Sucursales;
  page: number;
  size: number;

  constructor(sucursales: Sucursales, page: number, size: number) {
    this.sucursales = sucursales;
    this.page = page;
    this.size = size;
  }
}
