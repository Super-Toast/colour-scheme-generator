const btnGenerate = document.getElementById("btn-generate")
const colorModeSelector = document.getElementById("color-mode-selector")
let firstTime = true
let mode = ""

function generateColors() {
    if(firstTime) {
       mode = "monochrome" 
    } else {
        mode = colorModeSelector.value
    }
    let colorModes = ""
    let colorValues = ""
    const colorsNumber = document.getElementById("colors-number").value
    const colorSelector = document.getElementById("color-selector").value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSelector}&mode=${mode}&count=${colorsNumber}`)
    .then(res => res.json())
    .then(data => {
        let colors = ""
        const colorArr = data.colors
        for(const color of colorArr) {
            colors += `<div id="${color.hex.value}" class="color"></div>`
            colorValues += `<p>${color.hex.value}</p>`
        }
        document.getElementById("colors-values").innerHTML = colorValues
        document.getElementById("colors-generated").innerHTML = colors
        for(const color of colorArr) {
            document.getElementById(`${color.hex.value}`).style.background = color.hex.value
        }
        if(firstTime) {
            const types = data._links.schemes
            const typesProperties = Object.getOwnPropertyNames(types)
            for(const property of typesProperties) {
                colorModes += `<option value="${property}">${property}</option>`
            }
            colorModeSelector.innerHTML = colorModes
            document.getElementById("colors-number").addEventListener("change", function(e) {
                e.preventDefault()
                generateColors()
            })
            document.getElementById("color-selector").addEventListener("change", function(e) {
                e.preventDefault()
                generateColors()
            })
            document.getElementById("colors-container").style.display = "flex"
            btnGenerate.style.display = "none"
            firstTime = false
        }
        colorModeSelector.style.display = "block"      
    })
}

btnGenerate.addEventListener("click", function(e) {
    e.preventDefault()
    generateColors()
})

colorModeSelector.addEventListener("change", function(e) {
    e.preventDefault()
    generateColors()
})