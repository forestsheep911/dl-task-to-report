/* eslint-disable no-console */

const params = {
  app: kintone.app.getId(),
}

async function getFields() {
  const rs = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params)
  return rs
}

async function mainWork() {
  const objFields = await getFields()
  const eleCommonLabels = document.querySelectorAll('.control-label-gaia, .group-label-gaia, .subtable-label-gaia')
  console.log(eleCommonLabels)
  for (let i = 0; i < eleCommonLabels.length; i += 1) {
    // console.log(eleCommonLabels[i].innerText)
    eleCommonLabels[i].onmouseover = () => {
      const eleFieldCode = document.createElement('span')
      eleFieldCode.style.marginLeft = '20px'
      // console.log(eleCommonLabels[i])
      Object.keys(objFields.properties).forEach((key) => {
        if (eleCommonLabels[i].innerText === objFields.properties[key].label) {
          console.log(objFields.properties[key])
          const textnodeFieldCodeContent = document.createElement('span')
          textnodeFieldCodeContent.innerText = objFields.properties[key].code
          textnodeFieldCodeContent.style.marginLeft = '20px'
          eleFieldCode.appendChild(textnodeFieldCodeContent)
        }
      })
      eleCommonLabels[i].appendChild(eleFieldCode)
    }
    eleCommonLabels[i].onmouseout = () => {
      for (let j = 1; j < eleCommonLabels[i].childNodes.length; j += 1) {
        eleCommonLabels[i].childNodes[j].remove()
      }
    }
  }
}

mainWork()
