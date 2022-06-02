<template>
  <p>hello</p>
  <el-input v-model="password" ></el-input>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import JSEncrypt from 'jsencrypt'


const passwordEncryption = (publicKey,data,keyLen='2048')=>{
  let key = `MIIBCgKCAQEAsfItkI5MNxQ8JkFD4EhBmDYY9bJd+C9AbvEn0KHFtsi2ogakq3VocleziJ8RSzqucudiUi+dU4zFC2xNj8v1LRnuwWGnZUIIbds+Un3w+ezmGvmK04394s/qtK7zq072utX5C1FL5wFih8vISI+6hz77NipwAnEVXvV7d9fD4t9VaO4AlYlANbm0FedVbVu0gX88vUohf5/I1LIV43pfh1T/RO5K2GSibVkWTJ/LGjrWu2M6RaG0qpeiwWbJiYViTts9gjU7eatCWKa29ub+Et6GdRMadxpJoArlffN8REtSv+iyiBHcpeT6oMWA6Gg7eud7N4sayftLTrYvxGO0sQIDAQAB`
  const enc = new JSEncrypt({default_key_size:keyLen});
  enc.setPublicKey(key)
  const wwww = enc.encrypt(data);
  return wwww;
}

onMounted(() => {
  let a =  passwordEncryption('', '123456')
  console.log('aaaaaaaaaaaaaa', a)
})

const password = ref('')
const theme = {
  color: 'blue'
}
</script>

<style lang="scss">
.hello {
  color: v-bind('theme.color');
}
</style>
