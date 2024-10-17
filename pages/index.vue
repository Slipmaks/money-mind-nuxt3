<template>
  <div>
    <h1 class="text-2xl">
      <span class="font-semibold"> {{ $t("pages.home.logoName") }}</span>
      {{ $t("pages.home.header") }}
    </h1>
    <UDivider
      class="mt-4 mb-8"
      :ui="{ border: { base: 'border-orange-300' } }"
    />
    <p>{{ $t("pages.home.hi", { name: user?.email }) }}</p>

    <ClientOnly>
      <Overview :income :expenses v-if="user?.transactions?.length" />

      <div v-else>
        {{ $t("pages.home.noTransactions") }}
        <NuxtLink to="/dashboard" class="underline">{{
          $t("links.dashboard")
        }}</NuxtLink>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "BudgetMaster | Main page",
  description: "Main page of BudgetMaster",
});

const userStore = useMyUserStore(),
  { getUser } = userStore,
  { user } = storeToRefs(userStore),
  income = ref(0),
  expenses = ref(0),
  { t } = useI18n();

onMounted(async () => {
  useSeoMeta({
    title: t("pages.home.meta.title"),
    description: t("pages.home.meta.description"),
  });
  await getUser();

  user.value.transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income.value += transaction.amount;
    } else {
      expenses.value += transaction.amount;
    }
  });
});
</script>
