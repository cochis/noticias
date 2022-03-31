import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalControlPage } from './modal-control.page';

const routes: Routes = [
  {
    path: '',
    component: ModalControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalControlPageRoutingModule {}
