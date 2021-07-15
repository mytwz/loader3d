/*
 * @Author: Summer
 * @LastEditors: Summer
 * @Description: 基于 THREE.js 做的简易封装，使用简单代码就可以实现加载 3D 模型文件到 页面上
 * @Date: 2021-07-15 09:20:52 +0800
 * @LastEditTime: 2021-07-15 12:29:22 +0800
 * @FilePath: /loader3d/src/index.ts
 */
import * as THREE from 'three';
//控制模型位置、缩放、旋转的控制器。
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
//轨道控制器。
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//陀螺仪相机控制器，实现移动端陀螺仪控制相机。
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader'
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader'
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader'
import { LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader'
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader'
import { TiltLoader } from 'three/examples/jsm/loaders/TiltLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export type LoadFile = THREE.Object3D | THREE.Group

export type Add3DFileCallBack = (obj:LoadFile) => void;

export default class Loader3d {
    /**Three 空间 */
    public readonly THREE = THREE;
    /**场景 */
    public readonly scene:THREE.Scene = new THREE.Scene();  
    /**摄像机 */
    public readonly camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, this.div.clientWidth / this.div.clientHeight, 1, 2000);
    /**渲染器 */
    public readonly renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    /**轨道控制器。 */
    public readonly orbitControls:OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    /**轨道控制器。 */
    public readonly transformControls:TransformControls = new TransformControls(this.camera, this.renderer.domElement);
    // /**陀螺仪相机控制器，实现移动端陀螺仪控制相机。 */
    // public readonly deviceOrientationControls:DeviceOrientationControls = new DeviceOrientationControls(this.camera);
    /**加载的文件对象集合 */
    public readonly Objs: Map<string, LoadFile> = new Map();

    constructor(private readonly div: HTMLDivElement){

        let directionalLight = new THREE.DirectionalLight(0xffffff, 1); //模拟远处类似太阳的光源
        directionalLight.position.set(0, 100, 0).normalize();
        this.scene.add(directionalLight);
        
        let ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
        ambient.position.set(0, 0, 0);
        this.scene.add(ambient);

        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.div.clientWidth, this.div.clientHeight);
        this.div.appendChild(this.renderer.domElement);
        
        this.camera.position.set( 100,200,300 );
        this.camera.lookAt(this.scene.position);

        this.render();
        window.addEventListener("resize", this.render.bind(this));
    }
    
    public async addObj(name:string, mtlurl:string, objurl:string, cb:Add3DFileCallBack = _ => 0){
        let mtl:MTLLoader.MaterialCreator = await new MTLLoader().loadAsync(mtlurl);
        let obj:THREE.Group = await new OBJLoader().setMaterials(mtl).loadAsync(objurl);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async add3DM(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Object3D = await new Rhino3dmLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async add3MF(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new ThreeMFLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addAMF(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new AMFLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addGCode(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new GCodeLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addLDraw(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new LDrawLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addTDS(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new TDSLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addTilt(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new TiltLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addFBX(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:THREE.Group = await new FBXLoader().loadAsync(url);
        cb(obj);
        this.scene.add(obj);
        this.Objs.set(name, obj);
    }
    
    public async addGLTF(name:string, url:string, cb:Add3DFileCallBack = _ => 0){
        let obj:GLTF = await new GLTFLoader().loadAsync(url);
        cb(obj.scene);
        this.scene.add(obj.scene);
        this.Objs.set(name, obj.scene);
    }

    public render(){
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.orbitControls.update( );
    }
}
