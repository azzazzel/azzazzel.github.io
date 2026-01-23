<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    method="POST"
    action="https://api.follow.it/subscription-form/NTByT1ZKVWNRZWJycTVwWnNCdGVYTG1ieWhlc1VRWWNpZHFXVVJkc3V5cFVUZ1hZNXFQTFZiL3ZheWc2S2FGSDlTSnFWNndTZGlxaUlaVjNTWlltTzNlOUF6YmtvcXBMb2oxalRUUnRzZHdlNTVOekdiYnc5bG5OeXFrU3k4U0V8bm9qcmNYQVVUK2NMbEN0cjRuNHg5dlByeDhmWk5rVldWeFk2NExmNjVrST0=/8"
    @submit="onSubmit"
  >
    <UFormField
      label="Get new posts by email:"
      name="email"
    >
      <UInput
        v-model="state.email"
        name="email"
      />
      <input
        type="hidden"
        name="email"
        :value="state.email"
      />
    </UFormField>

    <UButton
      type="submit"
      class="w-full"
    >
      Subscribe
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
  import type { FormSubmitEvent } from '@nuxt/ui'
  import * as z from 'zod'

  const schema = z.object({
    email: z.email('Invalid email'),
  })

  type Schema = z.output<typeof schema>

  const state = reactive<Partial<Schema>>({
    email: undefined,
  })

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const formElement = event.target as HTMLFormElement
    if (formElement) {
      formElement.submit()
    }
  }
</script>
