import {Component, OnInit} from '@angular/core';
import {IconDirective} from '@coreui/icons-angular';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormCheckComponent,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Services} from '../../../services/Services';
import {CommonModule} from '@angular/common';
import {Usuarios} from '../../../bo/Usuarios';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {Router} from '@angular/router';
import {UsuariosRequestDTO} from '../../../dto/UsuariosRequestDTO';

function onlyNumbersAndSpaces(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!/^[0-9\s]+$/.test(value)) {
    return { onlyNumbersAndSpaces: true };
  }

  return null;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
      AlertComponent, CommonModule, ReactiveFormsModule, FormCheckComponent, FormFeedbackComponent]
})
export class RegisterComponent implements OnInit{

  mostrarError: Boolean;
  mensaje: String;
  contraseniasNoIguales: Boolean;
  errorUniques: Boolean;
  timer: any;
  existeUsuario: Boolean;
  form: FormGroup<{
    nombres: any; apellidos: any; telefono: any; correo: any;
    usuario: any; contrasenia: any; confirmarContrasenia: any}>;


  constructor(private service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils) {
    this.mostrarError = false;
    this.mensaje = "";

  }

  async ngOnInit(): Promise<void>{

    this.form = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.required, onlyNumbersAndSpaces, Validators.minLength(8)]),
      correo: new FormControl('', [Validators.email, Validators.required]),
      usuario: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      confirmarContrasenia: new FormControl('', Validators.required)
    });

    this.contraseniasNoIguales = false;
    this.errorUniques = false;

  }

  validarRepetirContrasenia(event: KeyboardEvent){

    const contrasenia = this.form.controls.contrasenia.value;
    const confirmarContrasenia = this.form.controls.confirmarContrasenia.value;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (contrasenia && confirmarContrasenia) {
        if (contrasenia != confirmarContrasenia){
          this.mensaje = "Las contraseñas no coinciden";
          this.mostrarError = true;
          this.contraseniasNoIguales = true;
        } else {
          this.mensaje = "";
          this.mostrarError = false;
          this.contraseniasNoIguales = false;
        }
      } else {
        this.mostrarError = false;
        this.mensaje = "";
        this.contraseniasNoIguales = false;
      }

    }, 0);
  }

  llenarObjeto(form: any): any{

    const id = null;
    const usuario = this.form.controls.usuario.value.toString().trim().toLowerCase();
    const password = this.form.controls.contrasenia.value.toString().trim();
    const nombres = this.form.controls.nombres.value.toString().trim();
    const apellidos = this.form.controls.apellidos.value.toString().trim();
    const telefono = this.form.controls.telefono.value.toString().trim();
    const correo = this.form.controls.correo.value.toString().trim().toLowerCase();

    return new Usuarios(Number(id), usuario, password, nombres, apellidos, correo, telefono, null,
      '', 'N');
  }

  async existeUsuarioPrincipal(){
    await this.service.getItemsFromEntityByFieldsPromise('usuarios', 'existeUsuarioPrincipal', []).then(res => {
      this.existeUsuario = false;
      if (res) {
        this.existeUsuario = true;
      }
    }).catch(error => {
      console.error(error);
    });
  }

  campoRequerido(form: FormGroup, name: string): number{

    if (form.controls[name].value.trim() === "" && form.controls[name].touched){
      return 1;
    }
    if (form.controls[name]?.touched && form.controls[name]?.hasError('email')){
      return 2;
    }
    if (form.controls[name].touched) {
      if((!/^[0-9\s]+$/.test(form.controls[name].value.trim())) || form.controls[name].value.length < 8){
        return 3;
      }
    }
    return 0;
  }

  async registrarse() {

    const usuario: Usuarios = this.llenarObjeto(this.form);
    const usuariosRequest = new UsuariosRequestDTO('','','','',usuario, 0, 0);
    this.errorUniques = false;
    this.mostrarError = false;
    this.mensaje = '';
    await this.service.getFromEntityAndMethodStringPromise('usuarios', 'getValidadorUniques', usuariosRequest).then( res => {
      if (res) {
        this.mostrarError = true;
        this.mensaje = res;
        this.errorUniques = true;
      }
    }).catch( error =>{
      console.error(error)
    })

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.errorUniques = false;
    }, 1000);


    if (!this.mostrarError){
      this.service.saveEntity('usuarios', usuario).subscribe(res => {
        if (res) {
          this.functionsUtils.navigateOption(this.router, 'login');
        } else {
          this.mostrarError = true;
        }
      }, error => {
        console.error(error);
      });
    }

  }

}
