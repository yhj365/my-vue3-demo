// postcss插件

import { Plugin } from "postcss";

const Options = {
  viewportWidth: 375, // 设计稿一般是375px,UI设计稿宽度为多少，改为多少
}
interface Options {
  viewportWidth?: number,
}

export const PostCssPxToViewPort = (options: Options = Options):Plugin => {
  const opt = Object.assign({},Options,options)
  
  return {
    postcssPlugin: 'postcss-px-to-viewport',
    // 钩子函数
    Declaration(node){
      // px 转 vw
      if(node.value.includes('px')){
        // 考虑有小数，使用parseFloat
        const num = parseFloat(node.value)
        node.value = `${((num / opt.viewportWidth) * 100).toFixed(2)}vw`
        console.log(node.prop,node.value);
      }
      
    }
  }
}