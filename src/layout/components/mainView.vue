<template>
  <section>
    <transition name="fade-transform" mode="out-in" >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>