<template>
  <textarea ref="textareaRef"></textarea>
</template>

<script setup>
import { ref } from 'vue'
import CodeMirror from 'codemirror'
import emmet from '@emmetio/codemirror-plugin'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
// import 'codemirror/addon/hint/show-hint'

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'

import 'codemirror/mode/vue/vue'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/htmlembedded/htmlembedded'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'

import './idea.css'

import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/javascript-lint.js'
import 'codemirror/addon/lint/css-lint.js'
import 'codemirror/addon/lint/html-lint.js'

import debounce from 'lodash/debounce'

import { CSSLint } from 'csslint'
import { JSHINT } from 'jshint/dist/jshint-rhino'

window.CSSLint = CSSLint
window.JSHINT = JSHINT

emmet(CodeMirror)

const props = defineProps({ 
  code: {
    type: String,
    defualt: '',
  },
  mode: {
    type: String,
    defualt: '',
  }
})

const $emit = defineEmits(['datachange'])
const textareaRef = ref()

const lint_option = {
  javascript: {
    options: {esversion: 2021},
    highlightLines: true
  },
  css: true,
  html: true,
}

onMounted(() => {
  const editor = CodeMirror.fromTextArea(textareaRef.value, {
    mode: props.mode,
    theme: 'idea',
    value: '',
    height: '100%',
    showHint: true,
    lint: lint_option[props.mode],
    hint: true,
    lineNumbers: true, // 显示行号
    lineWrapping: true,
    tabSize: 2,
    smartIndent: true, // 智能缩进
    indentUnit: 2, // 智能缩进单位为2个空格长度
    autofocus: false,
    line: true,
    foldGutter: true, // 启用行槽中的代码折叠
    styleActiveLine: true, // 显示选中行的样式
    spellcheck: true,
    matchBrackets: true,
    gutters: ["CodeMirror-lint-markers"],
    extraKeys: {
      Tab: 'emmetExpandAbbreviation',
      Enter: 'emmetInsertLineBreak'
    },
    autoRefresh: true
  })
  editor.on('change',
    debounce(() => {
      const changeData = editor.getValue()
      $emit('datachange', changeData)
    }, 400)
  )
  
  editor.setValue(props.code)
  editor.setOption("viewportMargin", Infinity);
})
</script>
<style>
.CodeMirror{
  height: 100%;
}
</style>
