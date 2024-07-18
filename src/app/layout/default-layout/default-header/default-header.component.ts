import {Component, Input} from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent, ButtonDirective,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective, ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';
import {CommonModule, NgStyle, NgTemplateOutlet} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {IconDirective} from '@coreui/icons-angular';
import {FunctionsUtils} from '../../../utils/FunctionsUtils';
import {Services} from '../../../services/Services';
import {DataUtils} from '../../../utils/DataUtils';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  standalone: true,
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent,
    NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent,
    ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent,
    DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective,
    ProgressBarDirective, ProgressComponent, NgStyle, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
    ModalBodyComponent, ButtonDirective,
    FormDirective, FormFeedbackComponent, FormControlDirective, CommonModule]
})
export class DefaultHeaderComponent extends HeaderComponent {


  constructor(private router: Router,
              public functionsUtils: FunctionsUtils,
              private services: Services, public dataUtils: DataUtils) {
    super();

  }

  informacionUsuario(){
    this.services.clicInformacionUsuario();
  }

  @Input() sidebarId: string = 'sidebar1';

  logout() {
    localStorage.removeItem('usuario');
    this.functionsUtils.navigateOption(this.router, 'login');
  }
}
