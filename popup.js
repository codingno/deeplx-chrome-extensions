console.log("This is a popup!")

const input = document.getElementById("input")
const output = document.getElementById("output")
const url = document.getElementById("url")
const source = document.getElementById("source")
const target = document.getElementById("target")

get(input)
get(output)
get(url)
get(source)
get(target)

function set(dom) {
  return localStorage.setItem(dom.id, dom.value)
}

function get(dom) {
  const data = localStorage.getItem(dom.id)
  if (data)
    dom.value = data
}

async function getPosts() {

  set(input)
  set(output)
  set(url)
  set(source)
  set(target)

  let URL = ""
  if (!url.value || url.value == "")
    URL = "http://localhost:1188/v2/translate"
  else
    URL = url.value

  try {
    console.log(input.value)
    let body = {
      "target_lang" : target.value || "ID",
    }

    if (URL.includes('v2'))
      body.text = [input.value] 
    else {
      body.text = input.value
      body.source_lang = source.value || "EN"
    }


    const options = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(URL, options)
    const json = await res.json()
    if (json.translations)
      output.value = json?.translations[0]?.text
    else if (json.data)
      output.value = json.data
    set(output)
  } catch (error) {
    alert(error.toString())
  }
} 

document.getElementById("click").addEventListener("click", getPosts)
