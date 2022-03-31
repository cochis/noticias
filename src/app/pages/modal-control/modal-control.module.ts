import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalControlPageRoutingModule } from './modal-control-routing.module';

import { ModalControlPage } from './modal-control.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    IonicModule,
    ModalControlPageRoutingModule
  ],
  declarations: [ModalControlPage]
})
export class ModalControlPageModule { }
