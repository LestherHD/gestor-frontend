import {Component, OnInit} from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  FormSelectDirective,
  PaginationComponent,
  PaginationModule,
  RowComponent,
  TableDirective
} from '@coreui/angular';
import {CommonModule} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {SelectComponent} from '../../forms/select/select.component';
import {Sucursales} from '../../../bo/Sucursales';
import {NgbPagination, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {Services} from '../../../services/Services';
import {SucursalesRequestDTO} from '../../../dto/SucursalesRequestDTO';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CardHeaderComponent, CardBodyComponent, ContainerComponent,
    CardComponent, RowComponent, ColComponent, TableDirective, PaginationComponent,
    PaginationModule, CommonModule, ButtonDirective, IconDirective, FormsModule, SelectComponent,
    FormSelectDirective, NgbPaginationModule],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.scss'
})
export class SucursalesComponent implements OnInit{

  listResponse: Sucursales[];
  form: FormGroup<{ id: any; nombre: any; descripcion: any; departamento: any }>;
  formFiltros: FormGroup<{ id: any; nombre: any; departamento: any }>;
  formFiltrosBK: FormGroup<{ id: any; nombre: any; departamento: any }>;

  formEliminar: FormGroup<{ id: any; nombre: any}>;

  type: string;
  mensaje: string;
  modo: number;
  deshabilitarBotones = false;
  mostrarMensaje = false;

  public pagination: NgbPagination;
  nombreAccion: string;
  mostrarModalFiltro: boolean;
  mostrarModalCrud: boolean;
  mostrarModalEliminar: boolean;

  constructor(public service: Services) {
    this.listResponse = [];
    this.type = '';
    this.mensaje = '';
    this.nombreAccion = '';
    this.modo = 0;
    this.deshabilitarBotones = false;
    this.mostrarMensaje = false;
    this.mostrarModalFiltro = false;
    this.mostrarModalCrud = false;
    this.mostrarModalEliminar = false;
    this.pagination = new NgbPagination();
    this.pagination.page = 0;
    this.pagination.pageSize = 10;
    this.pagination.maxSize = 4;
  }

  ngOnInit(): void {
    this.resetFormFiltros();
    this.formFiltrosBK = this.formFiltros;
    this.resetForm();
    this.getValuesByPage('', '', '',
      this.pagination.page, this.pagination.pageSize);
  }


  filtrar(collapse: any): void {
    collapse.toggle();
    this.formFiltrosBK = new FormGroup({
      id: new FormControl({value: this.formFiltros.controls.id.value.toString().trim(), disabled: true}),
      nombre: new FormControl({value: this.formFiltros.controls.nombre.value.toString().trim(), disabled: true}),
      departamento: new FormControl({value: this.formFiltros.controls.departamento.value.toString().trim(), disabled: true})
    });
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.departamento.value.toString()
        .trim(),
      0, this.pagination.pageSize);
  }

  changePage(event: any): void {
    this.pagination.page = event;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.departamento.value.toString()
        .trim(), this.pagination.page, this.pagination.pageSize);
  }

  changeSize(size: any): void {

    this.pagination.pageSize = size.value;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.departamento.value.toString()
        .trim(), 0, this.pagination.pageSize);
  }

  getValuesByPage(idValue: any, nombreValue: string, departamentoValue: string, pageValue: any, sizeValue: any): void{
    this.pagination.page = pageValue + 1;
    const request = new SucursalesRequestDTO(new Sucursales(idValue, nombreValue, '', departamentoValue), pageValue, sizeValue);

    this.service.getFromEntityByPage('sucursales', request).subscribe( res => {
      this.listResponse = res.content;
      this.pagination.collectionSize = 100;
    }, error1 => {
      console.error('Error al consumir Get All');
    });
  }

  resetFormFiltros(){
    this.formFiltros = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required)
    });
  }

  resetForm(){
    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required)
    });
  }

  llenarObjeto(form: any): Sucursales{
    const obj = new Sucursales(form.controls.nombre.value,
      form.controls.nombre.value.toString().trim(),
      form.controls.descripcion.value.toString().trim(),
      form.controls.departamento.value.toString().trim());
    return obj;
  }

  modal(content: any, modo: number, item: any): void {
    this.mostrarModalCrud = true;
    this.modo = modo;
    this.deshabilitarBotones = false;
    const inputCodigo = document.getElementById('inputCodigo');
    if (inputCodigo) {
      inputCodigo.focus();
    }

    if (this.modo === 1) {
      this.nombreAccion = 'Agregar';
      this.form = new FormGroup({
        id: new FormControl(''),
        nombre: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        departamento: new FormControl('', Validators.required)
      });
    } else if (this.modo === 2) {
      this.nombreAccion = 'Editar';
      this.form = new FormGroup({
        id: new FormControl(''),
        nombre: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        departamento: new FormControl('', Validators.required)
      });
      this.form = new FormGroup({
        id: new FormControl({value: item.id, disabled: true}),
        nombre: new FormControl(item.nombre, Validators.required),
        descripcion: new FormControl(item.descripcion, Validators.required),
        departamento: new FormControl(item.departamento, Validators.required)
      });
    } else if (this.modo === 3) {
      this.nombreAccion = 'Ver';
      this.form = new FormGroup({
        id: new FormControl({value: item.id, disabled: true}),
        nombre: new FormControl({value: item.nombre, disabled: true}),
        descripcion: new FormControl({value: item.descripcion, disabled: true}),
        departamento: new FormControl({value: item.departamento, disabled: true})
      });
    }
  }

  modalEliminar(contentEliminar: any, item: any): void {
    this.deshabilitarBotones = false;
    this.formEliminar = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl({value: item.nombre, disabled: true})
    });
  }


  guardar() {

    if (this.modo === 1){
      if (this.form && this.form.valid){

        const obj: Sucursales = this.llenarObjeto(this.form);
        this.service.saveEntity('sucursales', obj).subscribe( res => {
          this.type = res.error ? 'success' : 'danger';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
          } , 1000);
          this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
            this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.departamento.value.toString().trim(),
            0, this.pagination.pageSize);
        }, error1 => {
          this.type = 'danger';
          this.mensaje = 'Ha ocurrido un error al insertar los datos';
          this.mostrarMensaje = true;
          setTimeout(() => {
            this.mostrarMensaje = false;
          } , 1500);
          console.error('Error al consumir Post');
        });
      }
    } else if (this.modo === 2){
      if (this.form && this.form.valid){
        const obj = this.llenarObjeto(this.form);
        this.service.editEntity('sucursales', obj).subscribe( res => {
          this.type = res.error ? 'success' : 'danger';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
          } , 1000);
          this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
            this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.departamento.value.toString().trim(),
            0, this.pagination.pageSize);
        }, error1 => {
          this.type = 'danger';
          this.mensaje = 'Ha ocurrido un error al actualizar los datos';
          this.mostrarMensaje = true;
          setTimeout(() => {
            this.mostrarMensaje = false;
          } , 1500);
          console.error('Error al consumir Post');
        });
      }
    }
  }

  async eliminar() {

    this.service.deleteEntity('sucursales', this.form.controls.id.value).subscribe(res => {
      this.type = 'success';
      this.mensaje = 'Registro eliminado';
      this.deshabilitarBotones = true;
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarModalEliminar = false;
        this.mostrarMensaje = false;
      } , 1000);
      this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
        this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.departamento.value.toString().trim(),
        0, this.pagination.pageSize);
    }, error => {
      this.type = 'danger';
      this.mensaje = 'Ha ocurrido un error al eliminar el registro';
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      } , 1500);
      console.error('Error al consumir delete');
    });
  }

}
