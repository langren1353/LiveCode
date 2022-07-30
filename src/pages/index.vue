<template>
  <div>
    <VueEditor :code="code" @datachange="changeEvent"></VueEditor>
    <VueLivePreview :code="code"></VueLivePreview>
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
