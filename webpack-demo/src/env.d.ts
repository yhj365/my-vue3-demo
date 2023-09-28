// 配置vue声明文件，不然ts识别不了vue后缀文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
