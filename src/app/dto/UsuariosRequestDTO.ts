export class UsuariosRequestDTO {

  usuario: string;
  contrasenia: string;
  usuarioId: number;
  accion: string;
  codigo: string;

  constructor(usuario: string, contrasenia: string, usuarioId: number, accion: string, codigo: string) {
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.usuarioId = usuarioId;
    this.accion = accion;
    this.codigo = codigo;
  }
}
