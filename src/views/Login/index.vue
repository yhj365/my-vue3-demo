<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const form = ref({
  user: 'admin',
  password: '123456',
})

const onSubmit = async () => {
  await initRouter()
  router.push('/')
}
const initRouter = async () => {
  const result = await axios.get('/api/login', {
    params: form.value,
  })
  result.data.route.forEach((v: any) => {
    router.addRoute({
      path: v.path,
      name: v.name,
      component: () => import(`../views/${v.component.slice(-4)}.vue`),
    })
  })
  console.log(router.getRoutes())
}
</script>

<style lang="scss" scoped></style>
