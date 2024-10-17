<template>
  <div>
    <h1 class="text-2xl">
      {{
        action === "signup"
          ? $t("pages.auth.header.signup")
          : $t("pages.auth.header.login")
      }}
    </h1>
    <UDivider
      class="mt-4 mb-8"
      :ui="{ border: { base: 'border-orange-300' } }"
    />
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 max-w-xs"
      @submit="onSubmit"
    >
      <UFormGroup :label="$t('pages.auth.email')" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup :label="$t('pages.auth.password')" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <div class="flex space-x-4">
        <UButton type="submit">
          {{
            action === "signup"
              ? $t("pages.auth.signup")
              : $t("pages.auth.login")
          }}
        </UButton>
        <UButton @click="toggleAction">
          {{
            action === "signup"
              ? $t("pages.auth.haveAccount")
              : $t("pages.auth.createAccount")
          }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

useSeoMeta({
  title: "BudgetMaster | Auth",
  description: "Auth page",
});
// definePageMeta({
//   colorMode: "light",
// });

const { t } = useI18n();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const action = ref("signup");

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await useFetch("/api/auth", {
    method: "POST",
    body: {
      email: event.data.email,
      password: event.data.password,
      action: action.value,
    },
  });

  if (error.value) {
    alert("Ошибка: " + error.value.message);
    // @ts-ignore
  } else if (data.value?.token) {
    // @ts-ignore
    localStorage.setItem("token", data.value.token as string);
    navigateTo("/");
  } else {
    // @ts-ignore
    alert(data.value?.message ?? "Неизвестная ошибка");
  }
}

const toggleAction = () => {
  action.value = action.value === "signup" ? "login" : "signup";
};

onMounted(() => {
  useSeoMeta({
    title: t("pages.auth.meta.title"),
    description: t("pages.auth.meta.description"),
  });
});
</script>
