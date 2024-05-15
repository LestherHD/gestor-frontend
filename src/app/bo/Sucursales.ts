export class Sucursales {
  id: number;
  nombre: string;
  descripcion: string;
  departamento: string;

  constructor(id: number, nombre: string, descripcion: string, departamento: string){
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.departamento = departamento;
  }
}
