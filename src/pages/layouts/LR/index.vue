<template>
  <div class="flex flex-col main-content p-5 box-border h-screen">
    <div class="text-2xl mb-4">
      HTML 在线编辑器
    </div>
    <div class="flex flex-1 h-full">
      <div class="w-1/2">
        <VueEditor @datachange="changeEvent"></VueEditor>
      </div>
      <div class="flex-1">
        <VueLivePreview :show="true" :ssr="false"></VueLivePreview>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueEditor from '@comp/VueEditor'
import VueLivePreview from '@repl/output/Preview'
import { ReplStore, Store } from '@repl/store.ts'
import {provide} from "vue";

const store: Store = new ReplStore()
store.init()

provide('store', store)

const changeEvent = (code) => {
  store.state.activeFile.code = code
}
</script>

<style scoped>

</style>
