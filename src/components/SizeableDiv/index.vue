<template>
  <div class="box">
    <div v-show="tag" class="tag">{{ tag }}</div>
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: '',
  }
})

</script>
<style lang="scss" scoped>
.box{
  position: relative;
  width: 100%;
  height: 100%;

  .tag{
    position: absolute;
    left: 3px;
    top: 5px;
    font-size: 16px;
    background-color: #ff9966CA;
    padding: 3px;
    z-index: 1;
  }

  :deep(.CodeMirror) {
    height: 100%;
    width: 100%;
  }
}
</style>
