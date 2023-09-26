import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './folder/main.component';
import { TrainningComponent } from './trainning/trainning.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'trainning', component: TrainningComponent },

      { path: '**', redirectTo: 'trainning' }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
