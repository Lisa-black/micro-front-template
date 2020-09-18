declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'nprogress' {
  class NProgress {
    static configure (arg0: { showSpinner: boolean }) {
      throw new Error('Method not implemented.')
    }

    /** 开始加载 */
    static start: Function;
    /** 结束加载 */
    static done: Function;
  }
  export default NProgress
}
