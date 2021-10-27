<template>
  <div>
    <div>获取多个DOM元素</div>
    <ul>
      <li v-for="(item, index) in arr" :key="index" :ref="setRef">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const arr = ref([1, 2, 3]);

    // 存储dom数组
    const myRef = ref([]);

    const setRef = (el) => {
      myRef.value.push(el);
    };

    nextTick(() => {
      console.log(myRef.value[0]);
    });
    return {
      arr,
      setRef
    };
  }
};
</script>