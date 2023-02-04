import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelData } from 'src/interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-group-data-modeling',
  templateUrl: './group-data-modeling.component.html',
  styleUrls: ['./group-data-modeling.component.scss'],
})
export class GroupDataModelingComponent implements OnInit {

  @ViewChild(NzCarouselComponent, { static: false })
  dataModelCarousel!: NzCarouselComponent;
  currentDataSelectedIndex = 0;
  listOfModels: ModelData[] = [
    {
      label: 'Bell Pepper',
      value: 'assets/sample-3d-models/bell-pepper.glb',
      fieldOfView: 2,
      nearClipping: 0.1,
      farClipping: 2000,
    },
    {
      label: 'Corn Plant',
      value: 'assets/sample-3d-models/corn-plant.glb',
      fieldOfView: 1,
      nearClipping: 0.1,
      farClipping: 5000,
    },
    {
      label: 'Cucumber',
      value: 'assets/sample-3d-models/cucumber.glb',
      fieldOfView: 0.1,
      nearClipping: 0.1,
      farClipping: 5000,
    },
    {
      label: 'Grapes',
      value: 'assets/sample-3d-models/grapes.glb',
      fieldOfView: 8,
      nearClipping: 1,
      farClipping: 5000,
    },
    {
      label: 'Italian Pepper',
      value: 'assets/sample-3d-models/italian-pepper.glb',
      fieldOfView: 100,
      nearClipping: 0.1,
      farClipping: 2000,
    },
    {
      label: 'Strawberry Plant',
      value: 'assets/sample-3d-models/strawberry-plant.glb',
      fieldOfView: 1,
      nearClipping: 0.1,
      farClipping: 2000,
    },
    {
      label: 'Strawberry',
      value: 'assets/sample-3d-models/strawberry.glb',
      fieldOfView: 5,
      nearClipping: 10,
      farClipping: 5000,
    },
    {
      label: 'Tomato Plant',
      value: 'assets/sample-3d-models/tomato-plant.glb',
      fieldOfView: 100,
      nearClipping: 0.1,
      farClipping: 5000,
    },
    {
      label: 'Tomato',
      value: 'assets/sample-3d-models/tomato.glb',
      fieldOfView: 5,
      nearClipping: 0.1,
      farClipping: 5000,
    },
  ];
  listOfSelectedModels: ModelData[] = [];
  showTutorial = false;

  getTutotialStatus() {
    const tutorial_status = localStorage.getItem('TUTORIAL_VIEWED');
    if (
      (tutorial_status && tutorial_status == 'false') ||
      tutorial_status == null
    ) {
      this.showTutorial = true;
    }
  }

  setTutotialStatus() {
    localStorage.setItem('TUTORIAL_VIEWED', 'true');
    this.showTutorial = false;
  }

  constructor(private modalService: NzModalService) {}
  ngOnInit(): void {
    this.getTutotialStatus();
  }

  showTutorialModal(): void {
    setTimeout(
      () =>
        this.modalService.info({
          nzTitle: 'Data Modeling Tutorial',
          nzContent: 'Scroll for Zoom and Click and Drag for Pan',
          nzOkText: 'Got it',
          nzClosable: false,
          nzCancelText: null,
          nzCentered:true,
          nzOnOk: () => {
            this.setTutotialStatus();
          },
        }),
      2000
    );
  }

  onSelectionChange() {
    if (this.listOfSelectedModels.length == 0 && this.showTutorial) {
      this.showTutorialModal();
    }
  }

  dataIndexChanged(event: any){
    this.currentDataSelectedIndex = event;
  }

  goToNextModel(){
    this.dataModelCarousel.next()
  }
  goToPreviousModel(){
    this.dataModelCarousel.pre()
  }
}
