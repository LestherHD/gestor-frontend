import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgScrollbar} from 'ngx-scrollbar';

import {IconDirective} from '@coreui/icons-angular';
import {
  AlertComponent,
  ButtonCloseDirective,
  ButtonDirective,
  ColComponent,
  ContainerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective, FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormFloatingDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  RowComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import {DefaultFooterComponent, DefaultHeaderComponent} from './';
import {navItems} from './_nav';
import {Services} from '../../services/Services';
import {UrlField} from '../../bo/UrlField';
import {FunctionsUtils} from '../../utils/FunctionsUtils';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Sucursales} from '../../bo/Sucursales';
import {SelectComponent} from '../../views/forms/select/select.component';
import {UsuariosRequestDTO} from '../../dto/UsuariosRequestDTO';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ButtonCloseDirective,
    ButtonDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ReactiveFormsModule,
    CommonModule,
    RowComponent,
    ColComponent,
    SelectComponent,
    FormSelectDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormFeedbackComponent,
    FormDirective, FormFeedbackComponent, FormControlDirective,
    FormFloatingDirective,
    AlertComponent
  ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy{

  showModal: Boolean;
  principal: FormControl;
  sucursal: FormControl;
  deshabilitarBotones: Boolean;

  // 1 = Seleccionar si el usuario es principal o no
  // 2 = Si no es principal seleccionar sucursal
  // 3 = Si es principal mostrar confirmar código
  opcion: string;
  existePrincipal: Boolean;
  lstSucursales: Sucursales[];

  formCodigo: FormGroup<{ codigo: any}>;
  isError: Boolean;
  isConfirmed: Boolean;
  mensajeError: any;
  typeAlert: string;
  objRequest: any;
  private usuario: any;

  constructor(private service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils){
    this.showModal = true;
    this.existePrincipal = false;
    this.deshabilitarBotones = false;

  }

  async ngOnInit(): Promise<void> {

    this.principal = new FormControl(false, Validators.required);
    this.formCodigo = new FormGroup({
      codigo: new FormControl('', Validators.required)
    });
    const usuario = localStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);

    if (!usuarioJson) {
      this.functionsUtils.navigateOption(this.router, 'login');
    }

    this.objRequest= {
      usuario: usuarioJson,
      correo: usuarioJson
    };

    await this.existeUsuarioPrincipal();

    const urlFields: UrlField[] = [{
      fieldName: 'usuario',
      value: usuarioJson
    }, {
      fieldName: 'correo',
      value: usuarioJson
    }];

    await this.service.getFromEntityAndMethodPromise("usuarios", "getByUsuarioOrCorreo", this.objRequest).then(
      res => {
      if (res){
        this.showModal = false;
        if (this.existePrincipal && !res.principal && !res.sucursal) {
          this.showModal = true;
          this.opcion = '2';
        } else if (!this.existePrincipal && !res.principal && !res.sucursal){
          this.showModal = true;
          this.opcion = '1'
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent): void {
    localStorage.removeItem('usuario');
  }

  public navItems = navItems;

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.functionsUtils.navigateOption(this.router, 'login');
  }

  async avanzar() {

    const usuario = localStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);

    this.objRequest= {
      usuario: usuarioJson,
      correo: usuarioJson
    };

    if (this.opcion == '2') {
      this.showModal = false;
    } else if (this.opcion == '3'){
      this.isError = false;
      this.isConfirmed = false;
      this.deshabilitarBotones = true;

      if (this.functionsUtils.validarControlsRequeridos(this.formCodigo)){
        return;
      }

      const codigo = this.formCodigo.controls.codigo.value;

      const userRequest = new UsuariosRequestDTO(this.objRequest.usuario, this.objRequest.correo, codigo, '', 'P',null, 0, 0);

      await this.service.getFromEntityAndMethodPromise('usuarios', 'update-user-password', userRequest).then((res: any) => {

        this.isError = res.error;
        this.mensajeError = res.respuesta;
        this.typeAlert = res.error && !res.confirmado ? 'danger' : 'success';

        setTimeout(() => {
          this.isConfirmed = res.confirmado;
          this.isError = false;
          this.deshabilitarBotones = false;
          if (!this.isError && res.confirmado){
            this.usuario.principal = 'Y';
            console.log('this.usuario', this.usuario);
            this.service.editEntity('usuarios', this.usuario).subscribe( res => {
            }, error => {
              console.error(error);
            });
            this.showModal = false;
          }
        } , 3000);

      }).catch( error => {
        // this.spinner = false;
        console.error(error);
      });
    } else {
      this.opcion = '3';
      if (this.principal.value){

        let userRequest = null;
        userRequest = new UsuariosRequestDTO(this.objRequest.usuario, this.objRequest.correo, '', '',
          '', null, 0, 0);

        await this.service.getFromEntityAndMethodPromise('usuarios', 'principal-user', userRequest).then((res: any) => {

          this.isError = res.error;
          this.isConfirmed = res.confirmado;
          this.mensajeError = res.respuesta;
          this.typeAlert = res.error && !this.isConfirmed ? 'danger' : 'success';

          setTimeout(() => {
            // this.spinner = false;
            this.deshabilitarBotones = false;
            this.usuario = res.usuario;
          } , 1000);

        }).catch( error => {
          // this.spinner = false;
          console.error(error);
        });
      } else {
        this.opcion = '2'
      }
    }
  }

  async existeUsuarioPrincipal(){
    await this.service.getItemsFromEntityByFieldsPromise('usuarios', 'existeUsuarioPrincipal', []).then(res => {
      this.existePrincipal = false;
      if (res) {
        this.existePrincipal = true;
      }
    }).catch(error => {
      console.error(error);
    });
  }

  campoRequerido(form: FormGroup, name: string): number{

    if (form.controls[name].value.trim() === "" && form.controls[name].touched){
      return 1;
    }

    return 0;
  }

}
