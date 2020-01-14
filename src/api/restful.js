export default {
  /*----------------------获取图片---------------------------------*/
  uploadReq: { //上传资源
    method: 'post',
    url: '/chat/upload'
  },
  saveRecordList: { //保存数据
    method: 'post',
    url: '/chat/saveChatRecordList/'
  },
  saveContactList: { //保存数据
    method: 'post',
    url: '/chat/saveContactList/'
  },
  saveGroupContact: { //保存通讯录数据
    method: 'post',
    url: '/chat/saveGroupContact/'
  },
  saveGroupChatRecord: { //保存聊天记录数据
    method: 'post',
    url: '/chat/saveGroupChatRecord/'
  }
}


