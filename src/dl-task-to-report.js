// ==UserScript==
// @name         CybozuDL组内用Task快填日报工数
// @namespace    https://github.com/forestsheep911/dl-task-to-report
// @version      0.0.2
// @description  填写日报工数时，常常需要引用task记录，每次都要去找，复制内容等非常反人性。现在此工具在task编号旁边加上一个按钮，解决任务填入日报问题。
// @author       Bxu
// @match        https://bozuman.cybozu.com/k/20565/show*
// @match        https://bozuman.cybozu.com/k/46878/*
// @match        https://bozuman.s.cybozu.com/k/20565/show*
// @match        https://bozuman.s.cybozu.com/k/46878/*
// @icon         https://img.icons8.com/dusk/64/000000/copy.png
// @grant        GM_openInTab
// @grant        GM_info
// @grant        GM_addStyle
// ==/UserScript==

;(function () {
  GM_addStyle(`.container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align:center;
    min-height: 100vh;

  }

  .btn {
    font-family: 'Otomanopee One', sans-serif;
    border: none;
    color: white;
    background-color: rgb(255, 0, 68);
    border-radius: 4px;
    box-shadow: inset 0 0 0 0 #f9e506;
    transition: ease-out 0.3s;
    outline: none;
    cursor: pointer;
  }`)
  function laterExecute() {
    if (window.location.pathname.startsWith('/k/20565/show') && !window.location.hash.includes('edit')) {
      const stringPassRecordKey = kintone.app.record.get().record.record_key.value
      const stringPassTitle = kintone.app.record.get().record.title.value
      const eleCopyRecordKeyButton = document.createElement('BUTTON')
      eleCopyRecordKeyButton.innerText = '用此Task填写工数'
      // eleCopyRecordKeyButton.style.backgroundColor = '#F78448'
      // eleCopyRecordKeyButton.style.color = '#EEEEEE'
      // eleCopyRecordKeyButton.style.borderColor = '#AAAAAA'
      eleCopyRecordKeyButton.setAttribute('class', 'btn')
      eleCopyRecordKeyButton.style.position = 'relative'
      eleCopyRecordKeyButton.style.left = '12px'
      const eleRecordKey = kintone.app.record.getFieldElement('record_key')
      eleCopyRecordKeyButton.onclick = () => {
        GM_openInTab(`${window.location.origin}/k/46878/edit`, { active: true })
        const bc = new BroadcastChannel(GM_info.script.uuid)
        setTimeout(() => {
          bc.postMessage({ refKey: stringPassRecordKey, content: stringPassTitle })
        }, 3000)
      }
      eleRecordKey.appendChild(eleCopyRecordKeyButton)
    }
    if (window.location.pathname.startsWith('/k/46878/edit')) {
      const bc = new BroadcastChannel(GM_info.script.uuid)
      bc.onmessage = (ev) => {
        const editingRecord = kintone.app.record.get().record
        // console.log(editingRecord)
        editingRecord.subtable.value[0].value.pj_name.value = ev.data.refKey
        editingRecord.subtable.value[0].value.pj_content.value = ev.data.content
        editingRecord.subtable.value[0].value.type.value = '项目常规'
        editingRecord.subtable.value[0].value.hour.value = 8
        kintone.app.record.set({ record: editingRecord })
      }
    }
  }
  setTimeout(() => {
    laterExecute()
  }, 800)

  onhashchange = () => {
    laterExecute()
  }
})()
