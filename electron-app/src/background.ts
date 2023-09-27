// electron 主进程文件
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      // 可以在渲染进程中使用node的api,为了安全默认是false
      nodeIntegration: true,
      // 把渲染进程隔离成沙箱，false关闭渲染进程的沙箱
      contextIsolation: false,
      // 关闭跨域检测
      webSecurity: false,
    },
  })
  if (process.argv[2]) {
    // 如果读取到，则是开发环境，使用ip
    win.loadURL(process.argv[2])
  } else {
    // 如果读取不到，则是生产环境，读取index.html文件
    win.loadFile('index.html')
  }
})
