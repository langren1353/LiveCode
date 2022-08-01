<template>
  <Preview :show="true"></Preview>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Store } from "@vue/repl";
import { Preview } from "@vue/repl"

const store: Store = inject('store')

</script>

<style scoped>

</style>
