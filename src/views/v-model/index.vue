<template>
  <div class="model" v-if="modelValue">
    <div class="close"><button @click="close">关闭</button></div>
    <h3>我是v-model子组件</h3>
    <div>内容<input :value="textValue" @input="change" type="text"/></div>
    
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: boolean,
  textValue: string,
  // 获取修饰符，固定在值后面加Modifiers
  textValueModifiers?: {
    isBt: boolean
  }
}>()

const emit = defineEmits(['update:modelValue','update:textValue'])
const close = ()=>{
  emit('update:modelValue',false)
}
const change = (e:Event)=>{
  const target = e.target as HTMLInputElement
  emit('update:textValue', props?.textValueModifiers?.isBt ? target.value+'+修饰符isBt' : target.value)
}

</script>

<style lang="scss" scoped>
.model{
  width: 500px;
  border: 1px solid #ccc;
  padding: 10px;
  .close{
    display:flex;
    justify-content: flex-end;
  }
}
</style>