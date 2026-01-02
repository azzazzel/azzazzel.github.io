<template>
  <UAlert
    color="neutral"
    variant="subtle"
    title="HINT"
    icon="mdi-light-lightbulb-on"
  >
    <template #description>
      <slot></slot>
    </template>
  </UAlert>
</template>
