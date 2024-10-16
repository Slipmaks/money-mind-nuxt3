<template>
  <div>
    <h1 class="text-2xl">
      <span class="font-semibold">BudgetMaster</span> Dashboard
    </h1>
    <UDivider class="mt-4 mb-8" />
    <p>Привет, {{ user?.email }}!</p>
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
