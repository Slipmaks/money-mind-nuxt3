<template>
  <div>
    <h1 class="text-2xl">
      <span class="font-semibold"> {{ $t("pages.home.logoName") }}</span>
      {{ $t("pages.home.header") }}
    </h1>
    <UDivider class="mt-4 mb-8" />
    <p>{{ $t("pages.home.hi", { name: user?.email }) }}</p>
    <ClientOnly>
      <Overview :income :expenses />
    </ClientOnly>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const userStore = useMyUserStore(),
  { getUser } = userStore,
  { user } = storeToRefs(userStore),
  income = ref(0),
  expenses = ref(0);

onMounted(async () => {
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
