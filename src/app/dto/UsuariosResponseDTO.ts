import {Usuarios} from '../bo/Usuarios';

export class UsuariosResponseDTO {

  usuario: Usuarios;
  respuesta: string;
  error: boolean;
  confirmado: boolean;

  nombreCompleto: string;
  nombreUsuario: string;
  correo: string;
  telefono: string;
  principal: string;
  nombreSucursal: string;

}
