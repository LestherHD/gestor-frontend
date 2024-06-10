import { Component } from '@angular/core';
import {SpinnerComponent} from '@coreui/angular';
import {Services} from '../../../services/Services';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-custom-spinner',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './custom-spinner.component.html',
  styleUrl: './custom-spinner.component.scss'
})
export class CustomSpinnerComponent {


  constructor(public services: Services) {
  }


}
