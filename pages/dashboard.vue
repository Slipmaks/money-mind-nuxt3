<template>
  <div>
    <h1>Управление доходами и расходами</h1>
    <UDivider class="mt-4 mb-8" />
    <form
      @submit.prevent="addTransactionHandler"
      class="flex space-x-4 items-center mb-4"
    >
      <UInput v-model="amount" type="number" placeholder="Сумма" required />
      <UInput
        v-model="description"
        type="text"
        placeholder="Описание"
        required
      />

      <URadioGroup v-model="type" :options="['income', 'expense']" required />
      <UButton type="submit">Добавить транзакцию</UButton>
    </form>

    <h2>Транзакции</h2>
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
        <UTooltip text="Удалить" :popper="{ placement: 'right' }">
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

const amount = ref(),
  type = ref("income"),
  description = ref(""),
  loading = ref(false),
  columns = [
    {
      key: "type",
      label: "Тип",
      sortable: true,
    },
    {
      key: "amount",
      label: "Сумма",
      sortable: true,
    },
    {
      key: "description",
      label: "Описание",
    },
    {
      key: "date",
      label: "Дата и время",
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

onMounted(async () => await fetchTransactions());
</script>
