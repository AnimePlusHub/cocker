
<template>
  <div id="login">
    <div class="common-layout">
      <el-container style=" background-color: aliceblue; width: 1000px; height: 450px">
        <el-aside class="aside" width="700px">
          <div class="image-wrapper">
            <el-image :src="src" style="width:100%;height:100%;"></el-image>
          </div>
        </el-aside>
        <el-container style="background-color: bisque;">
          <el-header style="height: 120px;margin-top: 10px;">
            <el-icon style="font-size: 40px;">
              <Sunrise />
            </el-icon>
            <h5 style="font-size: 18px; align-content: center">Welcome PlanetMsg</h5>
          </el-header>
          <el-main style="margin-top: 20px;">
            <el-form ref="form" :model="form" label-width="5px">
              <el-form-item style="margin-left:1px;">
                <el-input v-model="form.name" prefix-icon="Avatar" placeholder="Acount Or Email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" prefix-icon="lock" placeholder="PassWord" v-model="form.pass" style="border: 0;"
                  show-password autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit"
                  style=" background-color: black ; font-size: large; width: 250px;" round>登 录</el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer>
            <el-form-item>
              <p class="text">还没有账户吗？</p>
              <el-button type="text" @click="onRegister" aria-label="left"
                style="font-size: 16px; color: black; text-align: right;">去注册</el-button>
              <SvgIcon class="qcicon" icon-class='QCcode' style="width: 60px; height: 60px; margin:1px 2px  10px 20px;" />
            </el-form-item>
          </el-footer>
        </el-container>
      </el-container>
    </div>

  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../../components/svgIcon/index.vue'

const src = 'src/assets/images/7.png'
const form = { name: '', pass: '' }
const onSubmit = () => {
  console.log("Submit");
}

const onRegister = () => {
  console.log("Submit");
}
</script>

<style>
.image-wrapper {
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow: hidden;
}

.text{
  margin:0 5px ;
}

</style>