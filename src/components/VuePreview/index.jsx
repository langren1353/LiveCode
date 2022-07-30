import { defineComponent } from 'vue'


export default defineComponent({
  props: ['code', 'option'],
  
  render() {
    const code = this.code
    const editorOption = this.option
    
    if(code) {
      return <>
        <iframe style={{ width: '100%', height: '100%', border: 'unset' }} srcDoc={code}></iframe>
      </>
    } else {
      const { html: ori_html = '', css: ori_css = '', javascript: ori_js = '' } = editorOption
     
      // const codeRes = <>
      //   {html}
      //   <style>{css}</style>
      //   <script>{js}</script>
      // </>
      
      const codeRes = ori_html + `<style>${ori_css}</style>` + `<script>${ori_js}</script>`
      
      return <>
        <iframe style={{ width: '100%', height: '100%', border: 'unset' }} srcDoc={codeRes}></iframe>
      </>
    }
  }
})
