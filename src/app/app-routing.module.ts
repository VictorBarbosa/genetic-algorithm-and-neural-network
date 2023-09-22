import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './folder/main.component';
import { TrainningComponent } from './trainning/trainning.component';
import { TestModelComponent } from './test-model/test-model.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'trainning', component: TrainningComponent },
      { path: 'test-model', component: TestModelComponent },
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
