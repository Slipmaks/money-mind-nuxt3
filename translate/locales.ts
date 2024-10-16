export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ua",
  fallbackLocale: "ua",
  messages: {
    ua: {
      pages: {
        auth: {},
        home: {
          logoName: "BudgetMaster",
          header: "Панель",
          hi: "Привіт, {name}!",
          balance: "Баланс: {balance}",
        },
        dashboard: {
          header: "Керування доходами та витражами",
          description: "Ви можете змінювати витрати та доходи",
          sumPlace: "Введіть суму",
          descPlace: "Введіть опис",
          income: "Дохід",
          expense: "Витрата",
          add: "Додати транзакцію",
          transactions: "Транзакції",
          delete: "Видалити",
          table: {
            type: "Тип",
            amount: "Сума",
            description: "Опис",
            date: "Дата та час",
          },
        },
      },
      components: {
        overview: "Ваш баланс",
        income: "Доходи",
        expenses: "Витрати",
        balance: "Баланс",
      },
      links: {
        home: "Головна",
        dashboard: "Управління коштами",
        auth: "Авторизація",
        logout: "Вихід",
      },
    },
    en: {
      pages: {
        auth: {},
        home: {
          logoName: "BudgetMaster",
          header: "Dashboard",
          hi: "Hi, {name}!",
          balance: "Balance: {balance}",
        },
        dashboard: {
          header: "Manage income and expenses",
          description: "You can change income and expenses",
          sumPlace: "Enter amount",
          descPlace: "Enter description",
          income: "Income",
          expense: "Expense",
          add: "Add transaction",
          transactions: "Transactions",
          delete: "Delete",
          table: {
            type: "Type",
            amount: "Amount",
            description: "Description",
            date: "Date and time",
          },
        },
      },
      components: {
        overview: "Your balance",
        income: "Income",
        expenses: "Expenses",
        balance: "Balance",
      },
      links: {
        home: "Home",
        dashboard: "Money management",
        auth: "Auth",
        logout: "Logout",
      },
    },
  },
}));
