import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ContainerComponent,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective,
  FormDirective, FormFeedbackComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import {Services} from '../../services/Services';
import {UrlField} from '../../bo/UrlField';
import {FunctionsUtils} from '../../utils/FunctionsUtils';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

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
    CommonModule
  ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy{

  showModal: Boolean;
  principal: FormControl;

  constructor(private service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils){
    this.showModal = true;
  }

  async ngOnInit(): Promise<void> {

    this.principal = new FormControl(false, Validators.required);

    const usuario = localStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);

    if (!usuarioJson) {
      this.functionsUtils.navigateOption(this.router, 'login');
    }

    const objRequest: any = {
      usuario: usuarioJson,
      correo: usuarioJson
    };

    const urlFields: UrlField[] = [{
      fieldName: 'usuario',
      value: usuarioJson
    }, {
      fieldName: 'correo',
      value: usuarioJson
    }];

    await this.service.getFromEntityAndMethodPromise("usuarios", "getByUsuarioOrCorreo", objRequest).then(
      res => {
      if (res){
        this.showModal = false;
        if (!res.principal && !res.sucursal) {
          this.showModal = true;
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
    // localStorage.removeItem('usuario');
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

  avanzar() {
    this.showModal = false;
  }

}
