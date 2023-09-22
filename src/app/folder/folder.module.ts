import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainComponentRoutingModule } from './folder-routing.module';

import { MainComponent } from './main.component';
import { TestModelComponent } from '../test-model/test-model.component';
import { TrainningComponent } from '../trainning/trainning.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainComponentRoutingModule
  ],
  declarations: [MainComponent,
    TestModelComponent,
    TrainningComponent

  ]
})
export class MainComponentModule { }
