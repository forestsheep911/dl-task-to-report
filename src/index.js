/* eslint-disable no-console */

console.log(1122334)

setTimeout(() => {
  window.postMessage({ cmd: 'dosth', msg: 'ok' }, document.URL)
}, 3000)

onmessage = (event) => {
  console.log(event.data)
}
