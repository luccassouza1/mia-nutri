let currentUser;

document.getElementById("loginBtn").onclick = () => {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "lizabel.oliveira" && p === "liza1@") {
    currentUser = u;
    showApp();
  } else {
    alert("Usuário ou senha inválidos");
  }
};

function showApp() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  loadChart();
}

document.getElementById("saveBtn").onclick = () => {
  const chk = {};
  document.querySelectorAll("#daily-plan input[type=checkbox]").forEach(cb => {
    chk[cb.dataset.meal] = cb.checked;
  });
  const notes = document.getElementById("notes").value;
  const data = { date: new Date().toLocaleDateString(), chk, notes };
  const history = JSON.parse(localStorage.getItem(currentUser) || "[]");
  history.push(data);
  localStorage.setItem(currentUser, JSON.stringify(history));
  alert("Plano salvo!");
  loadChart();
};

function loadChart() {
  const history = JSON.parse(localStorage.getItem(currentUser) || "[]");
  const labels = history.map(h => h.date);
  const scores = history.map(h => Object.values(h.chk).filter(v => v).length);
  const ctx = document.getElementById("progressChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: { labels, datasets: [{ label: "Refeições Cumpridas", data: scores, backgroundColor: "rgba(9,151,154,0.5)", borderColor: "#059b9a", fill: true }] },
    options: { scales: { y: { beginAtZero: true, max: 3 } } }
  });
}
