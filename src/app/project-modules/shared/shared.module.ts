import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ProductResetConfirmationComponent } from './components/product-reset-confirmation/product-reset-confirmation.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatRadioModule } from '@angular/material/radio';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';


@NgModule({
  declarations: [ConfirmationDialogComponent, ProductResetConfirmationComponent, ImageUploadComponent ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    NgxSliderModule,
    MatRadioModule,
    DragScrollModule,
    ImageCropperModule,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    ConfirmationDialogComponent,
    ProductResetConfirmationComponent,
    NgxSliderModule,
    MatRadioModule,
    DragScrollModule,
    ImageCropperModule,
  ]
})
export class SharedModule { }
