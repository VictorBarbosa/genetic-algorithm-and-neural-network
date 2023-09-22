import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

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
        pathMatch: 'full',
        redirectTo: 'trainning'
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule],
})
export class MainComponentRoutingModule { }
