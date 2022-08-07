<template>
  <textarea ref="textareaRef"></textarea>
</template>

<script setup>
import { ref } from 'vue'
import CodeMirror from 'codemirror'
import emmet from '@emmetio/codemirror-plugin'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'

import 'codemirror/mode/vue/vue'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/htmlembedded/htmlembedded'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/sass/sass'

import './idea.css'

import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/javascript-lint.js'
import 'codemirror/addon/lint/css-lint.js'
import 'codemirror/addon/lint/html-lint.js'

import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/comment/continuecomment.js'
// 提示弹窗
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'

// 搜索功能
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/addon/search/match-highlighter'

// 折叠功能
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

import debounce from 'lodash/debounce'

import { CSSLint } from 'csslint'
import { JSHINT } from 'jshint/dist/jshint-rhino'
import { inject } from "vue";

// 代码提示功能
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';

const store = inject('store')

window.CSSLint = CSSLint
window.JSHINT = JSHINT

emmet(CodeMirror)

const props = defineProps({ 
  code: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: '',
  }
})

const $emit = defineEmits(['datachange'])
const textareaRef = ref()

const lint_option = {
  javascript: {
    options: { esversion: 2021 },
    highlightLines: true
  },
  sass: true,
  css: true,
  vue: {
    html: {
      options: {
        'attr-value-double-quotes': false,
      }
    }
  },
  html: { 
    options: {
      'attr-value-double-quotes': false,
    }
  },
}

let editor = null
let isUserTyping = false

onMounted(() => {
  editor = CodeMirror.fromTextArea(textareaRef.value, {
    mode: props.mode,
    theme: 'idea',
    value: '',
    height: '100%',
    showHint: true,
    lint: lint_option[props.mode],
    hint: true,
    lineNumbers: true, // 显示行号
    lineWrapping: true,
    tabSize: 4,
    smartIndent: true, // 智能缩进
    indentUnit: 4, // 智能缩进单位为2个空格长度
    autofocus: false,
    line: true,
    foldGutter: true, // 启用行槽中的代码折叠
    styleActiveLine: true, // 显示选中行的样式
    spellcheck: true,
    matchBrackets: true,
    gutters: ["CodeMirror-lint-markers"],
    extraKeys: { // MARK https://www.niwoxuexi.com/blog/xiaozhu/article/1228
      Tab: 'emmetExpandAbbreviation',
      Enter: 'emmetInsertLineBreak',
      "Ctrl-/": "toggleComment"
    },
    autoRefresh: true
  })
  
  editor.on('change',
    debounce(() => {
      const changeData = editor.getValue()
      $emit('datachange', changeData)
      isUserTyping = true
      setTimeout(() => {
        isUserTyping = false
      })
    }, 400)
  )
  
  editor.setValue(props.code)
  editor.setOption("viewportMargin", Infinity);
})

watch(() => props.code, (val) => {
  if (!isUserTyping) editor.setValue(val)
})
</script>
<style scoped>

</style>
