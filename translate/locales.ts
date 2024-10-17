export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ua",
  fallbackLocale: "ua",
  messages: {
    ua: {
      pages: {
        auth: {
          header: {
            signup: "Реєстрація",
            login: "Вхід",
          },
          password: "Пароль",
          email: "Email",
          signup: "Зареєструватися",
          login: "Увійти",
          haveAccount: "Вже є аккаунт?",
          createAccount: "Створити аккаунт",
          meta: {
            title: "BudgetMaster {'|'} Авторизація",
            description: "Авторизаційна сторінка",
          },
        },
        home: {
          logoName: "BudgetMaster",
          header: "Панель",
          hi: "Привіт, {name}!",
          balance: "Баланс: {balance}",
          meta: {
            title: "BudgetMaster {'|'} Головна",
            description: "Головна сторінка BudgetMaster",
          },
          noTransactions: "Додайте транзакції на сторінці",
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
          meta: {
            title: "BudgetMaster {'|'} Управління коштами",
            description: "Управляй своїми коштами",
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
        auth: {
          header: {
            signup: "Sign up",
            login: "Login",
          },
          password: "Password",
          email: "Email",
          signup: "Sign up",
          login: "Login",
          haveAccount: "Already have an account?",
          createAccount: "Create an account",
          meta: {
            title: "BudgetMaster {'|'} Auth",
            description: "Auth page",
          },
        },
        home: {
          logoName: "BudgetMaster",
          header: "Dashboard",
          hi: "Hi, {name}!",
          balance: "Balance: {balance}",
          meta: {
            title: "BudgetMaster {'|'} Main page",
            description: "Main page of BudgetMaster",
          },
          noTransactions: "Add transactions on the",
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
          meta: {
            title: "BudgetMaster {'|'} Dashboard page",
            description: "Manage your income and expenses",
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
