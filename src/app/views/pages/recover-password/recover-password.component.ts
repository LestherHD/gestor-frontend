import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {
  AlertComponent, ButtonDirective, CardBodyComponent,
  CardComponent, CardGroupComponent,
  ColComponent, ContainerComponent, FormControlDirective, FormDirective,
  FormFeedbackComponent,
  InputGroupComponent, InputGroupTextDirective,
  RowComponent, TextColorDirective
} from '@coreui/angular';
import {Services} from '../../../services/Services';
import {Router} from '@angular/router';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {IconDirective} from '@coreui/icons-angular';
import {CommonModule, NgStyle} from '@angular/common';
import {UsuariosRequestDTO} from '../../../dto/UsuariosRequestDTO';
import {Usuarios} from '../../../bo/Usuarios';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle
    , AlertComponent, CommonModule, ReactiveFormsModule, FormFeedbackComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements OnInit{

  formUsuario: FormGroup<{ usuario: any}>;
  formConfirmarCodigo: FormGroup<{ codigo: any}>;
  formConfirmarCambio: FormGroup<{ contrasenia: any}>;
  isError: boolean;
  isConfirmed: boolean;
  deshabilitarBotones: boolean;
  mensajeError: string;
  typeAlert: string;
  usuario: Usuarios;

  constructor(private service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils){
    this.formUsuario = this.llenarFormUsuario();
    this.formConfirmarCodigo = this.llenarFormConfirmarCodigo();
    this.formConfirmarCambio = this.llenarFormConfirmarCambio();
    this.isError = false;
    this.deshabilitarBotones = false;
    this.mensajeError = '';
    this.typeAlert = '';
  }

  ngOnInit(): void {
  }

  llenarFormUsuario(): FormGroup {

    const form = new FormGroup({
      usuario: new FormControl('', Validators.required)
    });
    return form;
  }

  llenarFormConfirmarCodigo(): FormGroup {
    const form = new FormGroup({
      codigo: new FormControl('', Validators.required)
    });
    return form;
  }

  llenarFormConfirmarCambio(): FormGroup {
    const form = new FormGroup({
      contrasenia: new FormControl('', Validators.required)
    });
    return form;
  }

  campoRequerido(form: FormGroup, name: string): number{

    if (form.controls[name].value.trim() === "" && form.controls[name].touched){
      return 1;
    }

    return 0;
  }

  async validarUsuario(): Promise<any>{

    if (this.functionsUtils.validarControlsRequeridos(this.formUsuario)){
      return;
    }

    this.isError = false;
    // this.spinner = true;

    const usuarioOCorreo = this.formUsuario.controls.usuario.value;

    let userRequest = null;

    userRequest = new UsuariosRequestDTO(usuarioOCorreo, usuarioOCorreo, '', '', null,
      0,0);

    await this.service.getFromEntityAndMethodPromise('usuarios', 'getByUsuarioOrCorreo', userRequest).then((res: any) => {

      this.isError = res.error;
      this.mensajeError = res.respuesta;
      this.typeAlert = res.error && !this.isConfirmed ? 'danger' : 'success';
      // this.spinner = false;
      this.usuario = res.usuario;

    }).catch( error => {
      // this.spinner = false;
      console.error(error);
    });

    if (!this.isError) {

      this.isError = false;
      // this.spinner = true;

      userRequest = new UsuariosRequestDTO(usuarioOCorreo, usuarioOCorreo, '', '',
        null, 0, 0);

      await this.service.getFromEntityAndMethodPromise('usuarios', 'recover-password', userRequest).then((res: any) => {

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
    }

  }

  confirmarCodigo(): void{
    this.isError = false;
    this.isConfirmed = false;
    this.deshabilitarBotones = true;

    if (this.functionsUtils.validarControlsRequeridos(this.formConfirmarCodigo)){
      return;
    }

    const codigo = this.formConfirmarCodigo.controls.codigo.value;

    const userRequest = new UsuariosRequestDTO(this.usuario.usuario, this.usuario.correo, codigo, '', null, 0, 0);

    this.service.getFromEntityAndMethod('usuarios', 'update-user-password', userRequest).subscribe((res: any) => {

      this.isError = res.error;
      this.mensajeError = res.respuesta;
      this.typeAlert = res.error && !res.confirmado ? 'danger' : 'success';

      setTimeout(() => {
        this.isConfirmed = res.confirmado;
        this.isError = false;
        this.deshabilitarBotones = false;
      } , 3000);

    }, error => {
      // this.spinner = false;
      console.error(error);
    });

  }

  cambiarContrasenia(): void{

    this.deshabilitarBotones = true;

    if (this.functionsUtils.validarControlsRequeridos(this.formConfirmarCambio)){
      return;
    }

    const contrasenia = this.formConfirmarCambio.controls.contrasenia.value;

    const userRequest = new UsuariosRequestDTO(this.usuario.usuario, this.usuario.correo, '', contrasenia, null, 0, 0);

    this.service.getFromEntityAndMethod('usuarios', 'update-user-password', userRequest).subscribe((res: any) => {

      this.isError = res.error;
      this.isConfirmed = res.confirmado;
      this.mensajeError = res.respuesta;
      this.typeAlert = res.error && !this.isConfirmed ? 'danger' : 'success';
      // this.spinner = false;

      if (this.isConfirmed) {
        setTimeout(() => {
          this.deshabilitarBotones = false;
          this.functionsUtils.navigateOption(this.router, '/login');
        } , 1600);
      } else {
      }

    }, error => {
      // this.spinner = false;
      console.error(error);
    });

  }

}
