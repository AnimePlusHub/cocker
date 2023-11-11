import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron"
import {notBundle} from 'vite-plugin-electron/plugin'
import { rmSync } from 'fs'
import pkg from './package.json'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  rmSync('dist-electron',{recursive:true,force:true})

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return{
    plugins:[
      vue(),
      electron([
        {
          entry: 'electron/main/index.ts',
          onstart({startup}){
            if(process.env.VSCODE_DEBUG){
              console.log('[startup] Electron App')
            }else{
              startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify:isBuild,
              outDir: 'dist-electron/main',
              rollupOptions:{
                external: Object.keys('dependencies' in pkg ? pkg.dependencies:{})
              },
            },
            plugins:[
              isServe && notBundle()
            ]
          }
        }
      ]),
      renderer(),
    ],
    server:process.env.VSCODE_DEBUG && (()=>{
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen:false
  }
})
