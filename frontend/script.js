async function drawCards() {
  const res = await fetch("/api/draw");
  const data = await res.json();

  const container = document.getElementById("cards");
  container.innerHTML = "";

  data.cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${card.name}</h3>
      <p>${card.meaning}</p>
    `;

    container.appendChild(div);
  });
}
