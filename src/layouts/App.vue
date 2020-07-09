<template>
  <section class="app-layout">
    <main class="app-layout-content">
      <router-view />
    </main>
  </section>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  .app-layout-content {
    position: relative;
    flex: auto;
  }
}
</style>