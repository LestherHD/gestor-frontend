import {Component} from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent, FormSelectDirective,
  PaginationComponent,
  PaginationModule,
  RowComponent,
  TableDirective
} from '@coreui/angular';
import {CommonModule} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {FormsModule} from '@angular/forms';
import {SelectComponent} from '../../forms/select/select.component';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CardHeaderComponent, CardBodyComponent, ContainerComponent,
    CardComponent, RowComponent, ColComponent, TableDirective, PaginationComponent,
    PaginationModule, CommonModule, ButtonDirective, IconDirective, FormsModule, SelectComponent,
    FormSelectDirective],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.scss'
})
export class SucursalesComponent {

  currentPage = 1;
  pageSize = 10;
  totalPages = 10; // Por ejemplo, 10 páginas en total

  pages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Páginas disponibles



  goToPage(event: any) {
    const selectedValue = event.target.value;
    this.currentPage = selectedValue;
  }

  changePageSize(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue;
  }
}
