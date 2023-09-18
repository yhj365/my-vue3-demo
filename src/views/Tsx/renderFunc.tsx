/**
 * 返回一个渲染函数
 * optionsAPI
 */
import { defineComponent } from "vue";

export default defineComponent({
  data(vm) {
      return {
        age: 33
      }
  },
  render(){
    return (
      <div>{this.age}</div>
    )
  }
})