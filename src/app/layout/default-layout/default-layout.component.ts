import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
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
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit{

  constructor(private service: Services,
              private router: Router,
              public functionsUtils: FunctionsUtils){
  }

  ngOnInit(): void {

    const urlFields: UrlField[] = [{
      fieldName: 'usuario',
      value: "kfajardo"
    }];

    this.service.getItemsFromEntityByFields("usuarios", "getByUsuario", urlFields).subscribe(res => {
      //si no existe o no está en sesión, redireccionar al login
      if (!res){
        this.functionsUtils.navigateOption(this.router, 'login');
      }
    }, error => {
      console.error(error);
    });

  }
  public navItems = navItems;

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }

}
