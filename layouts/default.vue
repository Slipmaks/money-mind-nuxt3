<template>
  <div>
    <header>
      <nav>
        <UContainer>
          <NuxtLink to="/">Главная</NuxtLink> |
          <NuxtLink to="/dashboard">Управление</NuxtLink> |
          <NuxtLink to="/auth" v-if="!isUserLoggedIn">Авторизация</NuxtLink>
          <NuxtLink to="/auth" v-else @click="logOut">Выйти</NuxtLink>
        </UContainer>
      </nav>
    </header>
    <main>
      <UContainer class="pt-4">
        <NuxtPage />
      </UContainer>
    </main>
  </div>
</template>

<script setup>
const isUserLoggedIn = ref(false),
  userStore = useMyUserStore();

onMounted(() => {
  isUserLoggedIn.value = !!localStorage.getItem("token");
});

onBeforeUpdate(() => {
  isUserLoggedIn.value = !!localStorage.getItem("token");
});

const logOut = () => {
  localStorage.removeItem("token");
  isUserLoggedIn.value = false;
  navigateTo("/auth");
};
</script>

<style scoped>
nav {
  background: #2c3e50;
  padding: 1rem;
}
nav a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}
</style>
