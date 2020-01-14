import { app, BrowserWindow, Menu, screen,dialog  } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:8080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  Menu.setApplicationMenu(null)
  const size = screen.getPrimaryDisplay().size
  console.log(size.width,size.height)
  let  winheight='',winwidth='';
  if(size.height<1080){
   winheight =  size.height;
   winwidth =  size.width
   }else{
    winheight =  size.height-100;
    winwidth =  size.width-200
   }
  mainWindow = new BrowserWindow({
    height: winheight,
    useContentSize: false,
    width: winwidth,
    show:false,
    webPreferences: {
      nodeIntegration: true,
	    webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('ready-to-show', function() {
      mainWindow.show();
      mainWindow.focus();
  });
  //
   mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.loadFile('index.html');
  mainWindow.on('close', (e) => {
     mainWindow = null;
    // dialog.showMessageBox({
    //   type: 'info',
    //   title: 'Information',
    //   defaultId: 0,
    //   message: '当上传进度没有达到100%的时候，请不要关闭页面哦～？',
    //   buttons: ['最小化','直接退出']
    // },(index)=>{
    //   if(index===0){
    //     e.preventDefault();		//阻止默认行为，一定要有
    //     mainWindow.minimize();	//调用 最小化实例方法
    //   } else {
    //     mainWindow = null;
    //     //app.quit();	//不要用quit();试了会弹两次
    //     app.exit();		//exit()直接关闭客户端，不会执行quit();
    //   }
    // }) 
  });


}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})





