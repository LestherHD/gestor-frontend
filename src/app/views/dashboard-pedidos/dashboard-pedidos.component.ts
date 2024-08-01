import {Component} from '@angular/core';
import {NgbModule, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
  CardHeaderComponent,
  ColComponent,
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
import {NgxPaginationModule} from 'ngx-pagination';
import {IconModule} from '@coreui/icons-angular';
import {CalendarModule} from 'primeng/calendar';
import {PrimeNGConfig} from 'primeng/api';
import {ChartjsComponent} from '@coreui/angular-chartjs';
import {ChartData} from 'chart.js';
import {da} from 'date-fns/locale';

@Component({
  selector: 'app-dashboard-pedidos',
  standalone: true,
  imports: [CustomSpinnerComponent, CardBodyComponent, CardComponent, NgbPagination, CommonModule, FormDirective, ReactiveFormsModule,
  ButtonGroupComponent, ButtonGroupModule, ButtonDirective, ModalCrudComponent, FormControlDirective, TableDirective, NgxPaginationModule, IconModule, AlertComponent,
    NgbModule, FormsModule, CalendarModule, ColComponent, CardHeaderComponent, ChartjsComponent],
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

  startDatePedidos: Date;
  endDatePedidos: Date;
  startDatePedidosBK: Date;
  endDatePedidosBK: Date;
  es: any;

  mostrarErrorFiltroPedidos: boolean;
  mensajeErrorFiltroPedidos: string;


  chartDoughnutData: ChartData = {
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: []
      }
    ]
  };
  startDateSucursales: Date;
  endDateSucursales: Date;
  startDateSucursalesBK: Date;
  endDateSucursalesBK: Date;
  mostrarErrorFiltroSucursales: boolean;
  mensajeErrorFiltroSucursales: string;
  totalVendidoSucursales: string;

  fixedColors: string[] = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8333',
    '#33FF83', '#8333FF', '#FF3381', '#81FF33', '#3381FF',
    '#FF3333', '#33FF33', '#3333FF', '#FF33FF', '#33FFFF',
    '#FFFF33', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
    '#33FF66', '#66FF66', '#6666FF', '#FF66FF', '#66FFFF',
    '#FFFF66', '#FF9933', '#99FF33', '#3399FF', '#FF3399',
    '#99FF99', '#9933FF', '#FF9933', '#33FF99', '#9933FF',
    '#FF3399', '#99FF33', '#3399FF', '#FF6699', '#9966FF',
    '#669933', '#996633', '#669999', '#999933', '#336666',
    '#FF9999', '#66FF99', '#9999FF', '#FF99FF', '#66FFFF'
  ];

  options = {
    maintainAspectRatio: false
  };

  constructor(private service: Services, public functionsUtils: FunctionsUtils, private router: Router,
              private titleService: Title, public dataUtils: DataUtils, private config: PrimeNGConfig) {
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
    this.mostrarErrorFiltroPedidos = false;
    this.mensajeErrorFiltroPedidos = '';
    this.totalVendidoSucursales = '';

    this.paginationDetail = new NgbPagination();
    this.paginationDetail.page = 0;
    this.paginationDetail.pageSize = 7;
    this.paginationDetail.maxSize = 6;
  }

  async ngOnInit(): Promise<void> {

    this.startDatePedidos = new Date();
    this.startDatePedidos.setHours(0,0,0,0);
    this.endDatePedidos = new Date();
    this.endDatePedidos.setHours(0,0,0,0);
    this.startDatePedidosBK = this.startDatePedidos;
    this.endDatePedidosBK = this.endDatePedidos;

    this.startDateSucursales = new Date();
    this.startDateSucursales.setHours(0,0,0,0);
    this.endDateSucursales = new Date();
    this.endDateSucursales.setHours(0,0,0,0);
    this.startDateSucursalesBK = this.startDateSucursales;
    this.endDateSucursalesBK = this.endDateSucursales;

    this.config.setTranslation({
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Borrar'
    });


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
    this.getValuesByPage(Number(this.sucursalId.value), this.estado.value, this.startDatePedidosBK, this.endDatePedidosBK, this.pagination.page, this.pagination.pageSize);

    this.filtrarVentasSucursales();
  }

  changePage(event: any): void {
    this.pagination.page = event;
    this.getValuesByPage(Number(this.sucursalId.value), this.estado.value, this.startDatePedidosBK, this.endDatePedidosBK, this.pagination.page, this.pagination.pageSize);
  }

  getValuesByPage(sucursalId: number, estado: string, startDatePedidos: Date, endDatePedidos: Date, pageValue: any, sizeValue: any): void{

    const startDatePedidosStr = startDatePedidos.toISOString();
    const endDatePedidosStr = endDatePedidos.toISOString();

    // new Date().toISOString().split('T')[0]

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
      null,sucursal, null, null, null, null), startDatePedidosStr, endDatePedidosStr, null,pageValue, sizeValue);

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
    this.getValuesByPage(Number(this.sucursalId.value), this.estado.value, this.startDatePedidosBK, this.endDatePedidosBK, this.pagination.page, this.pagination.pageSize);
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
    const pedidoActualizado = new Pedidos(this.pedido.id, estado, this.pedido.nombres, this.pedido.apellidos, this.pedido.telefono,
      this.pedido.departamento, this.pedido.sucursal, this.pedido.metodoPago, this.pedido.detallePedido, this.pedido.total, this.pedido.fecha);
    this.service.editEntity('pedidos', pedidoActualizado).subscribe( res => {
      this.typeAlert = 'success';
      this.mensajeError = 'Cambio de estado exitoso';
      this.service.mostrarSpinner = false;
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
        this.getValuesByPage(Number(this.sucursalId.value), this.estado.value, this.startDatePedidosBK, this.endDatePedidosBK, this.pagination.page, this.pagination.pageSize);
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

  filtrarPedidos() {

    const fechaActual = new Date();
    fechaActual.setHours(0,0,0,0);

    const oneYearBeforeStartDate = new Date(fechaActual.getTime());
    oneYearBeforeStartDate.setFullYear(fechaActual.getFullYear() - 1);
    this.mostrarErrorFiltroPedidos = false;
    if (this.startDatePedidos > this.endDatePedidos) {
      this.mostrarErrorFiltroPedidos = true;
      this.mensajeErrorFiltroPedidos = 'Error, la fecha inicio no puede ser mayor a la fecha fin';
      return;
    } else if (this.startDatePedidos > fechaActual || this.endDatePedidos > fechaActual){
      this.mostrarErrorFiltroPedidos = true;
      this.mensajeErrorFiltroPedidos = 'Error, la fecha inicio y la fecha fin no pueden ser mayor a la fecha actual';
      return;
    } else if (this.startDatePedidos < oneYearBeforeStartDate){
      this.mostrarErrorFiltroPedidos = true;
      this.mensajeErrorFiltroPedidos = 'Rango de fecha inválido, no se puede filtrar más de un año de distancia entre ambas fechas';
      return;
    }

    this.startDatePedidosBK = this.startDatePedidos;
    this.endDatePedidosBK = this.endDatePedidos;
    this.pagination.page = 0;
    this.getValuesByPage(this.sucursalId.value, this.estado.value, this.startDatePedidosBK, this.endDatePedidosBK, this.pagination.page, this.pagination.pageSize)
  }

  async filtrarVentasSucursales(){

    const fechaActual = new Date();
    fechaActual.setHours(0,0,0,0);

    const oneYearBeforeStartDate = new Date(fechaActual.getTime());
    oneYearBeforeStartDate.setFullYear(fechaActual.getFullYear() - 1);
    this.mostrarErrorFiltroPedidos = false;
    if (this.startDatePedidos > this.endDatePedidos) {
      this.mostrarErrorFiltroPedidos = true;
      this.mensajeErrorFiltroPedidos = 'Error, la fecha inicio no puede ser mayor a la fecha fin';
      return;
    } else if (this.startDatePedidos > fechaActual || this.endDatePedidos > fechaActual){
      this.mostrarErrorFiltroPedidos = true;
      this.mensajeErrorFiltroPedidos = 'Error, la fecha inicio y la fecha fin no pueden ser mayor a la fecha actual';
      return;
    } else if (this.startDatePedidos < oneYearBeforeStartDate){
      this.mostrarErrorFiltroPedidos = true;
      this.mensajeErrorFiltroPedidos = 'Rango de fecha inválido, no se puede filtrar más de un año de distancia entre ambas fechas';
      return;
    }

    this.service.mostrarSpinner = true;

    this.startDateSucursalesBK = this.startDateSucursales;
    this.endDateSucursalesBK = this.endDateSucursales;


    const startDatePedidosStr = this.startDateSucursalesBK.toISOString();
    const endDatePedidosStr = this.endDateSucursalesBK.toISOString();

    const request = new PedidosRequestDTO(null, startDatePedidosStr, endDatePedidosStr, this.sucursalId.value ? this.sucursalId.value : null, null, null);

    let labels: string[] = [];
    this.chartDoughnutData.labels = labels;
    let data: number[] = [];
    let tamanio: number = 0;

    await this.service.getFromEntityAndMethodPromise('pedidos', 'getInfoBranchSales', request).then( res => {
      this.service.mostrarSpinner = false;
      tamanio = res.length;
      let total = 0;
      res.forEach(x => {
        labels.push(x.nombreSucursal);
        data.push(x.total);
        total += x.total;
      });
      this.totalVendidoSucursales = this.functionsUtils.formatPrice(total);
    }).catch(error => {
      this.service.mostrarSpinner = false;
      console.error(error);
    });

    const backgroundColors = this.fixedColors.slice(0, tamanio);

    this.chartDoughnutData.labels = labels;
    this.chartDoughnutData.datasets[0].data = data;
    this.chartDoughnutData.datasets[0].backgroundColor = backgroundColors;

    console.log(this.chartDoughnutData);

  }

}
