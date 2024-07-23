import {Component} from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Services} from '../../services/Services';
import {FunctionsUtils} from '../../utils/FunctionsUtils';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Pedidos} from '../../bo/Pedidos';
import {PedidosRequestDTO} from '../../dto/PedidosRequestDTO';
import {Sucursales} from '../../bo/Sucursales';
import {CustomSpinnerComponent} from '../utils/custom-spinner/custom-spinner.component';
import {
  AlertComponent,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonGroupModule,
  CardBodyComponent,
  CardComponent,
  FormControlDirective,
  FormDirective,
  TableDirective
} from '@coreui/angular';
import {CommonModule} from '@angular/common';
import {Usuarios} from '../../bo/Usuarios';
import {UrlField} from '../../bo/UrlField';
import {DataUtils} from '../../utils/DataUtils';
import {ModalCrudComponent} from '../utils/modal-crud/modal-crud.component';
import {DetallePedido} from '../../bo/DetallePedido';
import { NgxPaginationModule } from 'ngx-pagination';
import {IconModule} from '@coreui/icons-angular';

@Component({
  selector: 'app-dashboard-pedidos',
  standalone: true,
  imports: [CustomSpinnerComponent, CardBodyComponent, CardComponent, NgbPagination, CommonModule, FormDirective, ReactiveFormsModule,
  ButtonGroupComponent, ButtonGroupModule, ButtonDirective, ModalCrudComponent, FormControlDirective, TableDirective, NgxPaginationModule, IconModule, AlertComponent ],
  templateUrl: './dashboard-pedidos.component.html',
  styleUrl: './dashboard-pedidos.component.scss'
})
export class DashboardPedidosComponent {

  usuario: Usuarios;
  estadoSeleccionado: string = '';

  listResponse: Pedidos[];
  pagination: NgbPagination;

  listaSucursales: Sucursales[];

  sucursalId: FormControl;
  estado: FormControl;
  mostrarModalCrud: boolean;
  mostrarModalCambiarEstado: boolean;

  listDetallePedido: DetallePedido[];
  paginationDetail: NgbPagination;
  nombreAccion: string;
  pedido: Pedidos;
  mostrarError: boolean;
  typeAlert: string;
  mensajeError: string;
  deshabilitarBotones: boolean;




  constructor(private service: Services, public functionsUtils: FunctionsUtils, private router: Router,
              private titleService: Title, public dataUtils: DataUtils) {
    this.pagination = new NgbPagination();
    this.pagination.page = 0;
    this.pagination.pageSize = 30;
    this.pagination.maxSize = 6;
    this.listaSucursales = [];
    this.mostrarModalCrud = false;
    this.pedido = null;
    this.mostrarError = false;
    this.typeAlert = '';
    this.mensajeError = '';
    this.deshabilitarBotones = false;

    this.paginationDetail = new NgbPagination();
    this.paginationDetail.page = 0;
    this.paginationDetail.pageSize = 7;
    this.paginationDetail.maxSize = 6;
  }

  async ngOnInit(): Promise<void> {

    const usuario = localStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);

    const urlFields: UrlField[] = [{
      fieldName: 'usuario',
      value: usuarioJson
    }, {
      fieldName: 'correo',
      value: usuarioJson
    }];

    const objRequest= {
      usuario: usuarioJson,
      correo: usuarioJson
    };

    this.sucursalId = new FormControl('', Validators.required);
    this.estado = new FormControl('', Validators.required);
    await this.service.getFromEntityAndMethodPromise("usuarios", "getByUsuarioOrCorreo", objRequest).then(
      res => {
        if (res && res.usuario){
          this.usuario = res.usuario;
          if (this.usuario.principal && this.usuario.principal === 'N'){
            this.sucursalId.setValue( this.usuario.sucursal.id);
            this.estado.setValue('P')
          } else if (this.usuario.principal === 'Y'){
            this.estado.setValue('N');
          }
        }
      }).catch(error => {
      console.error(error);
    });

    await this.service.getAllItemsFromEntityPromise('sucursales').then((res: Sucursales[]) => {
      this.listaSucursales = res;
    }).catch(error => {
      console.error(error);
    });

    this.titleService.setTitle('Holandesa');
    this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);
  }

  changePage(event: any): void {
    this.pagination.page = event;
    this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);
  }

  getValuesByPage(sucursalId: number, estado: string, pageValue: any, sizeValue: any): void{
    this.service.mostrarSpinner = true;
    let sucursal: Sucursales = null;
    if (this.usuario && (!this.usuario.principal || this.usuario.principal === 'N')){
      if (this.sucursalId.value){
        if (this.listaSucursales && this.listaSucursales.length > 0) {
          sucursal = this.listaSucursales.find(x => x.id === Number(this.sucursalId.value));
        }
      } else {
        sucursal = new Sucursales(0, null, null, null);
      }
    }

    this.pagination.page = pageValue + 1;
    const request = new PedidosRequestDTO(new Pedidos(null, estado, null, null, null,
      null,sucursal, null, null, null, null), null, null,  pageValue, sizeValue);

    this.service.getFromEntityByPage('pedidos', request).subscribe( res => {
      this.listResponse = res.content;
      this.pagination.collectionSize = res.totalElements;
      this.service.mostrarSpinner = false;
    }, error1 => {
      this.service.mostrarSpinner = false;
      console.error('Error al consumir Get All');
    });
  }

  cambiarEstado(estado: string) {
    this.estadoSeleccionado = estado;
    this.estado.setValue(estado);
    this.pagination.page = 0;
    this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);
  }

  closeModal() {
    this.nombreAccion = '';
    this.mostrarModalCrud = false;
    this.mostrarModalCambiarEstado = false;
    this.listDetallePedido = [];
    this.pedido = null;
  }

  detallePedido(pedido: Pedidos) {
    this.pedido = pedido;
    this.nombreAccion = 'Detalle de pedido';
    this.mostrarModalCrud = true;

    this.listDetallePedido = pedido.detallePedido;
    this.paginationDetail.collectionSize = this.listDetallePedido.length;
  }

  actualizarEstado(estado: string){
    this.service.mostrarSpinner = true;
    this.deshabilitarBotones = true;
    const pedidoActualizado = new Pedidos(this.pedido.id, estado, this.pedido.nombres, this.pedido.apellidos, this.pedido.telefono, this.pedido.departamento, this.pedido.sucursal, this.pedido.metodoPago, this.pedido.detallePedido, this.pedido.total, this.pedido.fecha);
    this.service.editEntity('pedidos', pedidoActualizado).subscribe( res => {
      this.typeAlert = 'success';
      this.mensajeError = 'Cambio de estado exitoso';
      this.service.mostrarSpinner = false;
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
        this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);
        this.closeModal();
      } , 2000);

    }, error => {
      this.deshabilitarBotones = false;
      this.typeAlert = 'danger';
      this.mensajeError = 'Ha ocurrido un error al actualizar el estado';
      this.mostrarError = true;
      this.service.mostrarSpinner = false;
      setTimeout(() => {
        this.mostrarError = false;
      } , 2000);
      console.error(error);
    });
  }

  mostrarCambioEstado(pedido: Pedidos) {
    this.deshabilitarBotones = false;
    this.pedido = pedido;
    this.mostrarModalCambiarEstado = true;
    this.nombreAccion = 'Cambiar estado de pedido';
  }
}
