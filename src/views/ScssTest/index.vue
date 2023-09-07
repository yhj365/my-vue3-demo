<template>
  <div class="xm-test">
    vue
    <div class="xm-test__inner">el</div>
    <div class="xm-test--success">success</div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@include b(test){
  color: red;
  @include e(inner){
    color: blue;
  }
  @include m(success){
    color: green;
  }
}
</style>
