import {Usuarios} from '../bo/Usuarios';

export class UsuariosRequestDTO {

  usuario: string;
  correo: string;
  codigo: string;
  contrasenia: string;
  tipoRecuperacion: string;
  usuarios: Usuarios;
  page: number;
  size: number;

  constructor(usuario: string, correo: string, codigo: string, contrasenia: string, tipoRecuperacion: string,
              usuarios: Usuarios,
              page: number, size: number) {
    this.usuario = usuario;
    this.correo = correo;
    this.codigo = codigo;
    this.contrasenia = contrasenia;
    this.tipoRecuperacion = tipoRecuperacion;
    this.usuarios = usuarios;
    this.page = page;
    this.size = size;
  }
}
