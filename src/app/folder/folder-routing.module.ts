import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { TrainningComponent } from '../trainning/trainning.component';
import { TestModelComponent } from '../test-model/test-model.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'trainning',
        component: TrainningComponent
      },
      {
        path: 'test-model',
        component: TestModelComponent
      },
      {
        path: '',
        redirectTo: 'trainning',
        pathMatch: 'full'
      },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainComponentRoutingModule { }
