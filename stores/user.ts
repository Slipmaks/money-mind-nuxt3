import { defineStore } from "pinia";

export const useMyUserStore = defineStore({
  id: "myUserStore",
  state: () => ({
    user: null,
    transactions: [],
  }),
  actions: {
    async getUser() {
      try {
        // @ts-ignore
        this.user = await $fetch("/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
