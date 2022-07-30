<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-1/2">
      <div class='w-1/2 h-full relative'>
        <div class="absolute top-0 right-0 z-10">HTML</div>
        <VueEditor :code="editorOption.html" mode="html" @datachange="c => changeEvent('html', c)"></VueEditor>
      </div>
      <div class="flex-1 h-full relative">
        <div class="absolute top-0 right-0 z-10">CSS</div>
        <VueEditor :code="editorOption.css" mode="css" @datachange="c => changeEvent('css', c)"></VueEditor>
      </div>
    </div>
    <div class="flex flex-1">
      <div class='w-1/2 h-full relative'>
        <div class="absolute top-0 right-0 z-10">JS</div>
        <VueEditor :code="editorOption.javascript" mode="javascript" @datachange="c => changeEvent('javascript', c)"></VueEditor>
      </div>
      <div class="flex-1 h-full relative">
        <div class="absolute top-0 right-0 z-10">Render</div>
        <VueLivePreview :option="editorOption"></VueLivePreview>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import VueEditor from '@comp/VueEditor'
import VueLivePreview from '@comp/VuePreview'

const editorOption = reactive({
  html: `<div class='zhangsan'>
  水电费来看撒
</div>`,
  css: `.zhangsan{
backgroun-color: red;
}`,
  javascript: 'con name = "zhansgan"',
})

const code = ref('')

const changeEvent = (key, value) => {
  editorOption[key] = value
}
</script>

<style scoped>
</style>
