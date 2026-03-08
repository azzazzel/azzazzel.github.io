<template>
  <UAlert
    color="neutral"
    variant="subtle"
    title="Note"
    icon="mdi-light-information"
  >
    <template #description>
      <slot></slot>
    </template>
  </UAlert>
</template>
