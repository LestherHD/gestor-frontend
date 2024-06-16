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
import {DataUtils} from '../../utils/DataUtils';
import {UsuariosResponseDTO} from '../../dto/UsuariosResponseDTO';
import {CustomSpinnerComponent} from '../../views/utils/custom-spinner/custom-spinner.component';

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
    AlertComponent,
    CustomSpinnerComponent
  ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy{

  showModal: Boolean;
  showModalUsuario: Boolean;
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
  usuario: any;
  listaSucursales: Sucursales[];
  infoUsuario: UsuariosResponseDTO;

  formUsuario: FormGroup<{ nombres: any, usuario: any,
    correo: any, telefono: any, principal: any, sucursal: any}>;

  constructor(public service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils,
              public dataUtils: DataUtils){
    this.showModal = false;
    this.showModalUsuario = false;
    this.existePrincipal = false;
    this.deshabilitarBotones = false;

  }

  async ngOnInit(): Promise<void> {

    this.service.mostrarSpinner = false;
    this.service.deshabilitarBotones = false;
    const usuario = localStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);

    const urlFields: UrlField[] = [{
      fieldName: 'usuario',
      value: usuarioJson
    }, {
      fieldName: 'correo',
      value: usuarioJson
    }];

    this.objRequest= {
      usuario: usuarioJson,
      correo: usuarioJson
    };

    this.service.eventEmitter.subscribe(() => {
        this.service.getFromEntityAndMethod('usuarios', 'getByInfoUsuarioOrCorreo', this.objRequest).subscribe((res: UsuariosResponseDTO) => {
          this.infoUsuario = res;

          if (this.infoUsuario) {

            console.log('usuario: ', this.infoUsuario);
            this.formUsuario = new FormGroup({
              nombres: new FormControl({value: this.infoUsuario.nombreCompleto, disabled: true}, Validators.required),
              usuario: new FormControl({value: this.infoUsuario.nombreUsuario, disabled: true}, Validators.required),
              correo: new FormControl({value: this.infoUsuario.correo, disabled: true}, Validators.required),
              telefono: new FormControl({value: this.infoUsuario.telefono, disabled: true}, Validators.required),
              principal: new FormControl({value: this.infoUsuario.principal, disabled: true}, Validators.required),
              sucursal: new FormControl({value: this.infoUsuario.nombreSucursal, disabled: true}, Validators.required)
              // nombres: any, apellidos: any, usuario: any,
              // correo: any, telefono: any, principal: any, sucursal: any
            });

            this.showModalUsuario = true;

          }
        }, error => {
          console.error(error);
        });
    });

    this.principal = new FormControl(false, Validators.required);
    this.sucursal = new FormControl('', Validators.required);

    this.formCodigo = new FormGroup({
      codigo: new FormControl('', Validators.required)
    });

    this.cargarListas();


    if (!usuarioJson) {
      this.functionsUtils.navigateOption(this.router, 'login');
    }

    await this.existeUsuarioPrincipal();

    await this.service.getFromEntityAndMethodPromise("usuarios", "getByUsuarioOrCorreo", this.objRequest).then(
      res => {
      if (res && res.usuario){
        this.usuario = res.usuario;
        this.showModal = false;
        if (this.existePrincipal && !res.usuario.principal && !res.usuario.sucursal) {
          this.showModal = true;
          this.opcion = '2';
        } else if (!this.existePrincipal && !res.usuario.principal && !res.usuario.sucursal){
          this.showModal = true;
          this.opcion = '1'
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.service.eventEmitter.subscribe().unsubscribe();
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
    this.service.mostrarSpinner = true;
    localStorage.removeItem('usuario');
    this.functionsUtils.navigateOption(this.router, 'login');
  }

  //Función reutilizable para el botón avanzar de pantalla mostrada cuando:
  //El usuario logueado no es ni asignado a sucursal ni asignado como principal
  //y/o no existe usuario principal en la aplicación web
  async avanzar() {

    const usuario = localStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);

    this.objRequest= {
      usuario: usuarioJson,
      correo: usuarioJson
    };
    //Condición para aceptar pantalla de selección de sucursal
    if (this.opcion == '2') {
      if (this.sucursal && this.sucursal.value){
        this.usuario.principal = 'N';
        this.usuario.sucursal = this.listaSucursales.find(x => x.id === Number(this.sucursal.value));
        this.service.editEntity('usuarios', this.usuario).subscribe( res => {
        }, error => {
          console.error(error);
        });
        this.showModal = false;
      }
    }
    //Condición para confirmar código enviado a correo para aceptar que el usuario sea principal(usuario que parametrizará
    //todos los productos y sus característias)
    else if (this.opcion == '3'){
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
    }
    //Condión para cuando de entrada no existe un usuario principal, o existe usuario principal pero
    //el usuario logueado no es ni principal y tampoco tiene asignado una sucursal
    else {
      this.opcion = '3';
      if (this.principal.value){

        let userRequest = null;
        userRequest = new UsuariosRequestDTO(this.objRequest.usuario, this.objRequest.correo, '', '',
          '', null, 0, 0);
        //Si en la pantalla principal se seleciona que el usuario va a ser principal entonces generará el código de
        //confirmación para asignación de usuario principal
        await this.service.getFromEntityAndMethodPromise('usuarios', 'principal-user', userRequest).then((res: any) => {

          this.isError = res.error;
          this.isConfirmed = res.confirmado;
          this.mensajeError = res.respuesta;
          this.typeAlert = res.error && !this.isConfirmed ? 'danger' : 'success';

          setTimeout(() => {
            // this.spinner = false;
            this.deshabilitarBotones = false;
            console.log('entra a presionar');
          } , 1000);

        }).catch( error => {
          // this.spinner = false;
          console.error(error);
        });
      } else {
        this.opcion = '2';
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

  cargarListas(){

    this.service.getAllItemsFromEntity('sucursales').subscribe((res: Sucursales[]) =>{
      this.listaSucursales = res;
      this.sucursal.setValue(this.listaSucursales[0].id);
    }, error => {
      console.error(error);
    });

  }

}
