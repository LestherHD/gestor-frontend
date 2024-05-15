import {Usuarios} from '../bo/Usuarios';

export class UsuariosRequestDTO {

  usuarios: Usuarios;
  page: number;
  size: number;

  constructor(usuarios: Usuarios, page: number, size: number) {
    this.usuarios = usuarios;
    this.page = page;
    this.size = size;
  }
}
