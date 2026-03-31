async function drawCard() {
  const res = await fetch("/api/draw");
  const data = await res.json();

  document.getElementById("result").innerText = data.name;
}