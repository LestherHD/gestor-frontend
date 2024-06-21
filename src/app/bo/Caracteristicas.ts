export class Caracteristicas {
  id: number;
  nombre: string;
  seleccionado: boolean;
  visible: boolean;
  constructor(id: number, nombre: string){
    this.id = id;
    this.nombre = nombre;
  }
}
