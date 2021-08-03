/* eslint-disable no-console */

function laterExecute() {
  if (window.location.pathname.startsWith('/k/20565/show') && !window.location.hash.includes('edit')) {
    console.log('in1 111i')
    const stringPassRecordKey = kintone.app.record.get().record.record_key.value
    const stringPassTitle = kintone.app.record.get().record.title.value
    const eleCopyRecordKeyButton = document.createElement('BUTTON')
    eleCopyRecordKeyButton.innerText = 'cp'
    eleCopyRecordKeyButton.style.position = 'relative'
    eleCopyRecordKeyButton.style.left = '12px'
    const eleRecordKey = kintone.app.record.getFieldElement('record_key')
    eleCopyRecordKeyButton.onclick = () => {
      // GM_openInTab('https://cndevqpofif.cybozu.cn/k/21/edit', { active: true })
      // console.log(GM_info.script.uuid)
      const bc = new BroadcastChannel('postme')
      setTimeout(() => {
        bc.postMessage({ refKey: stringPassRecordKey, content: stringPassTitle })
      }, 2000)
    }
    eleRecordKey.appendChild(eleCopyRecordKeyButton)
  }

  if (window.location.pathname.startsWith('/k/46878/edit')) {
    const bc = new BroadcastChannel('postme')
    bc.onmessage = (ev) => {
      console.log(ev)
      const editingRecord = kintone.app.record.get().record
      // console.log(editingRecord)
      editingRecord.subtable.value[0].value.pj_name.value = ev.data.refKey
      editingRecord.subtable.value[0].value.pj_content.value = ev.data.content
      editingRecord.subtable.value[0].value.type.value = '项目常规'
      editingRecord.subtable.value[0].value.hour.value = 8
      kintone.app.record.set({ record: editingRecord })
    }
  } else {
    console.log(window.location.href)
  }
  if (window.location.href.includes('edit')) {
    console.log('maybe in edit1')
  }
}

setTimeout(() => {
  laterExecute()
}, 800)

onhashchange = () => {
  laterExecute()
}
