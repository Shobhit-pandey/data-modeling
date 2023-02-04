import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupDataModelingComponent } from './group-data-modeling/group-data-modeling.component';

const routes: Routes = [
  {
    path: '',
    component: GroupDataModelingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
