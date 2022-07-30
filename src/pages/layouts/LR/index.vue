<template>
  <div class="flex flex-col main-content p-5 box-border h-screen">
    <div class="text-2xl mb-4">
      HTML 在线编辑器
    </div>
    <div class="flex flex-1 h-full">
      <div class="w-1/2">
        <VueEditor :code="code" @datachange="changeEvent"></VueEditor>
      </div>
      <div class="flex-1">
        <VueLivePreview :code="code"></VueLivePreview>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueEditor from '@comp/VueEditor'
import VueLivePreview from '@comp/VuePreview'

const code = ref(`const cmOptions = {
  mode: "sql", // 语言模式
  //mode: "text/javascript", // 语言模式
  theme: "cobalt", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  foldGutter: true, // 启用行槽中的代码折叠
  styleActiveLine: true, // 显示选中行的样式
  extraKeys: {
    // 触发按键
    // Ctrl: "autocomplete",
  }
};`)

const changeEvent = (str) => {
  code.value = str
}
</script>

<style scoped>

</style>
