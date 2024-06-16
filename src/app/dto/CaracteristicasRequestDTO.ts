import {Caracteristicas} from '../bo/Caracteristicas';

export class CaracteristicasRequestDTO {

  caracteristicas: Caracteristicas;
  page: number;
  size: number;

  constructor(caracteristicas: Caracteristicas, page: number, size: number) {
    this.caracteristicas = caracteristicas;
    this.page = page;
    this.size = size;
  }
}
