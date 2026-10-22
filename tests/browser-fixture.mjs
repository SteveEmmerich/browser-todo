// Manual browser harness: run after npm run build. The app bundle is unchanged.
// An opaque iframe origin makes the real browser deny localStorage access.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const index=await readFile(resolve('dist/index.html'),'utf8');
const scriptPath=index.match(/src="([^"]+\.js)"/)?.[1];
const stylePath=index.match(/href="([^"]+\.css)"/)?.[1];
if(!scriptPath || !stylePath) throw new Error('Build output not found; run npm run build first');
const script=await readFile(resolve('dist',scriptPath.replace(/^\//,'')),'utf8');
const style=await readFile(resolve('dist',stylePath.replace(/^\//,'')),'utf8');
const frame=`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${style}</style></head><body><div id="root"></div><script type="module">${script.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
const escaped=frame.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const page=`<!doctype html><html lang="en"><head><title>Storage denied · verification fixture</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><p style="font:13px system-ui;padding:8px 16px;margin:0;background:#fff1d9">Verification fixture: unchanged production bundle, isolated iframe; browser storage is denied.</p><iframe title="Storage denied fixture" sandbox="allow-scripts allow-forms" style="display:block;width:100%;height:100vh;border:0" srcdoc="${escaped}"></iframe></body></html>`;
createServer((request,response)=>{
  response.setHeader('Content-Type','text/html; charset=utf-8');
  response.setHeader('Cache-Control','no-store');
  if(request.url!=='/') {response.writeHead(404);response.end('Not found');return;}
  response.end(page);
}).listen(1422,'127.0.0.1',()=>console.log('Storage-denial verification fixture: http://127.0.0.1:1422/'));
