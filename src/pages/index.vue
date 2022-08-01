<template>
  <div>
    <!--MARK 报错信息可以展示出来：store.state.errors[0]-->
    <VueEditor @datachange="changeEvent"></VueEditor>
    <VueLivePreview :show="true" :ssr="false"></VueLivePreview>
  </div>
</template>

<script setup lang="ts">
import {provide} from 'vue'
import VueEditor from '@comp/VueEditor'
import VueLivePreview from '@repl/output/Preview'
import { ReplStore, Store } from '@repl/store.ts'

const store: Store = new ReplStore()
store.init()

// MARK 上下两列的都是展示为这个样子，只要一个index.vue文件
// store.addFile('index.vue')
// store.setActive('index.vue')

provide('store', store)

const changeEvent = (code) => {
  store.state.activeFile.code = code
}
</script>

<style scoped>

</style>
