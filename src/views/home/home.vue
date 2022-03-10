<template>
  <div>
    <span>{{time}}</span>

    <el-upload
      action="/api/gin_upload"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeoutUpload"
      multiple
      ref="modelUpload"
      id="modelUpload"
    >
      <div class="popover_item" @mousedown="getElement">
        <span>模型导入</span>
        <span>Ctrl + I</span>
      </div>
    </el-upload>

    <br />

    <!-- <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->

    <div @click="saveFile" >另存为</div>


  </div>
</template>

<script >
  export default {
    name: 'Home'
  }
</script>
<script setup >
  import { ref, getCurrentInstance, computed, inject, onDeactivated, nextTick  } from 'vue'
  import { ElMessage } from 'element-plus'
  // const { $dayjs } = getCurrentInstance().appContext.config.globalProperties
  // const time = ref($dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'))

  import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
} from 'browser-fs-access'
import { saveAs, FileSaver } from 'file-saver';

const saveFile = async() => {
  let data = {"camera":{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"object":{"uuid":"090E77AE-1FE7-47F5-A009-12AB8C8D6D98","type":"PerspectiveCamera","name":"Camera","layers":1,"matrix":[1,0,0,0,0,0.9284766908852593,-0.37139067635410383,0,0,0.37139067635410383,0.9284766908852593,0,0,10.000000000000002,25,1],"fov":50,"zoom":1,"near":1,"far":1000,"focus":10,"aspect":2.3645320197044337,"filmGauge":35,"filmOffset":0}},"scene":{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"geometries":[{"uuid":"88E395B8-576D-4139-B61A-10FADE8FD52C","type":"BoxGeometry","width":1,"height":1,"depth":1,"widthSegments":1,"heightSegments":1,"depthSegments":1}],"materials":[{"uuid":"CD523BB0-185E-4490-9C45-BFAECCAC7D58","type":"MeshBasicMaterial","name":"正方体","color":65280,"reflectivity":1,"refractionRatio":0.98,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"object":{"uuid":"1F108E3C-1DF7-4F2A-A2F7-3BC7ABEC03BB","type":"Scene","name":"Scene","layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"children":[{"uuid":"B8337FF6-7F0E-4159-B32F-EA564B06072A","type":"Group","userData":{"type":"结构件","isMulti":true},"layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},{"uuid":"85BF2534-518D-42C5-A003-AD213996CDF9","type":"Mesh","name":"BoxGeometry","userData":{"source":"geometry","material":[{"metadata":{"version":4.5,"type":"Material","generator":"Material.toJSON"},"uuid":"664DE36B-8371-4B50-819E-1C5B31D51992","type":"MeshBasicMaterial","name":"正方体","color":65280,"reflectivity":1,"refractionRatio":0.98,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"createBy":"程序创建","createFunc":"editor.addObject","extras":[{"label":"标识数据","value":0,"note":""},{"label":"类型图像","value":0,"note":""},{"label":"型号","value":0,"note":""},{"label":"制造商","value":0,"note":""},{"label":"URL","value":0,"note":""},{"label":"说明","value":0,"note":""},{"label":"部件代码","value":0,"note":""}],"type":"模型"},"layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"geometry":"88E395B8-576D-4139-B61A-10FADE8FD52C","material":"CD523BB0-185E-4490-9C45-BFAECCAC7D58"}]}},"layer":[],"selectedList":[{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"geometries":[{"uuid":"88E395B8-576D-4139-B61A-10FADE8FD52C","type":"BoxGeometry","width":1,"height":1,"depth":1,"widthSegments":1,"heightSegments":1,"depthSegments":1}],"materials":[{"uuid":"CD523BB0-185E-4490-9C45-BFAECCAC7D58","type":"MeshBasicMaterial","name":"正方体","color":65280,"reflectivity":1,"refractionRatio":0.98,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"object":{"uuid":"85BF2534-518D-42C5-A003-AD213996CDF9","type":"Mesh","name":"BoxGeometry","userData":{"source":"geometry","material":[{"metadata":{"version":4.5,"type":"Material","generator":"Material.toJSON"},"uuid":"664DE36B-8371-4B50-819E-1C5B31D51992","type":"MeshBasicMaterial","name":"正方体","color":65280,"reflectivity":1,"refractionRatio":0.98,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"createBy":"程序创建","createFunc":"editor.addObject","extras":[{"label":"标识数据","value":0,"note":""},{"label":"类型图像","value":0,"note":""},{"label":"型号","value":0,"note":""},{"label":"制造商","value":0,"note":""},{"label":"URL","value":0,"note":""},{"label":"说明","value":0,"note":""},{"label":"部件代码","value":0,"note":""}],"type":"模型"},"layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"geometry":"88E395B8-576D-4139-B61A-10FADE8FD52C","material":"CD523BB0-185E-4490-9C45-BFAECCAC7D58"}}],"sceneList":[],"modelList":[{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"geometries":[{"uuid":"88E395B8-576D-4139-B61A-10FADE8FD52C","type":"BoxGeometry","width":1,"height":1,"depth":1,"widthSegments":1,"heightSegments":1,"depthSegments":1}],"materials":[{"uuid":"CD523BB0-185E-4490-9C45-BFAECCAC7D58","type":"MeshBasicMaterial","name":"正方体","color":65280,"reflectivity":1,"refractionRatio":0.98,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"object":{"uuid":"85BF2534-518D-42C5-A003-AD213996CDF9","type":"Mesh","name":"BoxGeometry","userData":{"source":"geometry","material":[{"metadata":{"version":4.5,"type":"Material","generator":"Material.toJSON"},"uuid":"664DE36B-8371-4B50-819E-1C5B31D51992","type":"MeshBasicMaterial","name":"正方体","color":65280,"reflectivity":1,"refractionRatio":0.98,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"createBy":"程序创建","createFunc":"editor.addObject","extras":[{"label":"标识数据","value":0,"note":""},{"label":"类型图像","value":0,"note":""},{"label":"型号","value":0,"note":""},{"label":"制造商","value":0,"note":""},{"label":"URL","value":0,"note":""},{"label":"说明","value":0,"note":""},{"label":"部件代码","value":0,"note":""}],"type":"模型"},"layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"geometry":"88E395B8-576D-4139-B61A-10FADE8FD52C","material":"CD523BB0-185E-4490-9C45-BFAECCAC7D58"}}],"bgList":[],"funcComponentList":[],"dataComponentList":[],"group":{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"object":{"uuid":"B8337FF6-7F0E-4159-B32F-EA564B06072A","type":"Group","userData":{"type":"结构件","isMulti":true},"layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}},"mixers":[]}
  if (supported) {
    console.log('Using the File System Access API.')
  } else {
    console.log('Using the fallback implementation.')
  }
  // const blob = await fileOpen({
  //   mimeTypes: ['image/*']
  // })
  // const blob = new Blob([data]);
  // await fileSave(blob, {
  //   fileName: 'Untitled.js',
  //   extensions: ['.js'],
  // });

  var FileSaver = require('file-saver');
  var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "hello world.txt");

}



  let imageUrl = ref('')

  const $dayjs = inject('$dayjs')
  const request = inject("request")
  let time = ref($dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'))

  let timer = setInterval(() => {
    time.value = $dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
  }, 1000)

  const handleAvatarSuccess = (res, file) => {
    imageUrl = URL.createObjectURL(file.raw)
  }
  const beforeAvatarUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
  }
  onDeactivated(() => {
    clearInterval(timer)
    timer = null
    console.log('onDeactivated!')
  })

  const getElement = () => {
    nextTick(() => {
      document.getElementsByClassName(
        "el-upload__input"
      )[0].webkitdirectory = true;
    })
  }

  /* 模型导入 */
const uploadList = ref([])
const uploadSuccess = (res, file, fileList) => {
  console.log('res', res)
  console.log('file', file)
  console.log('fileList', fileList)
  uploadList.value.push(file)
  showImport.value = true
}

const beforeoutUpload = (file) => {
  console.log('file', file)
}

</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .popover_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  span:first-child {
    margin-right: 10px;
  }
  &:hover {
    color: var(--popover_hover_color)
  }
}
</style>