<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-1/2">
      <div class='w-1/2 h-full relative'>
        <div class="absolute top-0 right-0 z-10">JS</div>
        <VueEditor :code="editorOption.javascript" mode="javascript" @datachange="c => changeEvent('javascript', c)"></VueEditor>
      </div>
      <div class='w-1/2 h-full relative'>
        <div class="absolute top-0 right-0 z-10">HTML</div>
        <VueEditor :code="editorOption.html" mode="vue" @datachange="c => changeEvent('html', c)"></VueEditor>
      </div>
    </div>
    <div class="flex flex-1">
      <div class="flex-1 h-full relative">
        <div class="absolute top-0 right-0 z-10">CSS</div>
        <VueEditor :code="editorOption.css" mode="css" @datachange="c => changeEvent('css', c)"></VueEditor>
      </div>
      <div class="flex-1 h-full relative">
        <div class="absolute top-0 right-0 z-10">Render</div>
<!--        <VueLivePreview :option="editorOption"></VueLivePreview>-->
        <VueLivePreview :show="true" :ssr="false"></VueLivePreview>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, computed  } from 'vue'
import VueEditor from '@comp/VueEditor'
import VueLivePreview from '@repl/output/Preview'
import templateDoc from './template.html?raw'
import { ReplStore, Store } from "../../../lib/repl";

const editorOption = reactive({
  html: `<div class='zhangsan'>
    水电费来看撒
</div>`,
  css: `.zhangsan{
  background: red;
}`,
  javascript: 'const name = "zhansgan"',
})

const code = ref('')

const store: Store = new ReplStore()
store.init()

store.addFile('index.vue')
store.addFile('index.js')
store.addFile('index.css')

store.setActive('App.vue')

provide('store', store)

const changeEvent = (key, value) => {
  editorOption[key] = value

  const getModeFile = computed(() => {
    if(!key) return 'App.vue'
    const modeFiles = {
      html: 'index.vue',
      css: 'index.css',
      javascript: 'index.js',
    }
    return modeFiles[key]
  })
  
  const code = genVueCode()
  store.state.activeFile.code = code
  // store.state..code = code
}
const genVueCode = () => {
  return templateDoc
    .replace('模板代码放这里', editorOption.html)
    .replace('JS setup 代码放这里', editorOption.javascript)
    .replace('CSS 代码放这里', editorOption.css)
}
</script>

<style scoped>
</style>
