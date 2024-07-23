import {Component, OnInit} from '@angular/core';
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
import {ProductosFavoritos} from '../../../bo/ProductosFavoritos';
import {Productos} from '../../../bo/Productos';
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

function onlyNumbersAndSpaces(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Verificar que el valor solo contenga números
  if (!/^\d+$/.test(value)) {
    return { onlyNumbers: true };
  }

  const numValue = Number(value);

  // Verificar que el número esté en el rango de 1 a 5
  if (numValue < 1 || numValue > 5) {
    return { outOfRange: true };
  }

  return null;
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CardHeaderComponent, CardBodyComponent, ContainerComponent,
    CardComponent, RowComponent, ColComponent, TableDirective, PaginationComponent,
    PaginationModule, CommonModule, ButtonDirective, IconDirective, FormsModule, SelectComponent,
    FormSelectDirective, NgbPaginationModule, CustomSpinnerComponent, ModalCrudComponent,
    FormFeedbackComponent, InputGroupComponent, AlertComponent, CommonModule, FormFloatingDirective, FormControlDirective,
    ReactiveFormsModule, ModalDeleteComponent, ModalFiltersComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit{

  listResponse: ProductosFavoritos[];
  listProducts: Productos[];
  form: FormGroup<{ id: any; productoId: any; orden: any;}>;
  formEliminar: FormGroup<{ id: any; nombre: any}>;

  type: string;
  mensaje: string;
  modo: number;
  deshabilitarBotones = false;
  mostrarMensaje = false;

  public pagination: NgbPagination;
  nombreAccion: string;
  mostrarModalCrud: boolean;
  mostrarModalEliminar: boolean;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(public service: Services, public  dataUtils: DataUtils,
              public functionsUtils: FunctionsUtils) {
    this.listResponse = [];
    this.type = '';
    this.mensaje = '';
    this.nombreAccion = '';
    this.modo = 0;
    this.deshabilitarBotones = false;
    this.mostrarMensaje = false;
    this.mostrarModalCrud = false;
    this.mostrarModalEliminar = false;
    this.pagination = new NgbPagination();
    this.pagination.page = 0;
    this.pagination.pageSize = 5;
    this.pagination.maxSize = 1;
    this.imagePreview = null;
  }

  ngOnInit(): void {
    this.resetForm();
    this.getAll();
    this.getAllProducts();
  }

  resetForm(){
    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      productoId: new FormControl('', Validators.required),
      orden: new FormControl('',  [onlyNumbersAndSpaces,  Validators.required])
    });
  }

  llenarForm(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      productoId: new FormControl(item.producto.id, Validators.required),
      orden: new FormControl(item.orden, [onlyNumbersAndSpaces,  Validators.required])
    });
  }

  llenarFormDisabled(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      productoId: new FormControl({value: item.producto.id, disabled: true}, Validators.required),
      orden: new FormControl({value: item.orden, disabled: true}, [onlyNumbersAndSpaces,  Validators.required])
    });
  }

  llenarObjeto(form: any): ProductosFavoritos{
    const producto = this.listProducts.find(x => x.id === Number(form.controls.productoId.value));
    const obj = new ProductosFavoritos(form.controls.id.value,
      producto,
      form.controls.orden.value);
    this.cargarImagen(null, producto.id);
    return obj;
  }

  modal(modo: number, item: any): void {
    this.imagePreview = null;
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
    this.service.mostrarSpinner = true;
    this.deshabilitarBotones = true;
    if (this.modo === 1){
      if (this.form && this.form.valid){

        const obj: ProductosFavoritos = this.llenarObjeto(this.form);
        this.service.saveEntity('productosFavoritos', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          this.service.mostrarSpinner = false;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            if (!res.error){
              this.getAll();
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
        this.service.editEntity('productosFavoritos', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.mostrarMensaje = true;
          this.service.mostrarSpinner = false;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            if (!res.error) {
              this.getAll();
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
    this.service.deleteEntity('productosFavoritos', this.formEliminar.controls.id.value).subscribe(res => {
      this.type = res.error ? 'danger' : 'success';
      this.mensaje = res.mensaje;
      this.deshabilitarBotones = true;
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarModalEliminar = res.error ? true : false;
        this.service.mostrarSpinner = false;
        this.deshabilitarBotones = false;
        this.mostrarMensaje = false;
      } , 2000);
      this.getAll();
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

  closeModal(){
    this.resetForm();
    this.mostrarModalCrud = false;
  }

  closeModalDelete(){
    this.resetForm();
    this.mostrarModalEliminar = false;
  }

  getAll(){
    this.service.getAllItemsFromEntity('productosFavoritos').subscribe( (res: ProductosFavoritos[]) => {
      this.listResponse = res;
    });
  }

  getAllProducts(){
    this.service.getAllItemsFromEntity('productos').subscribe( (res: Productos[]) => {
      this.listProducts = res;
    });
  }

  cargarImagen(event: any, productId: number) {
    let prod = null;
      if (event != null){
        prod = this.listProducts.find(x => x.id === Number(event.value));
      } else {
        prod = this.listProducts.find(x => x.id === productId);
      }
    const blob  = this.functionsUtils.base64ToBlob(prod.imagen);
    this.imagePreview = this.functionsUtils.blobToUrl(blob);
  }
}
