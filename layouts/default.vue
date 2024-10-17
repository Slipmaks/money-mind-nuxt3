<template>
  <div>
    <header>
      <nav class="bg-orange-300/50 p-4 font-bold dark:bg-slate-800/50">
        <UContainer class="flex justify-between items-center">
          <div>
            <NuxtLink v-if="isUserLoggedIn" to="/">{{
              $t("links.home")
            }}</NuxtLink>

            <NuxtLink v-if="isUserLoggedIn" to="/dashboard">{{
              $t("links.dashboard")
            }}</NuxtLink>

            <NuxtLink to="/auth" v-if="!isUserLoggedIn">{{
              $t("links.auth")
            }}</NuxtLink>
            <NuxtLink to="/auth" v-else @click="logOut">{{
              $t("links.logout")
            }}</NuxtLink>
          </div>
          <ClientOnly>
            <div class="flex space-x-4 items-center">
              <div
                class="flex items-center p-1 border-transparent transition-all rounded-md border-2 cursor-pointer"
                @click="
                  $colorMode.preference =
                    $colorMode.preference === 'light' ? 'dark' : 'light'
                "
              >
                <UIcon
                  class="size-6 light:text-slate-800 hover:text-orange-400 dark:hover:text-slate-600"
                  :name="
                    $colorMode.preference === 'light' ? 'i-ph-sun' : 'i-ph-moon'
                  "
                />
              </div>

              <USelectMenu
                v-model:model-value="currentLocale"
                @change="changeLocale"
                :options="['ua', 'en']"
              />
            </div>
          </ClientOnly>
        </UContainer>
      </nav>
    </header>
    <main>
      <UContainer class="pt-4 z-0">
        <NuxtPage />
      </UContainer>
    </main>
  </div>
</template>

<script setup>
const isUserLoggedIn = ref(false),
  userStore = useMyUserStore(),
  { setLocale, locale } = useI18n(),
  currentLocale = ref(locale.value),
  { value, preference } = useColorMode();

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
nav a {
  @apply border-b-2 mr-4 border-orange-300/0 hover:border-orange-300/100 transition-all dark:hover:border-slate-300/100;
}
</style>
