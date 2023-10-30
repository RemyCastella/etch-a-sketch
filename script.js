let body = document.querySelector("body")
let canvas = document.querySelector(".canvas")

//Initial canvas settings
let size = 16
let color = "black"
let pixels //global placeholder for the pixels

//Make canvas active only when mouse is down
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//Setting up the canvas
function setup(size){
    const pixelArray = []

    for (let i = 1; i <= (size*size); i++){
        let pixels = document.createElement("div");
        pixels.classList.add("pixel");
        canvas.appendChild(pixels);
        pixels.style.height = `calc(100% / ${size})`;
        pixels.style.width = `calc(100% / ${size})`;
        pixels.style.backgroundColor = "white"
        pixelArray.push(pixels)
    }

    return pixelArray
}

pixels = setup(size)
activate() //adds event listener to each pixel

function activate(){
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseover", (e) => {
            if (e.type === 'mouseover' && !mouseDown) return
            if (color === "random"){
                pixel.style.backgroundColor = randomBg()
            } else {
                pixel.style.backgroundColor = color;
            }
        })
    })
}

//Clearing the canvas
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", clearCanvas)
function clearCanvas() {
    canvas.innerHTML = ""
    pixels = setup(size)
    activate()
}

//Changing grid size
let sizeBtn = document.querySelector(".size")
sizeBtn.addEventListener("click", (e) =>{
    size = prompt("Enter grid size (1 to 100)")
    size = parseInt(size)
    console.log(size)
    while (isNaN(size) || size > 100) {
        alert("Please enter a number between 1 and 100")
        size = prompt("Enter grid size (1 to 100)")
    }

    //Initialize pixels
    pixels.forEach((pixel) => {
        pixel.remove()
    })

    //Generate new canvas
    pixels = setup(size)
    activate()
})


//Choosing a random color
function randomBg() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return "rgb(" + r + "," + g + "," + b + ")"
}

//Selector buttons for different colors
let btns = document.querySelector(".btns")
btns.addEventListener("change", selectColor)
function selectColor (e) {
    if (e.target.value == "erase") color = "white"
    else color = e.target.value
}