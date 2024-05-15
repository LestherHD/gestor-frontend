import {Sucursales} from './Sucursales';

export class Usuarios {
  id: number;
  usuario: string;
  contrasenia: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  sucursal: Sucursales;
  principal: string;
  sesion: string;

  constructor(id: number,  usuario: string, contrasenia: string, nombres: string,
              apellidos: string, correo: string, telefono: string, sucursal: Sucursales,
              principal: string, sesion: string){
    this.id = id;
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.correo = correo;
    this.telefono = telefono;
    this.sucursal = sucursal;
    this.principal = principal;
    this.sesion = sesion;

  }
}
