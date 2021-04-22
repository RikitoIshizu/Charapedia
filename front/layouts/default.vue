<template>
  <div :class="$style.main">
    <nuxt/>
    <div v-show="$store.state.isLoading" :class="$style.loading">
      <div :class="$style.loadingMessage">Loading...</div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '~/layouts/default.scss';
</style>

