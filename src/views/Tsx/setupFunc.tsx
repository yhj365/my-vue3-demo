/**
 * 返回一个setup函数
 *
 * v-show支持，v-if不支持,可以使用三元表达式代替
 * ref template 自动解包value,tsx并不会解包 ref.value
 * v-for不支持，可以使用数组map方法代替
 * v-bind使用{value}代替
 * props emit
 * 插槽A组件
 * v-model 支持
 */
import { defineComponent, ref } from 'vue'

const A = (_, { slots }) => (
  <>
    <div>{slots.default ? slots.default() : '默认值'}</div>
    <div>{slots.foo?.()}</div>
  </>
)
interface Props {
  name?: string
}
export default defineComponent({
  props: {
    name: String,
  },
  emits: ['on-click'],
  setup(props: Props, ctx) {
    let flag = ref(false)
    function changeFlag() {
      flag.value = !flag.value
    }
    const list = [1, 2, 3, 4, 5]
    function clickItem(item: any) {
      ctx.emit('on-click', item)
    }
    const slot = {
      default: () => <div>default slots</div>,
      foo: () => <div>foo slots</div>,
    }
    const model = ref<string>('输出')
    return () => (
      <div>
        <input type="text" v-model={model.value} />
        <div>{model.value}</div>
        <hr />
        <A v-slots={slot}></A>
        <hr />
        <div>props:{props?.name}</div>
        {list.map(item => {
          return <div onClick={() => clickItem(item)}>数组{item}</div>
        })}
        <div v-show={flag.value}>setup函数</div>
        <div>{flag.value ? <div>true</div> : <div>false</div>}</div>
        <button onClick={changeFlag}>{flag.value ? '隐藏' : '显示'}</button>
      </div>
    )
  },
})
