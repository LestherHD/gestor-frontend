import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
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
  ListGroupItemDirective,
  ListGroupModule,
  PaginationComponent,
  PaginationModule,
  RowComponent,
  TableDirective,
  TemplateIdDirective
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
import {Productos} from '../../../bo/Productos';
import {Services} from '../../../services/Services';
import {DataUtils} from '../../../utils/DataUtils';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {ProductosRequestDTO} from '../../../dto/ProductosRequestDTO';
import {Sucursales} from '../../../bo/Sucursales';
import {TipoProducto} from '../../../bo/TipoProducto';
import {Caracteristicas} from '../../../bo/Caracteristicas';
import {ProductosCaracteristicas} from '../../../bo/ProductosCaracteristicas';
import {ImageUploadComponent} from '../../utils/image-upload/image-upload.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardHeaderComponent, CardBodyComponent, ContainerComponent,
    CardComponent, RowComponent, ColComponent, TableDirective, PaginationComponent,
    PaginationModule, CommonModule, ButtonDirective, IconDirective, FormsModule, SelectComponent,
    FormSelectDirective, NgbPaginationModule, CustomSpinnerComponent, ModalCrudComponent,
    FormFeedbackComponent, InputGroupComponent, AlertComponent, CommonModule, FormFloatingDirective, FormControlDirective,
    ReactiveFormsModule, ModalDeleteComponent, ModalFiltersComponent, ListGroupModule, ListGroupItemDirective,
    ListGroupItemDirective, AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, TemplateIdDirective, ImageUploadComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {

  @ViewChild('topElement', { static: true }) topElement: ElementRef;

  listResponse: Productos[];
  listaTipoProducto: TipoProducto[];

  listaCaracteristicas: Caracteristicas[];
  listaCaracteristicas2: Caracteristicas[];
  listaCaracteristicasSeleccionadas: Caracteristicas[];

  listaCaracteristicasProducto: ProductosCaracteristicas[];
  listaCaracteristicasProductoBK: ProductosCaracteristicas[];
  listaCaracteristicasProducto2: ProductosCaracteristicas[];
  form: FormGroup<{ id: any; nombre: any; descripcion: any; precio: any; imagen: any; tipoProducto: any;}>;
  formFiltros: FormGroup<{ id: any; nombre: any; precioInicio: any; precioFin: any; tipoProducto: any;}>;
  formFiltrosBK: FormGroup<{ id: any; nombre: any; precioInicio: any; precioFin: any; tipoProducto: any;}>;

  formEliminar: FormGroup<{ id: any; nombre: any}>;

  type: string;
  mensaje: string;
  modo: number;
  deshabilitarBotones = false;
  deshabilitarFuncionalidadValores = false;
  mostrarMensaje = false;

  public pagination: NgbPagination;
  nombreAccion: string;
  mostrarModalFiltro: boolean;
  mostrarModalCrud: boolean;
  mostrarModalEliminar: boolean;

  itemsLeft = ['1', '2', '3', '4', '5'];
  itemsRight = [];

  public valorCaracteristica: FormControl;
  public valorCaracteristicaLista: FormControl;
  mostrarAccordion: boolean;

  imageSrc: string;
  mostrarImagen: boolean;

  constructor(public service: Services, public  dataUtils: DataUtils,
              public functionsUtils: FunctionsUtils, public cdr: ChangeDetectorRef) {
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
    this.mostrarImagen = false;
  }

  ngOnInit(): void {
    this.resetFormFiltros();
    this.formFiltrosBK = this.formFiltros;
    this.resetForm();
    this.getValuesByPage('', '', null, null, null,
      this.pagination.page, this.pagination.pageSize);

    this.cargarListas();
    this.valorCaracteristica = new FormControl('');
    this.valorCaracteristicaLista = new FormControl('', Validators.required);
    this.mostrarImagen = false;
  }

  filtrar(): void {
    this.mostrarModalFiltro = false;
    this.deshabilitarBotones = true;
    this.formFiltrosBK = new FormGroup({
      id: new FormControl({value: this.formFiltros.controls.id.value.toString().trim(), disabled: true}),
      nombre: new FormControl({value: this.formFiltros.controls.nombre.value.toString().trim(), disabled: true}),
      precioInicio: new FormControl({value: this.formFiltros.controls.precioInicio.value.toString().trim(), disabled: true}),
      precioFin: new FormControl({value: this.formFiltros.controls.precioFin.value.toString().trim(), disabled: true}),
      tipoProducto: new FormControl({value: this.formFiltros.controls.tipoProducto.value.toString().trim(), disabled: true})
    });
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(),
      this.formFiltrosBK.controls.precioInicio.value, this.formFiltrosBK.controls.precioFin.value,
      this.formFiltrosBK.controls.tipoProducto.value,
      0, this.pagination.pageSize);
  }

  changePage(event: any): void {
    this.pagination.page = event;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(),
      this.formFiltrosBK.controls.precioInicio.value, this.formFiltrosBK.controls.precioFin.value,
      this.formFiltrosBK.controls.tipoProducto.value, this.pagination.page, this.pagination.pageSize);
  }

  changeSize(size: any): void {

    this.pagination.pageSize = size.value;
    this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
      this.formFiltrosBK.controls.nombre.value.toString(),
      this.formFiltrosBK.controls.precioInicio.value, this.formFiltrosBK.controls.precioFin.value,
      this.formFiltrosBK.controls.tipoProducto.value,
       0, this.pagination.pageSize);
  }

  getValuesByPage(idValue: any, nombreValue: string, precioInicio: any, precioFin: any, tipoProducto: any,
                  pageValue: any, sizeValue: any): void{
    this.pagination.page = pageValue + 1;
    const request = new ProductosRequestDTO(new Productos(idValue, nombreValue, '', 0, null,
      tipoProducto === '' ? null : (this.listaTipoProducto ? this.listaTipoProducto.find(x => x.id === Number(tipoProducto)) : null),
      precioInicio === '' || precioInicio === null ? null : Number(precioInicio),
      precioFin === '' || precioFin === null ? null : Number(precioFin), null, null), pageValue, sizeValue);

    this.service.mostrarSpinner = true;
    this.service.getFromEntityByPage('productos', request).subscribe( res => {
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
      precioInicio: new FormControl(''),
      precioFin: new FormControl(''),
      tipoProducto: new FormControl('')
    });
  }

  resetForm(){
    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      imagen: new FormControl(''),
      tipoProducto: new FormControl('', Validators.required)
    });
  }

  llenarForm(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl(item.nombre, Validators.required),
      descripcion: new FormControl(item.descripcion, Validators.required),
      precio: new FormControl(item.precio, Validators.required),
      imagen: new FormControl(item.imagen),
      tipoProducto: new FormControl(item.tipoProducto.id, Validators.required)
    });
  }

  llenarFormDisabled(item: any){
    this.form = new FormGroup({
      id: new FormControl({value: item.id, disabled: true}),
      nombre: new FormControl({value: item.nombre, disabled: true}, Validators.required),
      descripcion: new FormControl({value: item.descripcion, disabled: true}, Validators.required),
      precio: new FormControl({value: item.precio, disabled: true}, Validators.required),
      imagen: new FormControl({value: item.imagen, disabled: true}),
      tipoProducto: new FormControl({value: item.tipoProducto.id, disabled: true}, Validators.required)
    });
  }

  llenarObjeto(form: any): Productos{
    const obj = new Productos(form.controls.id.value,
      form.controls.nombre.value, form.controls.descripcion.value.toString().trim(), form.controls.precio.value,
      form.controls.imagen.value,
      this.listaTipoProducto ? this.listaTipoProducto.find(x => x.id === Number(form.controls.tipoProducto.value.toString().trim())) : null,
      0, 0, null, 'A');
    obj.caracteristicas = this.listaCaracteristicasProducto;
    obj.imageSrc = this.imageSrc;
    return obj;
  }

  cargarListas(){

    this.service.getAllItemsFromEntity('tipoProducto').subscribe((res: Sucursales[]) =>{
      this.listaTipoProducto = res;
    }, error => {
      console.error(error);
    });

    this.listaCaracteristicas = [];
    this.service.getAllItemsFromEntity('caracteristicas').subscribe( (res: Caracteristicas[]) => {
      this.listaCaracteristicas = res;
      if (this.listaCaracteristicas && this.listaCaracteristicas.length > 0){
        this.listaCaracteristicas.forEach(x => {
          x.seleccionado = false;
          x.visible = false;
        });
      }
    }, error => {
      console.error(error);
    });

    this.listaCaracteristicas2 = [];
    this.listaCaracteristicasProducto = [];
    this.listaCaracteristicasProductoBK = [];
    this.listaCaracteristicasProducto2 = [];
    this.listaCaracteristicasSeleccionadas = [];

  }

  modal(modo: number, item: any): void {
    this.mostrarImagen = true;
    this.imageSrc = item ? item.imagen : '';
    this.mostrarAccordion = true;
    this.listaCaracteristicasProducto = [];
    this.listaCaracteristicasProductoBK = [];
    this.listaCaracteristicasProducto2 = [];

    this.listaCaracteristicas2 = this.listaCaracteristicas;
    this.listaCaracteristicasSeleccionadas = [];

    this.valorCaracteristica = new FormControl('');

    this.mostrarModalCrud = true;
    this.modo = modo;
    this.deshabilitarBotones = false;

    if (this.listaCaracteristicas2){
      this.listaCaracteristicas2.forEach(caracteristica => {
        if (item && item.caracteristicas){
          const found = item.caracteristicas.some(
            item => item.caracteristica.id === caracteristica.id
          );
          if (found) {
            caracteristica.seleccionado = true;
          } else {
            caracteristica.seleccionado = false;
          }
        }
      });
      this.moverADerecha();
    }

    if (this.modo === 1) {
      this.nombreAccion = 'Agregar';
      this.resetForm();
    } else if (this.modo === 2) {
      this.listaCaracteristicasProductoBK = item.caracteristicas;

      this.filtrarListadoFinalCaracteristicasProducto();

      if (this.listaCaracteristicasProducto && this.listaCaracteristicasProducto.length > 0){
        let id = 1;
        this.listaCaracteristicasProducto2 = [];
        this.listaCaracteristicasProducto.forEach(x => {
          x.idTemporal = id++;
          this.filtrarCaracteristicasProducto(x.caracteristica);
        });

      }
      this.nombreAccion = 'Editar';
      this.llenarForm(item);
    } else if (this.modo === 3) {
      this.listaCaracteristicasProductoBK = item.caracteristicas;

      this.filtrarListadoFinalCaracteristicasProducto();

      if (this.listaCaracteristicasProducto && this.listaCaracteristicasProducto.length > 0){
        let id = 1;
        this.listaCaracteristicasProducto2 = [];
        this.listaCaracteristicasProducto.forEach(x => {
          x.idTemporal = id++;
          this.filtrarCaracteristicasProducto(x.caracteristica);
        });
      }
      this.nombreAccion = 'Ver';
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
    this.mostrarMensaje = false;
    if (this.listaCaracteristicasSeleccionadas && this.listaCaracteristicasSeleccionadas.length === 0){
      this.mostrarMensaje = true;
      this.type = 'danger';
      this.mensaje = 'Error, debe seleccionar al menos una característica y un valor para cada característica; mínimo 1 característica y 1 valor por característica y máximo 5 características y 5 valores por característica';
      this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        this.mostrarMensaje = false;
      } , 7000);
      return;
    } else if (this.listaCaracteristicasProducto){
      this.listaCaracteristicasSeleccionadas.forEach(car=> {
        const obj = this.listaCaracteristicasProducto.filter(x=> x.caracteristica.id === car.id);
        if (!obj || (obj && obj.length === 0)){
          this.mostrarMensaje = true;
        }
      });
      if (this.mostrarMensaje){
        this.type = 'danger';
        this.mensaje = 'Error, debe seleccionar al menos una característica y un valor para cada característica; mínimo 1 característica y 1 valor por característica y máximo 5 características y 5 valores por característica';
        this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          this.mostrarMensaje = false;
        } , 7000);
        return;
      }
    }
    if (this.modo === 1){
      if (this.form && this.form.valid){

        const obj: Productos = this.llenarObjeto(this.form);
        this.service.saveEntity('productos', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.valorCaracteristica.disable();
          this.mostrarMensaje = true;
          this.service.mostrarSpinner = false;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            this.valorCaracteristica.enable();
            if (this.deshabilitarBotones){
              this.valorCaracteristica.disable();
              this.mostrarAccordion = false;
              this.mostrarImagen = false;
            }

            if (!res.error){
              this.resetFormFiltros();
              this.getValuesByPage(this.formFiltros.controls.id.value.toString().trim(),
                this.formFiltros.controls.nombre.value.toString(),
                this.formFiltros.controls.precioInicio.value, this.formFiltros.controls.precioFin.value,
                this.formFiltros.controls.tipoProducto.value,
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
        this.service.editEntity('productos', obj).subscribe( res => {
          this.type = res.error ? 'danger' : 'success';
          this.mensaje = res.mensaje;
          this.deshabilitarBotones = true;
          this.valorCaracteristica.disable();
          this.mostrarMensaje = true;
          this.service.mostrarSpinner = false;
          setTimeout(() => {
            this.mostrarMensaje = false;
            this.mostrarModalCrud = res.error ? true : false;
            this.deshabilitarBotones = res.error ? false : true;
            this.valorCaracteristica.enable();
            if (this.deshabilitarBotones){
              this.mostrarAccordion = false;
              this.valorCaracteristica.disable();
              this.mostrarImagen = false;
            }

            if (!res.error) {
              this.resetFormFiltros();
              this.getValuesByPage(this.formFiltros.controls.id.value.toString().trim(),
                this.formFiltros.controls.nombre.value.toString(),
                this.formFiltros.controls.precioInicio.value, this.formFiltros.controls.precioFin.value,
                this.formFiltros.controls.tipoProducto.value,
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
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async eliminar() {
    this.deshabilitarBotones = true;
    this.service.mostrarSpinner = true;

    this.service.deleteEntity('productos', this.formEliminar.controls.id.value).subscribe(res => {
      this.type = res.error ? 'danger' : 'success';
      this.mensaje = res.mensaje;
      this.deshabilitarBotones = true;
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarModalEliminar = res.error ? true : false;
        this.deshabilitarBotones = false;
        this.service.mostrarSpinner = false;
        this.mostrarMensaje = false;
      } , 2000);
      this.getValuesByPage(this.formFiltrosBK.controls.id.value.toString().trim(),
        this.formFiltrosBK.controls.nombre.value.toString(),
        this.formFiltrosBK.controls.precioInicio.value, this.formFiltrosBK.controls.precioFin.value,
        this.formFiltrosBK.controls.tipoProducto.value,
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
    this.filtrar();
    this.mostrarImagen = false;
    this.resetForm();
    this.mostrarAccordion = false;
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

  moverADerecha() {

    const lista = this.listaCaracteristicas2.filter(x => x.seleccionado === true);
    if (lista && lista.length > 0) {
      lista.forEach(x => {
        this.listaCaracteristicasSeleccionadas.push(x);
      });
      this.listaCaracteristicas2 = this.listaCaracteristicas2.filter(x => x.seleccionado === false);
      this.listaCaracteristicasSeleccionadas.forEach(x => x.seleccionado = false);
      this.listaCaracteristicasSeleccionadas.sort((a, b) => a.nombre.localeCompare(b.nombre));

    }
    this.filtrarListadoFinalCaracteristicasProducto();

  }

  moverAIzquierda() {

    const lista = this.listaCaracteristicasSeleccionadas.filter(x=> x.seleccionado === true);
    if (lista && lista.length > 0){
      lista.forEach(x => {
        this.listaCaracteristicas2.push(x);
      });
      this.listaCaracteristicasSeleccionadas = this.listaCaracteristicasSeleccionadas.filter(x=> x.seleccionado === false);
      this.listaCaracteristicas2.forEach(x => x.seleccionado = false);
      this.listaCaracteristicas2.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    this.filtrarListadoFinalCaracteristicasProducto();
  }

  eliminarCaracteristicaProducto(item: any) {

    this.listaCaracteristicasProducto = this.listaCaracteristicasProducto.filter(x => x.idTemporal !== Number(item.idTemporal));
    this.filtrarCaracteristicasProducto(item.caracteristica);
  }

  agregarCaracteristicaProducto(caracteristica: any, valor: string) {
    const productoCaracteristica: ProductosCaracteristicas = new ProductosCaracteristicas(null, null, caracteristica, valor);
    productoCaracteristica.idTemporal = this.listaCaracteristicasProducto.length + 1;
    this.listaCaracteristicasProducto.push(productoCaracteristica);
    this.filtrarCaracteristicasProducto(caracteristica);
    this.valorCaracteristica.setValue('');
  }

  filtrarCaracteristicasProducto(item: any){
    this.valorCaracteristica.setValue('');
    this.listaCaracteristicasProducto2 = this.listaCaracteristicasProducto.filter(x=> x.caracteristica.id === Number(item.id));
  }

  validarSeleccionados(): Boolean {
   if (this.listaCaracteristicas){
     let count = 0;
     this.listaCaracteristicas.forEach(x => {
       if (x.seleccionado){
         count++;
       }
     });
     if (count === 5 || ( this.listaCaracteristicasSeleccionadas.length + count == 5)){
       return true;
     }
   }
    return false;
  }

  filtrarListadoFinalCaracteristicasProducto(){
    this.listaCaracteristicasProducto = [];
    this.listaCaracteristicasSeleccionadas.forEach(x=>{
      this.listaCaracteristicasProductoBK.filter(a=> a.caracteristica.id === x.id).forEach(a=>{
        this.listaCaracteristicasProducto.push(a);
      })
    });
  }

  removeSpacesString(value: string, obj: any): void {
    this.deshabilitarFuncionalidadValores = false;
    obj.valor = value.toString().trim();
    if (obj.valor === ''){
      this.deshabilitarFuncionalidadValores = true;
    }
  }

  removeSpacesFormControl(formControl: FormControl): void {
    this.valorCaracteristica.setValue(this.valorCaracteristica.value.toString().trim());
  }

  recibirImagen(value: string){
    this.imageSrc = value;
  }
}
