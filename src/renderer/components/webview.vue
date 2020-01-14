<template>
  <div class="webview-top">
    <webview
      nodeintegration="true"
      src="http://192.168.20.100/record"
    ></webview>
    <!-- <webview
      nodeintegration="true"
      src="http://192.168.50.87:8081/#/home"
    ></webview> -->
    <!-- <webview src="http://118.31.110.200"></webview> -->
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
export default {
  mounted() {
    const webview = document.querySelector("webview");
     //上面是渲染进程发送消息给webview
    webview.addEventListener("dom-ready", () => {
      //  webview.send('webmsg','我是父亲')
      //  webview.openDevTools();
      console.log("渲染进程在webview加载完之后发送消息");
    });
   //接收webview的消息
    webview.addEventListener("ipc-message", (event) => {
      // console.log("收到webview发送的消息",event.channel)
      this.$router.push({ path: "/" });
    });

    // var webview = onload =()=>{
    //     webview = document.querySelector('webview')
    //     webview.addEventListener('new-window',(e)=>{
    //         var protocol = require('url').parse(e.url).protpcol;
    //         if(protocol === 'http:'||protocol === "https:"){
    //             webview.src = e.url
    //         }
    //     })
    //     webview.addEventListener('ipc-message',(event)=>{
    //         console.log(event.channel)
    //     })
    // }
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style>
.btn {
  position: fixed;
  top: 10px;
  right: 20px;
}
.webview-top {
  width: 100%;
  height: 100%;
}
webview {
  width: 100%;
  height: 100%;
}
</style>


