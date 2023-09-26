import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { MainComponent } from './main.component';
import { TrainningComponent } from '../trainning/trainning.component';


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
