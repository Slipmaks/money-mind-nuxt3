<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style lang="scss">
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  @apply transition-colors;
}
.dark {
  body {
    background-color: #091a28;
    color: #ebf4f1;
  }
}
.light {
  body {
    background-color: #f1e7d0;
    color: #433422;
  }
}
</style>
