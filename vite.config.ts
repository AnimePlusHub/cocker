import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron"
import {notBundle} from 'vite-plugin-electron/plugin'
import { rmSync } from 'fs'
import pkg from './package.json'
import renderer from 'vite-plugin-electron-renderer'

//引入SVG插件
import {createSvgIconsPlugin}  from'vite-plugin-svg-icons'
import fs from 'fs';
import path from 'path';

const optimizeDepsElementPlusIncludes = ["element-plus/es", '@vuemap/vue-amap/es']
  fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
    fs.access(
      `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
      (err) => {
        if (!err) {
          optimizeDepsElementPlusIncludes.push(
            `element-plus/es/components/${dirname}/style/css`
          )
        }
      }
    )
  })

// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  rmSync('dist-electron',{recursive:true,force:true})

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return{
    plugins:[
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/Icons/svg')],
        // Specify symbolId format
        symbolId: '[name]',
      }),
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
