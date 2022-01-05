<template>
  <div class="login_container" >
    <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login_form" label-position="left">

      <div class="title_container" >
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="Username"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>

       <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>

          <template #suffix>
            <el-icon class="el-input__icon"><view /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin" >Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: any</span>
      </div>

    </el-form>
  </div>
</template>

<script setup >
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User, View } from '@element-plus/icons-vue'

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}
const router = useRouter()
const loading = ref(false)
const passwordType = ref('password')
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const handleLogin = () => {
  console.log('1231',loginForm)
  router.push('/')
}

</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: #2D3A4B;
  box-sizing: border-box;
  .login_form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    color: #fff;
  }
}

.title_container {
  .title {
    font-size: 26px;
    color: #fff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

</style>