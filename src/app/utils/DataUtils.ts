import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUtils {

  listaDepartamentos: { codigo: string, descripcion: string }[] = [
    { codigo: '1', descripcion: 'Guatemala' },
    { codigo: '2', descripcion: 'El Progreso' },
    { codigo: '3', descripcion: 'Sacatepéquez' },
    { codigo: '4', descripcion: 'Chimaltenango' },
    { codigo: '5', descripcion: 'Escuintla' },
    { codigo: '6', descripcion: 'Santa Rosa' },
    { codigo: '7', descripcion: 'Sololá' },
    { codigo: '8', descripcion: 'Totonicapán' },
    { codigo: '9', descripcion: 'Quetzaltenango' },
    { codigo: '10', descripcion: 'Suchitepéquez' },
    { codigo: '11', descripcion: 'Retalhuleu' },
    { codigo: '12', descripcion: 'San Marcos' },
    { codigo: '13', descripcion: 'Huehuetenango' },
    { codigo: '14', descripcion: 'Quiché' },
    { codigo: '15', descripcion: 'Baja Verapaz' },
    { codigo: '16', descripcion: 'Alta Verapaz' },
    { codigo: '17', descripcion: 'Petén' },
    { codigo: '18', descripcion: 'Izabal' },
    { codigo: '19', descripcion: 'Zacapa' },
    { codigo: '20', descripcion: 'Chiquimula' },
    { codigo: '21', descripcion: 'Jalapa' },
    { codigo: '22', descripcion: 'Jutiapa' }
  ];

  listaRangoPrecios: { codigo: number, descripcion: string }[] = [
    { codigo: 50, descripcion: '50' },
    { codigo: 100, descripcion: '100' },
    { codigo: 300, descripcion: '300' },
    { codigo: 500, descripcion: '500' }
  ];

  constructor(){
  }

  descripcionPorCodigo(codigo: string): string {
    const departamento = this.listaDepartamentos.find(dep => dep.codigo === codigo);
    return departamento ? departamento.descripcion : '';
  }
}
