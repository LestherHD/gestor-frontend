import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  FormDirective, FormFeedbackComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent
} from '@coreui/angular';
import {IconComponent, IconDirective} from '@coreui/icons-angular';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent,
    FormDirective, FormFeedbackComponent, FormControlDirective, CommonModule, ButtonDirective, ButtonCloseDirective,
    IconComponent, IconDirective],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {

  @Input() showModal: boolean;
  @Input() showSubmit: boolean;
  @Input() tittle: string;
  @Input() disabledSubmit: boolean;
  @Input() disabledOthersButtons: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onSubmit() {
    this.submit.emit();
  }

  onClose() {
    this.close.emit();
  }

}