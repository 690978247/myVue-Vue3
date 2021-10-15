<template>
  <section>
    <!-- <transition name="fade-transform" mode="out-in" >
      <keep-alive>
        <router-view ></router-view>
      </keep-alive>
    </transition> -->
    <router-view v-slot="{ Component }" >
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" ></component>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>