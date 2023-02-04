import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { ModelData } from 'src/interface';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';

@Component({
  selector: 'app-combine-data-modeling',
  templateUrl: './combine-data-modeling.component.html',
  styleUrls: ['./combine-data-modeling.component.scss'],
})
export class CombineDataModelingComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @Input() public modelPathList: ModelData[] = [];

  @Input() public fieldOfView: number = 20;

  @Input('nearClipping') public nearClippingPane: number = 0.1;

  @Input('farClipping') public farClippingPane: number = 2000;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.createScene();
  }

  ngAfterViewInit() {
    
  }

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private ambientLight!: THREE.AmbientLight;

  private models: Object3D[] = [];

  private directionalLight!: THREE.DirectionalLight;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;

  private childRenderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  /**
   *Animate the model
   *
   * @private
   * @memberof ModelComponent
   */
  private animateModel() {
    this.models.forEach((model: Object3D) => {
      if (model) {
        model.rotation.z += 0.005;
      }
    });
  }

  /**
   *create controls
   *
   * @private
   * @memberof ModelComponent
   */
  private createControls = () => {
    this.childRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.childRenderer.setSize(window.innerWidth, window.innerHeight);
    this.childRenderer.domElement.style.position = 'absolute';
    this.childRenderer.domElement.style.top = '15vh';
    document.body.appendChild(this.childRenderer.domElement);
    this.controls = new OrbitControls(
      this.camera,
      this.childRenderer.domElement
    );
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  };

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);

    const promises: Promise<void | GLTF>[] = [];
    this.modelPathList.forEach((modelData: ModelData) => {
      promises.push(
        new GLTFLoader().loadAsync(modelData.value).then((result: GLTF) => {
          this.models.push(result.scene.children[0]);
        })
      );
    });

    Promise.all(promises).then(() => {
      let x = 0;
      this.models.forEach((model: Object3D) => {
        model.position.set(x, 0, 0);
        x += 0.5;
        const box = new THREE.Box3().setFromObject(model);
        box.getCenter(model.position);
        model.position.multiplyScalar(-1);
        this.scene.add(model);
        let aspectRatio = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
          this.fieldOfView,
          aspectRatio,
          this.nearClippingPane,
          this.farClippingPane
        );
        this.camera.position.x = 10;
        this.camera.position.y = 10;
        this.camera.position.z = 10;
        this.ambientLight = new THREE.AmbientLight(0xffff0, 1);
        this.scene.add(this.ambientLight);
        this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
        this.directionalLight.position.set(0, 1, 0);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
        const light1 = new THREE.PointLight(0x4b371c, 6);
        light1.position.set(0, 20, 40);
        this.scene.add(light1);
        const light2 = new THREE.PointLight(0x4b371c, 6);
        light2.position.set(50, 10, 0);
        this.scene.add(light2);
        const light3 = new THREE.PointLight(0x4b371c, 6);
        light3.position.set(0, 10, -50);
        this.scene.add(light3);
        const light4 = new THREE.PointLight(0x4b371c, 6);
        light4.position.set(-50, 30, 50);
        this.scene.add(light4);
        const light5 = new THREE.PointLight(0x4b371c, 6);
        light5.position.set(-50, -50, -50);
        this.scene.add(light5);
        this.startRenderingLoop();
        this.createControls();  
      });
    });
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   *
   * @private
   * @memberof CubeComponent
   */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: CombineDataModelingComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }
}
