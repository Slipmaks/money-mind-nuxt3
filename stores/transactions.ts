import { defineStore } from "pinia";

interface Transaction {
  amount: number;
  type: string;
  description: string;
  date: string;
}
export const useMyTransactionsStore = defineStore({
  id: "myTransactionsStore",
  state: () => ({
    transactions: [] as Transaction[],
  }),
  actions: {
    async getTransactions() {
      try {
        // @ts-ignore
        const response: Transaction[] = await $fetch("/api/transactions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.transactions = await response.map((transaction: any) => {
          return {
            ...transaction,
            date: new Date(transaction.date).toLocaleString(),
          };
        });
      } catch (error: any) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          navigateTo("/auth");
        }
      }
    },
    async addTransaction(amount: number, type: string, description: string) {
      try {
        // @ts-ignore
        await $fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            //@ts-ignore
            amount: parseFloat(amount),
            type,
            description,
          }),
        });
      } catch (error: any) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          navigateTo("/auth");
        }
      }
    },
    async deleteTransaction(id: string) {
      try {
        // @ts-ignore
        await $fetch("/api/transactions", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id }),
        });
      } catch (error: any) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          navigateTo("/auth");
        }
      }
    },
  },
});
