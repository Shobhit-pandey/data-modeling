import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModelingComponent } from './data-modeling/data-modeling.component';

const routes: Routes = [
  {
    path: "",
    component: DataModelingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
