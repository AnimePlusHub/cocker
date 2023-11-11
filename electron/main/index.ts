import {app,BrowserWindow,shell,ipcMain} from 'electron'
import { release } from 'os'
import { join } from 'path'
import { argv } from 'process'



process.env.DIST_ELCTRON = join(__dirname,'..')
process.env.DIST = join(process.env.DIST_ELCTRON,'../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELCTRON,'../public') :process.env.DIST



//DIsable GPU Aceeleration for windows7
if(release().startsWith('6.1')) app.disableHardwareAcceleration()

//设置应用名称
if(process.platform === 'win32') app.setAppUserModelId(app.getName())

//如果别的同样应用在跑则退出
if(!app.requestSingleInstanceLock()){
    app.quit()
    process.exit(0)
}


let win:BrowserWindow | null = null
const preload = join(__dirname,'../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST,'index.html')

async function createWindow() {
    win = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.VITE_PUBLIC,'favicon.ico'),
        webPreferences:{
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    if(process.env.VITE_DEV_SERVER_URL){
        win.loadURL(url)
        win.webContents.openDevTools()
    }else{
        win.loadFile(indexHtml)
    }
    
    win.webContents.on('did-finish-load',()=>{
        win?.webContents.send('main-process-message',new Date().toLocaleString())
    })

    //链接使用浏览器打开
    win.webContents.setWindowOpenHandler(({url})=>{
        if(url.startsWith('https:')) shell.openExternal(url)
        return {action:'deny'}
    })
}
app.whenReady().then(createWindow)

app.on('window-all-closed',()=>{
    win = null
    if(process.platform !== 'darwin') app.quit()
})

app.on('second-instance',()=>{
    if(win){
        if(win.isMinimized()) win.restore()
        win.focus()
    }
})
app.on('activate',()=>{
    const allWindows = BrowserWindow.getAllWindows()
    if(allWindows.length){
        allWindows[0].focus()
    }else{
        createWindow()
    }
})

ipcMain.handle('opn-win',(_,arg)=>{
    const childWindow = new BrowserWindow({
        webPreferences:{
            preload,
            nodeIntegration:true,
            contextIsolation: false,
        },
    })
    if(process.env.VITE_DEV_SERVER_URL){
        childWindow.loadURL(`${url}#${arg}`)
    }else{
        childWindow.loadFile(indexHtml,{hash:arg})
    }
})
