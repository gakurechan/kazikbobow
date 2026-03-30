// "База пользователей"
const users = [
  { username: "admin", password: "1234" },
  { username: "hornet", password: "1111" }
];

// LOGIN
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  const found = users.find(x => x.username === u && x.password === p);

  if (!found) {
    alert("Wrong login");
    return;
  }

  localStorage.setItem("user", u);

  // стартовые данные
  if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", "100");
    localStorage.setItem("inventory", JSON.stringify([]));
  }

  window.location.href = "game.html";
}

// BALANCE
function getBalance() {
  return parseInt(localStorage.getItem("balance") || "0");
}

function setBalance(v) {
  localStorage.setItem("balance", v);
}

// ADD ITEM (admin)
function addItem(item) {
  let inv = JSON.parse(localStorage.getItem("inventory")) || [];
  inv.push(item);
  localStorage.setItem("inventory", JSON.stringify(inv));
}

// MATCH SIMULATION
function startMatch() {
  let result = document.getElementById("result");

  result.innerText = "Fighting...";

  setTimeout(() => {
    const win = Math.random() > 0.5;

    let bal = getBalance();

    if (win) {
      bal += 50;
      result.innerText = "YOU WIN +50 💰";
    } else {
      bal -= 30;
      result.innerText = "YOU LOSE -30 💀";
    }

    setBalance(bal);
  }, 2000);
}
