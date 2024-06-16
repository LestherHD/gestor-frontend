import {Component, OnInit} from '@angular/core';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent, FormControlDirective,
  FormFeedbackComponent, FormFloatingDirective,
  FormSelectDirective,
  InputGroupComponent,
  PaginationComponent,
  PaginationModule,
  RowComponent,
  TableDirective
} from '@coreui/angular';
import {CommonModule} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectComponent} from '../../forms/select/select.component';
import {NgbPagination, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomSpinnerComponent} from '../../utils/custom-spinner/custom-spinner.component';
import {ModalCrudComponent} from '../../utils/modal-crud/modal-crud.component';
import {ModalDeleteComponent} from '../../utils/modal-delete/modal-delete.component';
import {ModalFiltersComponent} from '../../utils/modal-filters/modal-filters.component';
import {TipoProducto} from '../../../bo/TipoProducto';
import {Services} from '../../../services/Services';
import {DataUtils} from '../../../utils/DataUtils';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {TipoProductoRequestDTO} from '../../../dto/TipoProductoRequestDTO';

@Component({
  selector: 'app-tipo-producto',
  standalone: true,
  imports: [CardHeaderComponent, CardBodyComponent, ContainerComponent,
    CardComponent, RowComponent, ColComponent, TableDirective, PaginationComponent,
    PaginationModule, CommonModule, ButtonDirective, IconDirective, FormsModule, SelectComponent,
    FormSelectDirective, NgbPaginationModule, CustomSpinnerComponent, ModalCrudComponent,
    FormFeedbackComponent, InputGroupComponent, AlertComponent, CommonModule, FormFloatingDirective, FormControlDirective,
    ReactiveFormsModule, ModalDeleteComponent, ModalFiltersComponent],
  templateUrl: './tipo-producto.component.html',
  styleUrl: './tipo-producto.component.scss'
})
export class TipoProductoComponent implements OnInit {

  listResponse: TipoProducto[];
  form: FormGroup<{ id: any; nombre: any; descripcion: any; }>;
  formFiltros: FormGroup<{ id: any; nombre: any;}>;
  formFiltrosBK: FormGroup<{ id: any; nombre: any; }>;

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

  constructor(public service: Services, public  dataUtils: DataUtils,
              public functionsUtils: FunctionsUtils) {
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
    this.getValuesByPage('', '',
      this.pagination.page, this.pagination.pageSize);
  }


  filtrar(): void {
    this.mostrarModalFiltro = false;
    this.deshabilitarBotones = true;
    this.formFiltrosBK = new FormGroup({
      id: new FormControl({value: this.formFiltros.controls.id.value.toString().trim(), disabled: true}),
      nombre: new FormControl({value: this.formFiltros.controls.nombre.value.toString().trim(), disabled: true})
    });
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(),
      0, this.pagination.pageSize);
  }

  changePage(event: any): void {
    this.pagination.page = event;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.pagination.page, this.pagination.pageSize);
  }

  changeSize(size: any): void {

    this.pagination.pageSize = size.value;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), 0, this.pagination.pageSize);
  }

  getValuesByPage(idValue: any, nombreValue: string, pageValue: any, sizeValue: any): void{
    this.pagination.page = pageValue + 1;
    const request = new TipoProductoRequestDTO(new TipoProducto(idValue, nombreValue, ''), pageValue, sizeValue);

    this.service.mostrarSpinner = true;
    this.service.getFromEntityByPage('tipoProducto', request).subscribe( res => {
      this.listResponse = res.content;
      this.pagination.collectionSize = res.totalElements;
      this.service.mostrarSpinner = false;
    }, error1 => {
      this.service.mostrarSpinner = false;
      console.error('Error al consumir Get All');
    });
  }

  resetFormFiltros(){
    this.formFiltros = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('')
    });
  }

  resetForm(){
    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
  }

  llenarForm(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl(item.nombre, Validators.required),
      descripcion: new FormControl(item.descripcion, Validators.required)
    });
  }

  llenarFormDisabled(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl({value: item.nombre, disabled: true}, Validators.required),
      descripcion: new FormControl({value: item.descripcion, disabled: true}, Validators.required)
    });
  }

  llenarObjeto(form: any): TipoProducto{
    const obj = new TipoProducto(form.controls.id.value,
      form.controls.nombre.value.toString().trim(),
      form.controls.descripcion.value.toString().trim());
    return obj;
  }

  modal(modo: number, item: any): void {
    this.mostrarModalCrud = true;
    this.modo = modo;
    this.deshabilitarBotones = false;
    const inputCodigo = document.getElementById('inputCodigo');
    if (inputCodigo) {
      inputCodigo.focus();
    }

    if (this.modo === 1) {
      this.nombreAccion = 'Agregar';
      this.resetForm();
    } else if (this.modo === 2) {
      this.nombreAccion = 'Editar';
      // this.resetForm();
      this.llenarForm(item);
    } else if (this.modo === 3) {
      this.nombreAccion = 'Ver';
      // this.resetForm();
      this.llenarFormDisabled(item);
    }
  }

  modalEliminar(item: any): void {
    this.nombreAccion = 'Eliminar';
    this.mostrarModalEliminar = true;
    this.deshabilitarBotones = false;

    this.formEliminar = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl({value: item.nombre, disabled: true})
    });
  }


  guardar() {

    if (this.modo === 1){
      if (this.form && this.form.valid){

        const obj: TipoProducto = this.llenarObjeto(this.form);
        this.service.saveEntity('tipoProducto', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            if (!res.error){
              this.resetFormFiltros();
              this.getValuesByPage(this.formFiltros.controls.id.value.toString().trim(),
                this.formFiltros.controls.nombre.value.toString(),
                0, this.pagination.pageSize);
            }
          } , 2000);
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
        this.service.editEntity('tipoProducto', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            if (!res.error) {
              this.resetFormFiltros();
              this.getValuesByPage(this.formFiltros.controls.id.value.toString().trim(),
                this.formFiltros.controls.nombre.value.toString(),
                0, this.pagination.pageSize);
            }
          } , 2000);

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

    this.service.deleteEntity('tipoProducto', this.formEliminar.controls.id.value).subscribe(res => {
      this.type = res.error ? 'danger' : 'success';
      this.mensaje = res.mensaje;
      this.deshabilitarBotones = true;
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarModalEliminar = res.error ? true : false;
        this.deshabilitarBotones = false;
        this.mostrarMensaje = false;
      } , 2000);
      this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
        this.formFiltrosBK.controls.nombre.value.toString(),
        0, this.pagination.pageSize);
    }, error => {
      this.type = 'danger';
      this.deshabilitarBotones = false;
      this.mensaje = 'Ha ocurrido un error al eliminar el registro';
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      } , 2000);
      console.error('Error al consumir delete');
    });
  }

  showModalFilters(){
    this.deshabilitarBotones = false;
    this.nombreAccion = 'Filtrar';
    this.resetFormFiltros();
    this.mostrarModalFiltro = true;
  }

  closeModal(){
    this.resetForm();
    this.mostrarModalCrud = false;
  }

  closeModalDelete(){
    this.resetForm();
    this.mostrarModalEliminar = false;
  }

  closeModalFilters(){
    this.resetFormFiltros();
    this.mostrarModalFiltro = false;
  }

}
