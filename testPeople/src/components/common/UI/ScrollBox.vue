<script setup lang="ts"></script>

<template>
  <div class="scroll--box">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.scroll--box {
  position: relative;
  z-index: 3;
  height: max-content;
  max-width: 100%;
  max-height: 20vh;
  padding: 0.5em 1em;
  overflow-x: hidden;
  overflow-y: scroll;
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 8px;
  -webkit-box-shadow: 0 -1px 21px 8px rgba(184, 184, 184, 1);
  -moz-box-shadow: 0 -1px 21px 8px rgba(184, 184, 184, 1);
  box-shadow: 0 -1px 21px 8px rgba(184, 184, 184, 1);
  scrollbar-width: none;
  scrollbar-gutter: unset;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
