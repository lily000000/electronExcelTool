<template>
  <div>
    <!-- <div class="btn">
      <el-button type="primary" plain @click="openUrl">进入微信聊天管理系统</el-button>
    </div> -->
    <!-- <el-container> -->
      <!-- <el-header>
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
      </el-header>-->

      <el-row :gutter="20">
        <el-col>
          <el-card shadow="hover" class="top">
            <div class="header-wrap heard-item">
              <p class="title">Step 1:导入群组通讯好友</p>
              <div class="upload-list">
                <label>导入通讯录好友</label>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="#"
                  :auto-upload="false"
                  :file-list="fileList"
                  :on-change="phoneChange"
                >
                  <el-button slot="trigger" size="small" type="primary" plain>
                    请选择导入文件
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
              </div>
            </div>
            <div class="header-wrap heard-item">
              <p class="title">Step 2:选择导入聊天文件并上传</p>
              <div class="upload-list">
                <label style="margin-left:30px">日期范围</label>
                <el-date-picker
                  v-model="timeArry"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width:260px;height:35px;font-size:12px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="timeChange"
                ></el-date-picker>
              </div>
              <div class="upload-list">
                <label>导入聊天文件</label>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="#"
                  :file-list="fileTest"
                  :on-change="righthandleChange"
                  :before-upload="beforeAVatarUpload"
                >
                  <el-button slot="trigger" size="small" type="primary" plain>
                    请选择导入文件
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                  <div slot="tip" class="el-upload__tip">备注：只能上传csv文件</div>
                </el-upload>
              </div>
            </div>
            <div class="header-wrap heard-item">
              <p class="title">③ Step 3:点击上传本地资源</p>
              <div class="upload-list">
                <label>上传本地资源</label>
                <el-button type="primary" size="small" @click="onpush" plain :disabled="true">
                  点击上传本地资源
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </div>
              <div class="progress-bar">
                <el-progress :percentage="progressNum" v-if="progressNum>0"></el-progress>
              </div>
            </div>
            <div slot="body" style="display:none"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="row-list" v-show="uploadedSuccess">
        <el-col>
          <el-card shadow="hover" class="top">
            <div>
              <div v-show="excelData.length">
                <el-alert
                  :title="`导入结果：${fileName}`"
                  type="success"
                  :description="fileInfo"
                  show-icon
                ></el-alert>
                <el-table
                  :data="excelPreviewList"
                  stripe
                  border
                  style="width: 100%;dispaly:none"
                  max-height="600"
                >
                  <el-table-column prop="groupName" label="对话分组名"></el-table-column>
                  <el-table-column prop="weChatId" label="微信帐号" width="260px"></el-table-column>
                  <el-table-column prop="msgTime" label="日期" width="240px"></el-table-column>
                  <el-table-column prop="msgContent" label="消息内容" width="500px"></el-table-column>
                  <el-table-column prop="msgType" label="消息类型"></el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    background
                    :page-size="pageSize"
                    :pager-count="11"
                    :current-page.sync="pageNo"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <!-- </el-container> -->
    <div class="iptIp">
      <el-input
        placeholder="请输入需要更换的ip地址"
        v-model="ipInput"
        style=" width: 280px;margin-right:5px;"
      >
        <template slot="prepend">http://</template>
      </el-input>
      <el-button type="primary" @click.prevent="submitForm()">提交</el-button>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { constants } from "fs";
import { setTimeout } from "timers";
import { shell } from "electron";
import Cookie from "../../utils/cookie";
import localDb from "../../utils/localDb";

let xlsx = require("node-xlsx");
const parse = require("csv-parse");
var async = require("async");
const path = require("path");
const fs = require("fs");
let moment = require("moment");
var iconv = require("iconv-lite");
var chardet = require("chardet");

export default {
  name: "index",
  data() {
    return {
      ipInput: "",
      PhonefileType: "UTF8",
      wechatfileType: "UTF8",
      filterName: "",
      iconUrl:
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      fileList: [],
      fileTest: [],
      phoneRecord: false,
      chatRecord: true,
      form: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      uploadedSuccess: false,
      filesnumber: [], //本地存在的文件
      currentIndex: 0,
      progressNum: 0,
      excelData: [], //excel显示json
      excelPreviewList: [], //excel预览列表
      loading: false,
      fileName: "已上传文件",
      phoneFileName: "",
      fileInfo: "",
      columnTitle: [], //表格的title
      tableColumn: [],
      errorList: [],
      uploaded: 0,
      allObj: [],
      timeArry: "",
      startTime: "",
      endTime: "",
      patrn: /(^\/([0-9a-zA-Z])+)|(^[C|D|E|F|G]:\\.+\\.+$)/ //mac或者window,匹配路径
    };
  },
  mounted() {},
  methods: {
    //提交服务器地址
    submitForm() {
      localDb.set("ip", this.ipInput);
      Cookie.setCookie("ip", this.ipInput);
      if (this.ipInput) {
        this.$message({
          message: "IP地址修改成功！",
          type: "success"
        });
      }
    },
    openUrl() {
      this.$router.push({ path: "/webview" });
    },
    // 本地分页的方法
    paging(size, current) {
      const tableList = JSON.parse(JSON.stringify(this.allObj));
      const tablePush = [];
      tableList.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      });
      return tablePush;
    },
    beforeAVatarUpload(file) {
      return false;
      // if(this.phoneRecord){
      //    this.$message({
      //     message: "请先导入通讯录好友",
      //     type: "warning"
      //   });
      //   return false;
      // }
    },
    //请求第几页
    handleCurrentChange(currentPage) {
      this.fileTest = [];
      this.pageNo = currentPage;
      this.excelPreviewList = this.paging(this.pageSize, this.pageNo);
    },
    //时间切换
    timeChange(e) {
      if (e) {
        this.startTime = e[0];
        this.endTime = e[1];
      }
    },
    onpush() {
      if (
        this.filesnumber.length > 0 &&
        this.filesnumber.length !== this.uploaded
      ) {
        this.$confirm(
          `当前共有${this.filesnumber.length}个本地资源，当进度没有达到100%的时候，请不要关闭页面,请确定是否上传`
        )
          .then(action => {
            if (action == "confirm") {
              //保存全部数据
              this.readFiles(this.filesnumber[this.uploaded]);
            }
          })
          .catch(_ => {});
      } else if (this.filesnumber.length == this.uploaded) {
        this.$message({
          message: "当前无本地资源，请先导入聊天文件",
          type: "warning"
        });
      }
    },
    phoneChange(file, fileList) {
      this.fileList = [];
      let fileWectName = file.name.split("-")[0];
      if (fileWectName == "群组通讯录") {
        this.fileReader(file, fileList);
      } else if (fileWectName == "群组聊天记录") {
        this.$message({
          message: "请导入群组通讯录文件",
          type: "warning"
        });
      } else {
        this.$message({
          message: "请导入正确的文件",
          type: "warning"
        });
      }
    },
    //上传csv文件change事件
    righthandleChange: function(file, fileList) {
      this.chatRecord = false;
      this.uploadedSuccess = false;
      this.filesnumber = [];
      this.progressNum = 0;
      this.uploaded = 0;
      this.pageNo = 1;
      let fileWectName = file.name.split("-")[0];
      if (fileWectName == "群组通讯录") {
        this.$message({
          message: "请导入群组聊天记录文件",
          type: "warning"
        });
      } else if (fileWectName == "群组聊天记录") {
        this.fileReader(file, fileList);
      } else {
        this.$message({
          message: "请导入正确的文件",
          type: "warning"
        });
      }
    },
    //csv文件数据处理
    fileReader: function(file, fileList) {
      var _this = this;
      let fileType = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toUpperCase();
      let fileWectName = file.name.split("-")[0];
      let fileWect =
        fileWectName == "群组聊天记录"
          ? file.name.split("群组聊天记录-")[1].split(".")[0]
          : file.name.split("群组通讯录-")[1].split(".")[0];
      this.filterName = file.name;
      if (fileType == "CSV") {
        let obj = null;
        try {
          fileType == "CSV"
            ? _this.ConvertCsvToTable(
                file.raw.path,
                fileWect,
                fileWectName,
                this.filterName
              )
            : _this.convertExcelToTable(file.raw.path, fileWect, fileWectName);
        } catch (error) {
          // this.loading.close();
          this.$notify.error({
            title: "错误",
            message: "读取：【" + file.name + "】失败，错误：" + error
          });
        }
      } else {
        //  this.loading.close();
        this.$notify({
          title: "警告",
          message: file.name + "文件格式错误，只允许上传csv文件！",
          type: "warning",
          duration: 0
        });
      }
    },
    //读取表格的数据
    ConvertCsvToTable: function(path, name, fileWectName, filterName) {
      this.loading =
        fileWectName == "群组通讯录"
          ? this.$loading({ text: "文件传输中，请稍等..." })
          : this.$loading({ text: "文件解析中，请稍等..." });
      const _this = this;
      var parser = parse(
        { delimiter: ",", skip_line_width_error: true, quote: false },
        function(err, data) {
          async.eachSeries(data, function(line, callback) {
            doSomething(line).then(function() {
              callback();
            });
          });
        }
      );
      let newParser = function(data, next) {
        new Promise((resolve, reject) => {
          next();
        });
      };
      let obj2 = [];
      // console.log(chardet.detectAll(Buffer.from('hello there!')));
      var readerStream = fs
        .createReadStream(path)
        .pipe(
          iconv.decodeStream(chardet.detectFileSync(path, { sampleSize: 32 }))
        )
        // 设置编码为 utf8。
        .pipe(
          parse({ columns: true, auto_parse: true, trim: true, relax: true })
        )
        .on("data", function(data) {
          obj2.push(data);
        })
        .on("end", function() {
          if (fileWectName == "群组聊天记录") {
            _this.parserData(obj2, name, filterName);
          } else if (fileWectName == "群组通讯录") {
            _this.phoneData(obj2, name, filterName);
          }
        })
        .on("error", function(err) {
          console.log(err);
        });
    },
    //处理excel
    convertExcelToTable: function(path, name) {},
    phoneData(data, name, filterName) {
        console.log(data)
       
      let tableData = data.map((element, xindex) => {
        let child = {};
        _.forOwn(element, function(value, key) {
          switch (key) {
            // case "微信帐号":
            //   var key = "account";
            //   child[key] = value;
            //   break;
            case "昵称":
              var key = "groupName";
              child[key] = value;
              break;
            // case "微信号":
            //   var key = "wechatId";
            //   child[key] = value;
            //   break;
            // case "地址":
            //   var key = "address";
            //   child[key] = value;
            //   break;
            // case "备注":
            //   var key = "comments";
            //   child[key] = value;
            //   break;
            // case "个性签名":
            //   var key = "signature";
            //   child[key] = value;
            //   break;
            case "群组成员":
              var key = "groupUser";
              var groupArr = [];
              if(value){
                groupArr = value.split('/')
              }else{
                child[key] = groupArr;
              }
             child[key] = groupArr
              
              break;
            // case "社交信息":
            //   var key = "infon";
            //   child[key] = value;
              break;
            default:
          }
        });
        child.consultant = name;
        return child;
      });
      
      console.log("通讯录", tableData);
    //   console.log(JSON.stringify(tableData));
      // console.log(this.fileList);
      this.saveContactList(tableData, filterName);
    },
    //处理聊天记录表格数据
    parserData: function(data, name, filterName) {
      this.fileTest = [];
      let groupBy = {};
      let tableData=[];
      // console.log('未处理的数据',data);
      if (this.timeArry) {
        data = _.filter(data, item => {
          let isStart =
            moment(item.日期).format("YYYYMMDD") ==
            moment(this.startTime).format("YYYYMMDD");
          let isEnd =
            moment(item.日期).format("YYYYMMDD") ==
            moment(this.endTime).format("YYYYMMDD");
          if (isStart || isEnd) {
            return true;
          } else {
            return moment(item.日期).isBetween(
              moment(this.startTime),
              moment(this.endTime)
            ); // true
          }
        });
      }
      data.forEach((element, xindex) => {
        let child = {};
        _.forOwn(element, function(value, key) {
          switch (key) {
            case "对话分组名":
              var key = "groupName";
              child[key] = value;
              break;
            case "微信帐号":
              var keys = "sender";
              if (value && value != "未知好友") {
                let senderArray = value.split("/");
                child.weChatId = senderArray[senderArray.length - 1];
                var index = value.lastIndexOf("/");
                var str = value.substring(0, index);
                child.weChatName = str;
                // child.chatGroup = [senderArray[1]];
              }
            //   child[keys] = value;
              break;
            case "日期":
              var keys = "msgTime";
              child[keys] = moment(value).format("YYYY-MM-DD HH:mm:ss");
              break;
            case "消息内容":
              var keys = "msgContent";
              child[keys] = value;
              break;
            case "消息类型":
              var keys = "msgType";
              child[keys] = value;
              break;
            default:
          }    
        });
        // console.log(child);
       
        child.consultant = name ;
        tableData.push(child);
      });
      console.log("导入数据总数", tableData.length);
      this.allObj = tableData;
      this.institutionId(name, filterName);
      this.tableColumn = _.keys(this.allObj);
      this.excelData = this.allObj;
      this.total = this.allObj.length;
      this.excelPreviewList = this.allObj;
      this.excelPreviewList = this.paging(this.pageSize, this.pageNo);
    },
    //时间筛选符合条件的数据
    institutionId(name, fileName) {
      this.loading.close();
      // if (this.timeArry) {
      //   this.allObj = _.filter(this.allObj, item => {
      //     let isStart =
      //       moment(item.msgTime).format("YYYYMMDD") ==
      //       moment(this.startTime).format("YYYYMMDD");
      //     let isEnd =
      //       moment(item.msgTime).format("YYYYMMDD") ==
      //       moment(this.endTime).format("YYYYMMDD");
      //     if (isStart || isEnd) {
      //       return true;
      //     } else {
      //       return moment(item.msgTime).isBetween(
      //         moment(this.startTime),
      //         moment(this.endTime)
      //       ); // true
      //     }
      //   });
      // }
      if (this.allObj.length == 0) {
        this.$message({
          message: `当前已选择${this.allObj.length}个聊天记录,请确认选择时间再上传`,
          type: "warning"
        });
        return;
      }
      this.$confirm(`当前已选择${this.allObj.length}个聊天记录，请确定是否上传`)
        .then(action => {
          if (action == "confirm") {
            this.loading = this.$loading({ text: "文件传输中，请稍等..." });
            //保存全部数据
            this.saveRecordReq(fileName);
          }
        })
        .catch(_ => {});
    },
    //保存通讯录数据
    saveContactList(param, name) {
      // console.log('数据',param);
      this.$API
        .saveGroupContact(param)
        .then(res => {
          const { status, msg, data } = res;
          // console.log("保存成功", res);
          this.phoneFileName = data;
          this.loading.close();
          if (status == 200) {
            let fileObj = { name: name, url: this.iconUrl };
            this.fileList.push(fileObj);
            this.$notify({
              title: "提示",
              message: "上传成功",
              type: "success"
            });
            this.chatRecord = true;
            this.uploadedSuccess = true;
          } else if (status == 500) {
            this.$notify({
              title: "提示",
              message: "上传失败，请重新上传",
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.loading.close();
          this.$notify({
            title: "提示",
            message: "网络异常，请检查网络重试",
            type: "warning"
          });
        });
    },
    //保存微信聊天数据
    saveRecordReq(name) {
      // var checkList = _.chunk(this.allObj, 50);
      // console.log(111);
    //   const params = {
    //     list: this.allObj
    //   };
      this.$API.saveGroupChatRecord(this.allObj).then(res => {
        const { status, msg, data } = res;
        // console.log("保存成功", res);
        this.fileName = `通讯录好友${this.phoneFileName}；聊天记录${data}`;
        this.loading.close();
        if (status == 200) {
          let fileObj = { name: name, url: this.iconUrl };
          this.fileTest.push(fileObj);
          this.$notify({
            title: "提示",
            message: "上传成功",
            type: "success"
          });
          this.chatRecord = true;
          this.uploadedSuccess = true;
        } else if (status == 500) {
          this.$notify({
            title: "提示",
            message: "上传失败，请重新上传",
            type: "warning"
          });
        }
      });
    },
    //图片资源上传
    updateFileList(path, file) {
      if (this.uploaded > this.filesnumber.length - 1) {
        return;
      }
      // console.log(this.uploaded);
      const params = {
        fileName: path,
        file: file
      };
      this.$API.uploadReq(params).then(res => {
        // console.log("分析", res);
        this.uploaded = this.uploaded + 1;
        this.readFiles(this.filesnumber[this.uploaded]);
        let prosess = Math.ceil(
          (this.uploaded / this.filesnumber.length) * 100
        );
        this.progressNum = prosess > 100 ? 100 : prosess;
        if (prosess == 100) {
          this.$notify({
            title: "提示",
            message: "本地资源上传完成",
            type: "success"
          });
        }
      });
    },
    //图片数据转换
    readFiles: function(path) {
      if (!path) {
        return;
      }
      var file = fs.readFileSync(path);
      this.updateFileList(path, file);
    },
    restForm: function() {
      //重置
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
