import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  ModalBodyComponent, ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent
} from '@coreui/angular';
import {IconComponent, IconDirective} from '@coreui/icons-angular';

@Component({
  selector: 'app-modal-crud',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent,
    FormDirective, FormFeedbackComponent, FormControlDirective, CommonModule, ButtonDirective, ButtonCloseDirective,
  IconComponent, IconDirective],
  templateUrl: './modal-crud.component.html',
  styleUrl: './modal-crud.component.scss'
})
export class ModalCrudComponent implements OnInit{

  @Input() showModal: boolean;
  @Input() showSubmit: boolean;
  @Input() tittle: string;
  @Input() modalSize: string;
  @Input() disabledSubmit: boolean;
  @Input() disabledOthersButtons: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onSubmit() {
    this.submit.emit();
  }

  onClose() {
    this.close.emit();
  }
}
