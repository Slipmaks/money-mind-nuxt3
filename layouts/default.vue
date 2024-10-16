<template>
  <div>
    <header>
      <nav>
        <UContainer class="flex justify-between items-center">
          <div>
            <NuxtLink to="/">{{ $t("links.home") }}</NuxtLink> |
            <NuxtLink to="/dashboard">{{ $t("links.dashboard") }}</NuxtLink> |
            <NuxtLink to="/auth" v-if="!isUserLoggedIn">{{
              $t("links.auth")
            }}</NuxtLink>
            <NuxtLink to="/auth" v-else @click="logOut">{{
              $t("links.logout")
            }}</NuxtLink>
          </div>
          <div>
            <USelectMenu
              v-model:model-value="currentLocale"
              @change="changeLocale"
              :options="['ua', 'en']"
            />
          </div>
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
  userStore = useMyUserStore(),
  { setLocale, locale } = useI18n(),
  currentLocale = ref(locale.value);

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
  },
  changeLocale = (localeName) => {
    setLocale(localeName);
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
