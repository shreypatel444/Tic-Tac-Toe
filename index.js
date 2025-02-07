let player;
do {
    player = prompt("Enter X or O").toUpperCase();
} while (player !== "X" && player !== "O");

let currentPlayer = player;
let arr = Array(9).fill(null);

const checkWinner = (elem) => {
  if (
    (arr[0] != null && arr[0] === arr[1] && arr[1] === arr[2]) ||
    (arr[3] != null && arr[3] === arr[4] && arr[4] === arr[5]) ||
    (arr[6] != null && arr[6] === arr[7] && arr[7] === arr[8]) ||
    (arr[0] != null && arr[0] === arr[3] && arr[3] === arr[6]) ||
    (arr[1] != null && arr[1] === arr[4] && arr[4] === arr[7]) ||
    (arr[2] != null && arr[2] === arr[5] && arr[5] === arr[8]) ||
    (arr[0] != null && arr[0] === arr[4] && arr[4] === arr[8]) ||
    (arr[2] != null && arr[2] === arr[4] && arr[4] === arr[6])
  ) {
    celebrateWin();
    showAlert(`Player ${currentPlayer} Wins! 🎉`, "Congratulations!", "success");
    setTimeout(resetGame, 2000);
  }

  if (!arr.some((e) => e === null)) {
    showAlert("It's a Draw!", "Nobody wins this round!", "info");
    setTimeout(resetGame, 2000);
  }
};

const handleCkick = (elem) => {
  let boxID = elem.id;
  // here already one value in ther box, you cannot change it.
  if (arr[boxID] !== null) return;
  arr[boxID] = currentPlayer;
  elem.innerText = currentPlayer;
  checkWinner(elem);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

function celebrateWin() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: "OK",
        timer: 2000,
        showConfirmButton: false,
        backdrop: `rgba(0, 0, 0, 0.7)`,
        toast: false,
    });
}

function resetGame() {
    arr.fill(null);
    document.querySelectorAll(".columns").forEach((box) => (box.innerText = ""));
    currentPlayer = "X";
  }