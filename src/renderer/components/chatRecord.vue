<template>
  <div>
    <div class="btn">
      <el-button type="primary" plain @click="openUrl">进入微信聊天管理系统</el-button>
    </div>
    <el-container>
      <el-header>
        <div>
          <ul class="steps-item">
            <li>① Step 1:导入通讯好友</li>
            <li>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li>② Step 2:选择导入聊天文件并上传</li>
            <li>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li>③ Step 3:点击上传本地资源完成导入</li>
          </ul>
        </div>
      </el-header>
      <el-tabs type="border-card">
        <el-tab-pane label="聊天记录">
          <personal-chat></personal-chat>
        </el-tab-pane>
        <el-tab-pane label="群组聊天记录">
          <group-record></group-record>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>
<script>
import _ from "lodash";
import { constants } from "fs";
import { setTimeout } from "timers";
import { shell } from "electron";
import Cookie from "../../utils/cookie";
import localDb from "../../utils/localDb";
import personalChat from "./personIndex";
import groupRecord from "./groupRecord";

export default {
  name: "index",
  components: {
    personalChat,
    groupRecord
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openUrl() {
      this.$router.push({ path: "/webview" });
    }
  }
};
</script>
<style scoped>
.el-header {
  border-bottom: 1px dotted #f2f2f2;
  background: #f4f4f5;
}
.el-main {
  text-align: center;
}
.fileList_title {
  padding: 20px;
  color: #333333;
  text-align: left;
}

.el-footer {
  /* background-color: #f2f6fc; */
  color: #333;
  text-align: center;
  line-height: 60px;
  display: block;
  padding: 10px;
}
.progress-bar {
  width: 300px;
  margin-left: 90px;
  margin-top: 10px;
}
.title-cont {
  text-align: center;
  margin: auto;
  margin-top: 20px;
}
.title-cont label {
  font-size: 13px;
  vertical-align: middle;
  line-height: 35px;
  color: #606266;
  margin-right: 10px;
}
.switch-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 20px;
}
.el-upload--text {
  width: 100px;
  height: 20px;
  background-color: none;
  border: none;
  position: absolute;
  bottom: 0;
  right: 0px;
}
.steps-item {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  width: 90%;
  margin: auto;
}
.steps-item li {
  line-height: 60px;
  font-size: 14px;
}
.upload-list {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.upload-list label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 35px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-upload__tip {
  margin-top: 10px;
}
.title {
  font-size: 16px;
}
.heard-item {
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #f4f4f4;
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 15px;
  position: relative;
}
.el-container .row-list:last-child {
  margin-top: 10px;
}
.btn {
  top: 8%;
  width: 130px;
  height: 40px;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  right: 80px;
}
.iptIp {
  width: 330px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  z-index: 999;
  left: 0px;
  margin-top: 10px;
}
</style>
