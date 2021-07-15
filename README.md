## 基于 THREE.js 做的简易封装，使用简单代码就可以实现加载 3D 模型文件到 页面上

### 使用方法
```html
<script defer="defer" src="/loader3d.min.js"></script>
<div id="test1" style="width: 500px; height: 500px;"></div>
<script>
    window.onload = function(){
        window.loader3d = new Loader3d(document.getElementById("test1"));
        // 加载对应的 3D 模型文件：支持 .fbx|obj|3dm|3mf|amf|gcode|ldraw|tds|tilt 后缀格式的文件
        loader3d.addFBX("key", "3dfile.fbx")
        // 可以通过回调控制对象
        loader3d.addFBX("key", "3dfile.fbx", function(obj){
            obj.position.set(100/*x轴*/, 100/*y轴*/, 100/*z轴*/);
        })
    }
</script>

```
[免费3D模型下载](https://free3d.com)