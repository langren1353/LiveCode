<template>
  <div v-loading="isLoading" class="h-screen overflow-hidden" @keydown="BindKeyPress">
    <div class="flex bg-gray-200 items-center">
      <div class="ml-5">
        文件名称
      </div>
      <div class="flex flex-1 justify-center">
        <div class="click-button p-2 rounded-2xl bg-gray-200" :class="{ active: tabs.html.visible }" @click="toggleActive('html')">HTML</div>
        <div class="click-button p-2 rounded-2xl bg-gray-200" :class="{ active: tabs.css.visible }" @click="toggleActive('css')">CSS</div>
        <div class="click-button p-2 rounded-2xl bg-gray-200" :class="{ active: tabs.javascript.visible }" @click="toggleActive('javascript')">JS</div>
        <div class="click-button p-2 rounded-2xl bg-gray-200" :class="{ active: tabs.module.visible }" @click="toggleActive('module')">Module</div>
      </div>
    </div>
    <div class="flex flex-1 flex-column h-full main-content">
      <SizeableDiv v-show="tabs.html.visible" tag="HTML">
        <VueEditor :code="tabs.html.code" mode="html" @datachange="c => changeEvent('html', c)"></VueEditor>
      </SizeableDiv>
      <SizeableDiv v-show="tabs.css.visible" tag="CSS">
        <VueEditor :code="tabs.css.code" mode="css" @datachange="c => changeEvent('css', c)"></VueEditor>
      </SizeableDiv>
      <SizeableDiv v-show="tabs.javascript.visible" tag="JS">
        <VueEditor :code="tabs.javascript.code" mode="javascript" @datachange="c => changeEvent('javascript', c)"></VueEditor>
      </SizeableDiv>
      <SizeableDiv v-show="tabs.module.visible" tag="MOD">
        <VueEditor :code="tabs.module.code" mode="javascript" @datachange="c => changeEvent('module', c)"></VueEditor>
      </SizeableDiv>
      <SizeableDiv>
        <VueLivePreview :show="true" :ssr="false"></VueLivePreview>
      </SizeableDiv>
    </div>
    <Message :err="store.state.errors[0]" />
  </div>
</template>

<script setup lang="ts">
import SizeableDiv from '@/components/SizeableDiv'
import templateDoc from './template.html?raw'
import { computed, provide, reactive, ref, toRaw } from 'vue'
import VueEditor from '@comp/VueEditor'
import VueLivePreview from '@repl/output/Preview'
import Message from '@repl/Message'
import debounce from 'lodash/debounce'
import { ReplStore, Store } from '@repl/store.ts'
import { ElMessage } from 'element-plus'

const $message = ElMessage

const tabs = reactive({
  html: genTab(true),
  css: genTab(true),
  javascript: genTab(true),
  module: genTab(true),
})

function genTab(visible = false) {
  return {
    visible: visible,
    code: '',
  }
}

const code = ref('')

const store: Store = new ReplStore()
store.init()

store.setActive('App.vue')

provide('store', store)

const moduleFile = 'import-map.json'

let hasInit = false

let defaultOption = {
  html: `<div class='zhangsan'>
    水电费来看撒
</div>`,
  css: `.zhangsan{
  background: red;
}`,
  javascript: 'const name = "zhansgan"',
  module: store.state.files[moduleFile].code
}

const init = () => {

  console.log('函数初始化')
  hasInit = true
  
  Object.keys(defaultOption).map(key => {
    changeEvent(key, defaultOption[key])
  })

  changeEvent()
}

const changeEvent = (key = '', value = '') => {
  const genVueCode = () => {
    return templateDoc
      .replace('模板代码放这里', tabs.html.code)
      .replace('JS setup 代码放这里', tabs.javascript.code)
      .replace('CSS 代码放这里', tabs.css.code)
  }
  
  const changeNormalCode = () => {
    if(key) tabs[key].code = value
    const code = genVueCode()
    store.state.activeFile.code = code
  }
  
  const changeModuleCode = (key = 'module') => {
    tabs[key].code = value
    store.state.files[moduleFile].code = value
  }

  if(!hasInit) return
  
  if(key === 'module') {
    changeModuleCode()
  } else {
    changeNormalCode()
  }
  
  // 自动保存调用
  doSave()
}

const toggleActive = (key) => {
  tabs[key].visible = !tabs[key].visible
}

const BindKeyPress = (event) => {
  // 目前绑定一个Ctrl+S的能力
  if(event.key.toLowerCase() === 's' && event.ctrlKey) {
    event.stopPropagation()
    event.preventDefault()
    
    doSave()

    $message.success('保存到本地成功')
  }
}

const localKey = 'saveConfig'
const loadLocal = () => {
  const itemValue = localStorage.getItem(localKey)
  if(itemValue) {
    const tabs_copy = JSON.parse(itemValue)
    const keys = Object.keys(tabs)
    
    keys.forEach(key => {
      const curTab = tabs_copy[key]
      Object.assign(tabs[key], curTab)
      defaultOption[key] = curTab.code
    })
  }
}

const doSave = () => {
  localStorage.setItem(localKey, JSON.stringify(toRaw(tabs)))
}

let isLoading = ref(true)

setTimeout(() => {
  loadLocal()
  init()
  isLoading.value = false
}, 500)

</script>

<style lang="scss" scoped>
.click-button{
  border: 1px solid gray;
  margin: 3px 2px;
  padding: 2px 1rem;
  cursor: pointer;
  
  &:hover{
    filter: brightness(1.2);
  }
  
  &.active{
    background-color: #EBF3FE;
  }
}
</style>
