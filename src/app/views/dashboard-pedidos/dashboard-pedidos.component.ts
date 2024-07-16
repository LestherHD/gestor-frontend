import {Component} from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Services} from '../../services/Services';
import {FunctionsUtils} from '../../utils/FunctionsUtils';
import {NavigationExtras, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Pedidos} from '../../bo/Pedidos';
import {PedidosRequestDTO} from '../../dto/PedidosRequestDTO';
import {Sucursales} from '../../bo/Sucursales';
import {CustomSpinnerComponent} from '../utils/custom-spinner/custom-spinner.component';
import {
  ButtonDirective,
  ButtonGroupComponent,
  ButtonGroupModule,
  CardBodyComponent,
  CardComponent,
  FormDirective
} from '@coreui/angular';
import {CommonModule} from '@angular/common';
import {Usuarios} from '../../bo/Usuarios';
import {UrlField} from '../../bo/UrlField';
import {DataUtils} from '../../utils/DataUtils';

@Component({
  selector: 'app-dashboard-pedidos',
  standalone: true,
  imports: [CustomSpinnerComponent, CardBodyComponent, CardComponent, NgbPagination, CommonModule, FormDirective, ReactiveFormsModule,
  ButtonGroupComponent, ButtonGroupModule, ButtonDirective],
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


  constructor(private service: Services, public functionsUtils: FunctionsUtils, private router: Router,
              private titleService: Title, public dataUtils: DataUtils) {
    this.pagination = new NgbPagination();
    this.pagination.page = 0;
    this.pagination.pageSize = 30;
    this.pagination.maxSize = 6;
    this.listaSucursales = [];
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
    this.estado = new FormControl('N', Validators.required);
    await this.service.getFromEntityAndMethodPromise("usuarios", "getByUsuarioOrCorreo", objRequest).then(
      res => {
        if (res && res.usuario){
          this.usuario = res.usuario;
          if (this.usuario.principal === 'N'){
            this.sucursalId.setValue( this.usuario.sucursal.id);
          }
        }
      }).catch(error => {
      console.error(error);
    });

    this.titleService.setTitle('Holandesa');
    this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);

    this.service.getAllItemsFromEntity('sucursales').subscribe((res: Sucursales[]) => {
      this.listaSucursales = res;
    }, error => {
      console.error(error);
    });



  }

  changePage(event: any): void {
    this.pagination.page = event;
    this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);
  }

  getValuesByPage(sucursalId: number, estado: string, pageValue: any, sizeValue: any): void{

    let sucursal: Sucursales = null;

    if (this.listaSucursales && this.listaSucursales.length > 0) {
      sucursal = this.listaSucursales.find(x => x.id === Number(this.sucursalId.value));
    } else {

    }

    console.log('sucursal: ', sucursal);

    this.pagination.page = pageValue + 1;
    const request = new PedidosRequestDTO(new Pedidos(null, estado, null, null, null,
      null,sucursal, null, null, null, null), null, null,  pageValue, sizeValue);

    this.service.mostrarSpinner = true;
    this.service.getFromEntityByPage('pedidos', request).subscribe( res => {
      this.listResponse = res.content;
      if (this.listResponse && this.listResponse.length > 0){
      }
      this.pagination.collectionSize = res.totalElements;
      this.service.mostrarSpinner = false;
    }, error1 => {
      this.service.mostrarSpinner = false;
      console.error('Error al consumir Get All');
    });
  }

  viajarADetalle(obj: Pedidos) {
    this.service.mostrarSpinner = true;
    let navigationExtras: NavigationExtras = {
      queryParams: { idPedido: obj.id}
    };
    this.functionsUtils.navigateOptionWithNavigationExtras(this.router, 'product-detail', navigationExtras);
  }

  cambiarEstado(estado: string) {
    this.estadoSeleccionado = estado;
    this.estado.setValue(estado);
    this.pagination.page = 0;
    this.getValuesByPage(Number(this.sucursalId.value.value), this.estado.value, this.pagination.page, this.pagination.pageSize);
  }
}
