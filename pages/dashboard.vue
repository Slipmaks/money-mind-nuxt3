<template>
  <div>
    <h1 class="text-2xl mb-2">{{ $t("pages.dashboard.header") }}</h1>
    <p class="font-thin text-sm">
      {{ $t("pages.dashboard.description") }}
    </p>
    <UDivider
      class="mt-4 mb-8"
      :ui="{ border: { base: 'border-orange-300' } }"
    />
    <form
      @submit.prevent="addTransactionHandler"
      class="flex space-x-4 items-center mb-4"
    >
      <UInput
        v-model="amount"
        type="number"
        :placeholder="$t('pages.dashboard.sumPlace')"
        required
      />
      <UInput
        v-model="description"
        type="text"
        :placeholder="$t('pages.dashboard.descPlace')"
        required
      />

      <URadioGroup
        v-model="type"
        :options="[
          { label: $t('pages.dashboard.income'), value: 'income' },
          { label: $t('pages.dashboard.expense'), value: 'expense' },
        ]"
        required
      />
      <UButton type="submit">{{ $t("pages.dashboard.add") }}</UButton>
    </form>

    <h2 class="text-xl">{{ $t("pages.dashboard.transactions") }}</h2>
    <UTable
      :loading="loading"
      :rows="transactions"
      :columns="columns"
      :progress="{ color: 'primary', animation: 'carousel' }"
    >
      <!-- <template #expand="{ row }">
        <div class="p-4">
          <pre>{{ row.description }}</pre>
        </div>
      </template> -->

      <template #actions-data="{ row }">
        <UTooltip
          :text="$t('pages.dashboard.delete')"
          :popper="{ placement: 'right' }"
        >
          <UButton
            color="gray"
            variant="ghost"
            @click="deleteTransactionHandler(row._id)"
          >
            <UIcon name="i-heroicons-trash-20-solid" />
          </UButton>
        </UTooltip>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "BudgetMaster | Dashboard page",
  description: "Manage your income and expenses",
});

const amount = ref(),
  type = ref("income"),
  description = ref(""),
  loading = ref(false),
  { t } = useI18n(),
  columns = [
    {
      key: "type",
      label: t("pages.dashboard.table.type"),
      sortable: true,
    },
    {
      key: "amount",
      label: t("pages.dashboard.table.amount"),
      sortable: true,
    },
    {
      key: "description",
      label: t("pages.dashboard.table.description"),
    },
    {
      key: "date",
      label: t("pages.dashboard.table.date"),
      sortable: true,
    },
    {
      key: "actions",
    },
  ];

const transactionsStore = useMyTransactionsStore(),
  { transactions } = storeToRefs(transactionsStore),
  { getTransactions, addTransaction, deleteTransaction } = transactionsStore;

const fetchTransactions = async () => {
    loading.value = true;
    await getTransactions();
    loading.value = false;
  },
  addTransactionHandler = async () => {
    await addTransaction(amount.value, type.value, description.value);

    amount.value = "";
    type.value = "income";
    description.value = "";

    fetchTransactions();
  },
  deleteTransactionHandler = async (id: string) => {
    await deleteTransaction(id);
    fetchTransactions();
  };

onMounted(async () => {
  await fetchTransactions();
  useSeoMeta({
    title: t("pages.dashboard.meta.title"),
    description: t("pages.dashboard.meta.description"),
  });
});
</script>
