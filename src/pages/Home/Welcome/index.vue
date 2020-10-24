<template>
  <div>
    <button @click="send">发送请求</button>
    <button @click="abort">发送中断请求</button>
  </div>
</template>

<script>
//引入日志getloginLog
import { getloginLog } from "@/api";
export default {
  methods: {
    send() {
      getloginLog(this).then(res => {
        console.log(res);
      });
    },
    abort() {
        //this.cancel终止请求
        // console.log(this.cancel);
        if(typeof this.cancel === 'function'){
            //调用终止请求
            console.log(this.cancel);
        }
    }
  }
};
</script>