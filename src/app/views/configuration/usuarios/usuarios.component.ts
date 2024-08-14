import {Component, OnInit} from '@angular/core';
import {Caracteristicas} from '../../../bo/Caracteristicas';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {NgbPagination, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {Services} from '../../../services/Services';
import {DataUtils} from '../../../utils/DataUtils';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormFeedbackComponent,
  FormFloatingDirective,
  FormSelectDirective,
  InputGroupComponent,
  PaginationComponent,
  PaginationModule,
  RowComponent,
  TableDirective
} from '@coreui/angular';
import {CommonModule} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {SelectComponent} from '../../forms/select/select.component';
import {CustomSpinnerComponent} from '../../utils/custom-spinner/custom-spinner.component';
import {ModalCrudComponent} from '../../utils/modal-crud/modal-crud.component';
import {ModalDeleteComponent} from '../../utils/modal-delete/modal-delete.component';
import {ModalFiltersComponent} from '../../utils/modal-filters/modal-filters.component';
import {Usuarios} from '../../../bo/Usuarios';
import {Sucursales} from '../../../bo/Sucursales';
import {UsuariosRequestDTO} from '../../../dto/UsuariosRequestDTO';
import {Router} from '@angular/router';

function onlyNumbersAndSpaces(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!/^[0-9\s]+$/.test(value)) {
    return { onlyNumbersAndSpaces: true };
  }

  return null;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CardHeaderComponent, CardBodyComponent, ContainerComponent,
    CardComponent, RowComponent, ColComponent, TableDirective, PaginationComponent,
    PaginationModule, CommonModule, ButtonDirective, IconDirective, FormsModule, SelectComponent,
    FormSelectDirective, NgbPaginationModule, CustomSpinnerComponent, ModalCrudComponent,
    FormFeedbackComponent, InputGroupComponent, AlertComponent, CommonModule, FormFloatingDirective, FormControlDirective,
    ReactiveFormsModule, ModalDeleteComponent, ModalFiltersComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  listResponse: Usuarios[];
  form: FormGroup<{ id: any; nombre: any; apellido: any; telefono: any; correo: any; usuario: any; contrasenia: any; sucursal: any;}>;
  formFiltros: FormGroup<{ id: any; nombre: any; apellido: any; usuario: any; correo: any; telefono: any; sucursal: any; principal: any;}>;
  formFiltrosBK: FormGroup<{ id: any; nombre: any; apellido: any; usuario: any; correo: any; telefono: any; sucursal: any; principal: any;}>;

  formEliminar: FormGroup<{ id: any; nombre: any; usuario: any}>;
  listaSucursales: Sucursales[];

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
              public functionsUtils: FunctionsUtils, private router: Router) {
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

  async ngOnInit(): Promise<void> {

    this.resetFormFiltros();
    this.resetForm();
    this.formFiltrosBK = this.formFiltros;

    await this.service.getAllItemsFromEntityPromise('sucursales').then( (res: Sucursales[]) => {
      this.listaSucursales = res;
    }).catch(error => {
      console.error(error)
    });

    this.getValuesByPage('',
      null, null,
      null, null,
      null, null,
      null,
      0, this.pagination.pageSize);
  }

  filtrar(): void {
    this.mostrarModalFiltro = false;
    this.deshabilitarBotones = true;
    this.formFiltrosBK = new FormGroup({
      id: new FormControl({value: this.formFiltros.controls.id.value.toString().trim(), disabled: true}),
      nombre: new FormControl({value: this.formFiltros.controls.nombre.value.toString().trim(), disabled: true}),
      apellido: new FormControl({value: this.formFiltros.controls.apellido.value.toString().trim(), disabled: true}),
      usuario: new FormControl({value: this.formFiltros.controls.usuario.value.toString().trim(), disabled: true}),
      correo: new FormControl({value: this.formFiltros.controls.correo.value.toString().trim(), disabled: true}),
      telefono: new FormControl({value: this.formFiltros.controls.telefono.value.toString().trim(), disabled: true}),
      sucursal: new FormControl({value: this.formFiltros.controls.sucursal.value, disabled: true}),
      principal: new FormControl({value: this.formFiltros.controls.principal.value.toString().trim(), disabled: true})
    });
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.apellido.value.toString().trim(),
      this.formFiltrosBK.controls.usuario.value.toString().trim(), this.formFiltrosBK.controls.correo.value.toString().trim(),
      this.formFiltrosBK.controls.telefono.value.toString().trim(), this.formFiltrosBK.controls.sucursal.value,
      this.formFiltrosBK.controls.principal.value.toString().trim(),
      0, this.pagination.pageSize);
  }

  changePage(event: any): void {
    this.pagination.page = event;

    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.apellido.value.toString().trim(),
      this.formFiltrosBK.controls.usuario.value.toString().trim(), this.formFiltrosBK.controls.correo.value.toString().trim(),
      this.formFiltrosBK.controls.telefono.value.toString().trim(), this.formFiltrosBK.controls.sucursal.value,
      this.formFiltrosBK.controls.principal.value.toString().trim(),
      this.pagination.page, this.pagination.pageSize);
  }

  changeSize(size: any): void {

    this.pagination.pageSize = size.value;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.apellido.value.toString().trim(),
      this.formFiltrosBK.controls.usuario.value.toString().trim(), this.formFiltrosBK.controls.correo.value.toString().trim(),
      this.formFiltrosBK.controls.telefono.value.toString().trim(), this.formFiltrosBK.controls.sucursal.value,
      this.formFiltrosBK.controls.principal.value.toString().trim(),
      0, this.pagination.pageSize);
  }

  getValuesByPage(idValue: any, nombreValue: string, apellidoValue: string, usuarioValue: string,
                  correoValue: string, telefonoValue: string, sucursalValue: number, principalValue: string,
                  pageValue: any, sizeValue: any): void{
    this.pagination.page = pageValue + 1;

    const sucursal = this.listaSucursales && this.listaSucursales.find(x => x.id === sucursalValue) ? this.listaSucursales.find(x => x.id === sucursalValue) : null;

    const request = new UsuariosRequestDTO(null, null, null, null, null,   new Usuarios(idValue, usuarioValue ? usuarioValue : null, null, nombreValue ? nombreValue : null,
      apellidoValue ? apellidoValue : null, correoValue ? correoValue : null, telefonoValue ? telefonoValue : null, sucursal, principalValue ? principalValue : null), pageValue, sizeValue);

    this.service.mostrarSpinner = true;
    this.service.getFromEntityByPage('usuarios', request).subscribe( res => {
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
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      usuario: new FormControl(''),
      correo: new FormControl(''),
      telefono: new FormControl(''),
      sucursal: new FormControl(null),
      principal: new FormControl('')
    });
  }

  resetForm(){
    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.required, onlyNumbersAndSpaces, Validators.minLength(8)]),
      correo: new FormControl('', [Validators.email, Validators.required]),
      usuario: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      sucursal: new FormControl('', Validators.required),
    });
  }

  llenarForm(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl(item.nombres, Validators.required),
      apellido: new FormControl(item.apellidos, Validators.required),
      telefono: new FormControl(item.telefono, [Validators.required, onlyNumbersAndSpaces, Validators.minLength(8)]),
      correo: new FormControl(item.correo, [Validators.email, Validators.required]),
      usuario: new FormControl(item.usuario, Validators.required),
      contrasenia: new FormControl(item.contrasenia, Validators.required),
      sucursal: new FormControl(item.sucursal ? item.sucursal.id : null, Validators.required)
    });
  }

  llenarFormDisabled(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl({value: item.nombres, disabled: true}, Validators.required),
      apellido: new FormControl({value: item.apellidos, disabled: true}, Validators.required),
      telefono: new FormControl({value: item.telefono, disabled: true}, Validators.required),
      correo: new FormControl({value: item.correo, disabled: true}, Validators.required),
      usuario: new FormControl({value: item.usuario, disabled: true}, Validators.required),
      contrasenia: new FormControl({value: item.contrasenia, disabled: true}, Validators.required),
      sucursal: new FormControl({value: item.sucursal ? item.sucursal.id : null, disabled: true}, Validators.required)
    });
  }

  llenarObjeto(form: any): Usuarios{
    const sucursal = this.listaSucursales.find(x => x.id === Number(form.controls.sucursal.value));
    const obj = new Usuarios(form.controls.id.value,
      form.controls.usuario.value.toString().trim(), form.controls.contrasenia.value.toString().trim(), form.controls.nombre.value.toString().trim(),
      form.controls.apellido.value.toString().trim(),
      form.controls.correo.value.toString().trim(), form.controls.telefono.value.toString().trim(), sucursal, 'N');
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
      nombre: new FormControl({value: item.nombres + ', ' + item.apellidos, disabled: true}),
      usuario: new FormControl({value: item.usuario, disabled: true})
    });
  }


  guardar() {
    this.service.mostrarSpinner = true;
    this.deshabilitarBotones = true;
    if (this.modo === 1){
      if (this.form && this.form.valid){

        const obj: Usuarios = this.llenarObjeto(this.form);
        this.service.saveEntity('usuarios', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.respuesta;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          this.service.mostrarSpinner = false;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            if (!res.error){
              this.resetFormFiltros();
              this.getValuesByPage(this.formFiltros.controls.id.value.toString().trim(),
                this.formFiltros.controls.nombre.value.toString(), this.formFiltros.controls.apellido.value.toString().trim(),
                this.formFiltros.controls.usuario.value.toString().trim(), this.formFiltros.controls.correo.value.toString().trim(),
                this.formFiltros.controls.telefono.value.toString().trim(), this.formFiltros.controls.sucursal,
                this.formFiltros.controls.principal.value.toString().trim(),
                0, this.pagination.pageSize);
            }
          } , 2000);
        }, error1 => {
          this.service.mostrarSpinner = false;
          this.deshabilitarBotones = false;
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
        this.service.editEntity('usuarios', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.respuesta;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          this.service.mostrarSpinner = false;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            if (!res.error) {
              this.resetFormFiltros();
              this.getValuesByPage(this.formFiltros.controls.id.value.toString().trim(),
                this.formFiltros.controls.nombre.value.toString(), this.formFiltros.controls.apellido.value.toString().trim(),
                this.formFiltros.controls.usuario.value.toString().trim(), this.formFiltros.controls.correo.value.toString().trim(),
                this.formFiltros.controls.telefono.value.toString().trim(), this.formFiltros.controls.sucursal.value,
                this.formFiltros.controls.principal.value.toString().trim(),
                0, this.pagination.pageSize);
            }
          } , 2000);

        }, error1 => {
          this.service.mostrarSpinner = false;
          this.deshabilitarBotones = false;
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
    this.service.mostrarSpinner = true;
    this.deshabilitarBotones = true;
    const usuarioLogin: string = JSON.parse(localStorage.getItem("usuario"));

    this.service.deleteEntity('usuarios', this.formEliminar.controls.id.value).subscribe(res => {
      this.type = res.error ? 'danger' : 'success';
      this.mensaje = res.respuesta;
      this.deshabilitarBotones = true;
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.service.mostrarSpinner = false;
        this.mostrarModalEliminar = res.error ? true : false;
        this.deshabilitarBotones = false;
        this.mostrarMensaje = false;
        if (usuarioLogin === this.formEliminar.controls.usuario.value){
          this.functionsUtils.navigateOption(this.router, 'login');
        }

      } , 2000);
      this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
        this.formFiltrosBK.controls.nombre.value.toString(), this.formFiltrosBK.controls.apellido.value.toString().trim(),
        this.formFiltrosBK.controls.usuario.value.toString().trim(), this.formFiltrosBK.controls.correo.value.toString().trim(),
        this.formFiltrosBK.controls.telefono.value.toString().trim(), this.formFiltrosBK.controls.sucursal.value,
        this.formFiltrosBK.controls.principal.value.toString().trim(),
        0, this.pagination.pageSize);
    }, error => {
      this.service.mostrarSpinner = false;
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
