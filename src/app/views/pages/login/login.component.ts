import {Component, OnInit} from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormFloatingDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import {Services} from '../../../services/Services';
import {Router} from '@angular/router';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {UrlField} from '../../../bo/UrlField';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomSpinnerComponent} from '../../utils/custom-spinner/custom-spinner.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle
      , AlertComponent, CommonModule, ReactiveFormsModule, FormFeedbackComponent, FormFloatingDirective, CustomSpinnerComponent]
})
export class LoginComponent implements OnInit{

  mostrarError: Boolean;
  loginForm: FormGroup<{ usuario: any; contrasenia: any }>;

  constructor(public service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils) {
    this.mostrarError = false;
    localStorage.removeItem('usuario');
  }

  ngOnInit(): void {
    this.service.mostrarSpinner = false;
    this.service.deshabilitarBotones = false;
    const usuario = localStorage.getItem('usuario');
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required)
    });

  }

  login() {

    const usuario = this.loginForm.controls.usuario.value;
    const contrasenia = this.loginForm.controls.contrasenia.value;

    const urlFields: UrlField[] = [{
      fieldName: 'usuarioOCorreo',
      value: usuario
    }, {
      fieldName: 'contrasenia',
      value: this.service.hashMD5(contrasenia)
    }];
    this.service.mostrarSpinner = true;
    this.service.deshabilitarBotones = true;
    this.service.getItemsFromEntityByFields('usuarios', 'login', urlFields).subscribe(res => {
      if (res) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.functionsUtils.navigateOption(this.router, 'dashboard');
        this.service.mostrarSpinner = false;
      } else {
        this.mostrarError = true;
        this.service.mostrarSpinner = false;
        this.service.deshabilitarBotones = false;
      }
    }, error => {
      this.service.deshabilitarBotones = false;
      this.service.mostrarSpinner = false;
      console.error(error);
    });
  }

  registrarse() {
    this.functionsUtils.navigateOption(this.router, 'register');
  }

  recuperarContrasenia() {
    this.functionsUtils.navigateOption(this.router, 'recover-password');
  }

  campoRequerido(form: FormGroup, name: string): number{

    if (form.controls[name].value.trim() === "" && form.controls[name].touched){
      return 1;
    }

    return 0;
  }

}
