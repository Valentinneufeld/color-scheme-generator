let colorArr = []
let colorContainer = document.querySelector('.color-container')
const colorPicker = document.querySelector('.color-picker')
const schemePicker = document.querySelector('.scheme-choice')
let colorChoice = ''
let schemeChoice = ''

render()

function render() {
    colorChoice = getColorFromPicker()
    schemeChoice = getScheme()
    fetchColors()
}


document.querySelector('.get-btn').addEventListener('click', () => {
    initDOM()
    render()
})


function fetchColors(){    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChoice}&mode=${schemeChoice}&count=5`)
                      .then(response => response.json())
                      .then(data => {
                          colorArr = getColorArray(data.colors)
                          colorContainer.innerHTML = getColorHtml(colorArr)
                        })                
}




function getScheme() {
    const scheme = schemePicker.value
    console.log(scheme)
    return scheme
    
}


function getColorHtml(colorArr) {
    let html = ''
    for (const color of colorArr) {
        html += `
            <div class="color">
                <div class="color-background" style="background-color: #${color}"></div>
                <div class="color-number">#${color}</div>
            </div>`
    }
    return html
}

function getColorArray(colorObject) {
    const arr = []
    for (const color of colorObject) {
        arr.push(color.hex.clean)    
    }
    return arr 
}


function initDOM() {
    colorContainer.innerHTML = ``
    colorArr.innerHTML = []
}

function getColorFromPicker() {
    let colorValue = colorPicker.value
    colorValue = removeFirstCharacter(colorValue)
    return colorValue
}

function removeFirstCharacter(stringInput) {
    const string = stringInput.substring(1)
    return string
}