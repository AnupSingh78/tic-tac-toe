let boxes = document.querySelectorAll(".box")
let reset = document.querySelector("#btn1")
let playagain = document.querySelector("#btn2")
let win = document.querySelector(".win")

const winPattern =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let turn = true
let cnt = 0

boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if(!box.disabled){
        if(turn){
            box.innerHTML = "X"
        }
        else{
            box.innerHTML = "O"
        }
        turn = !turn
        box.disabled = true
        box.style.backgroundColor = "rgba(234, 196, 53, 0.5)"
        cnt++
        checkWinner()
        if(cnt === 9 && !checkWinner()){
            gameDraw()
        }
      }
    })
})

const gameDraw = () => {
    win.innerText = "Game is Draw!"
    win.classList.remove("hide")
    disableBoxes()
}

const checkWinner = () => {
    for(let pattern of winPattern){
        let p1 = boxes[pattern[0]].innerText
        let p2 = boxes[pattern[1]].innerText
        let p3 = boxes[pattern[2]].innerText

        if (p1 != "" && p2 != "" && p3 != "") {
            if (p1 === p2 && p1 === p3) {
              showWinner(p1);
              return true;
            }
          }
    }
    return false;
}

const showWinner = (winner) => {
    if(winner === "X"){
        win.innerText = "Congratulations! Player1 Win"
    }
    else{
        win.innerText = "Congratulations! Player2 Win"
    }
    win.classList.remove("hide")
    disableBoxes()
}

const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText = ""
        box.style.backgroundColor = "#EAC435"
    }
}



reset.addEventListener("click", () => {
    turn = true
    cnt = 0
    enableBoxes()
    win.classList.add("hide")
})

playagain.addEventListener("click", () => {
    if(cnt === 9 || checkWinner()){
        turn = true
        cnt = 0
        enableBoxes()
        win.classList.add("hide")
    }
})

