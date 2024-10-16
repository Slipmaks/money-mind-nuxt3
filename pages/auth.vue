<template>
  <div>
    <h1>{{ action === "signup" ? "Регистрация" : "Вход" }}</h1>
    <UDivider class="mt-4 mb-8" />
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <div class="flex space-x-4">
        <UButton type="submit">
          {{ action === "signup" ? "Зарегистрироваться" : "Войти" }}
        </UButton>
        <UButton @click="toggleAction">
          {{ action === "signup" ? "Уже есть аккаунт?" : "Создать аккаунт" }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

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
  console.log(event.data);
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
</script>
