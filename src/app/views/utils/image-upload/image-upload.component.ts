import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent
} from '@coreui/angular';
import {IconComponent, IconDirective} from '@coreui/icons-angular';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent,
    FormDirective, FormFeedbackComponent, FormControlDirective, CommonModule, ButtonDirective, ButtonCloseDirective,
    IconComponent, IconDirective, ReactiveFormsModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent implements OnInit{

  @Input() minWidth: number;
  @Input() minHeight: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
  @Input() modo: number;
  @Input() imageSrc: string;
  @Output() fileChange = new EventEmitter<string>();

  imageForm: FormGroup<{ image: any;}>;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.imagePreview = null;
    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      image: new FormControl({value: '', disabled: true})
    });
    if (this.imageSrc && this.imageSrc.trim() !== ''){
      const blob  = this.base64ToBlob(this.imageSrc);
      this.imagePreview = this.blobToUrl(blob);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tipo de archivo
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        this.errorMessage = 'Solo se permiten imágenes JPG y PNG.';
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const img = new Image();
          img.src = result;

          img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Validar tamaño de la imagen
            if (width < this.minWidth || height < this.minHeight || width > this.maxWidth || height > this.maxHeight) {
              this.errorMessage = 'La imagen debe tener entre '+this.minHeight+'x'+this.minWidth+' y '+this.maxHeight+'x'+this.maxWidth+' píxeles.';
              this.fileChange.emit('');
              this.imagePreview = null;
            } else {
              this.errorMessage = null;
              // Convertir a Base64
              const base64String = result.split(',')[1];
              this.fileChange.emit(base64String);
              this.imagePreview = reader.result;
            }

          };
        } else {
          this.errorMessage = 'Error al leer el archivo';
        }
      };

      reader.readAsDataURL(file);
    }

  }

  base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteArray], { type: 'image/jpeg' }); // Cambia 'image/jpeg' por el tipo correcto si es necesario
  }

  // Crear una URL a partir del Blob
  blobToUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

}


