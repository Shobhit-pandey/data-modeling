import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-data-modeling',
  templateUrl: './data-modeling.component.html',
  styleUrls: ['./data-modeling.component.scss'],
})
export class DataModelingComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @Input() public modelPath!: string;

  @Input() public stylePosition: 'absolute' | 'unset' = 'absolute';

  //* Stage Properties
  @Input() public fieldOfView: number = 20;

  @Input('nearClipping') public nearClippingPane: number = 0.1;

  @Input('farClipping') public farClippingPane: number = 2000;

  fileName: string = '';

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private ambientLight!: THREE.AmbientLight;

  private model: any;

  private directionalLight!: THREE.DirectionalLight;

  //? Helper Properties (Private Properties);

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
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
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
    this.childRenderer.domElement.style.position = this.stylePosition;
    this.childRenderer.domElement.style.top = '15vh';
    document.body.appendChild(this.childRenderer.domElement);
    this.controls = new OrbitControls(this.camera, this.childRenderer.domElement);
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
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);
    this.loaderGLTF.load(this.modelPath, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.ambientLight = new THREE.AmbientLight(0xffff1, 1);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    const light1 = new THREE.PointLight(0x4b371c, 6);
    light1.position.set(0, 200, 400);
    this.scene.add(light1);
    const light2 = new THREE.PointLight(0x4b371c, 6);
    light2.position.set(500, 100, 0);
    this.scene.add(light2);
    const light3 = new THREE.PointLight(0x4b371c, 6);
    light3.position.set(0, 100, -500);
    this.scene.add(light3);
    const light4 = new THREE.PointLight(0x4b371c, 6);
    light4.position.set(-500, 300, 500);
    this.scene.add(light4);
    const light5 = new THREE.PointLight(0x4b371c, 6);
    light5.position.set(-500, -500, -500);
    this.scene.add(light5);
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
    let component: DataModelingComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    const fileNameSplit = this.modelPath.split('/');
    this.fileName = fileNameSplit[fileNameSplit.length - 1];
    if(this.controls){
      this.childRenderer.domElement.style.position = this.stylePosition;
    }
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
}
