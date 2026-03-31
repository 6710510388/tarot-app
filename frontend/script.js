// 💾 Save History
function saveHistory(cards){
  let h = JSON.parse(localStorage.getItem("tarot")) || [];
  h.unshift(cards);
  localStorage.setItem("tarot", JSON.stringify(h));
}

// 📜 Load History
function loadHistory(){
  let h = JSON.parse(localStorage.getItem("tarot")) || [];
  document.getElementById("history").innerHTML =
    h.map(set => `<p>${set.map(c=>c.name).join(", ")}</p>`).join("");
}

// 🧠 Explain (A+ logic)
function explain(cards){
  return `🔮 ไพ่ทั้งสามใบบอกว่า:
อดีต (${cards[0].name}) ส่งผลต่อปัจจุบัน (${cards[1].name})
และกำลังนำไปสู่อนาคต (${cards[2].name})`;
}

// 🎴 Draw Cards (รวม Loading + Error)
async function drawCards(){

  const loadingEl = document.getElementById("loading");

  try {
    // 🔄 Loading UX
    loadingEl.innerHTML = "🔮 กำลังสับไพ่...";
    loadingEl.classList.add("loader");

    navigator.vibrate?.(100);

    const mode = document.getElementById("mode").value;
    const topic = document.getElementById("topic").value;

    const res = await fetch(`/api/draw?mode=${mode}&topic=${topic}`);

    if(!res.ok){
      throw new Error("API error");
    }

    const data = await res.json();

    // 🔊 เสียง
    document.getElementById("flipSound").play();

    // 🧹 Clear loading
    loadingEl.innerHTML = "";
    loadingEl.classList.remove("loader");

    const container = document.getElementById("cards");
    container.innerHTML = "";

    const labels = ["อดีต","ปัจจุบัน","อนาคต"];

    data.cards.forEach((card,i)=>{
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <div class="inner">
          <div class="front"></div>
          <div class="back">
            <img src="${card.image}" class="${card.reversed ? "reversed":""}">
          </div>
        </div>
        <p><b>${labels[i] || ""}</b></p>
        <p>${card.name}</p>
        <p>${card.meaning}</p>
      `;

      container.appendChild(div);

      // 🎴 Flip animation ทีละใบ
      setTimeout(()=>{
        div.querySelector(".inner").classList.add("flip");
      }, i * 500);
    });

    // 💾 Save + Load history
    saveHistory(data.cards);
    loadHistory();

    // 🧠 Explain (ตัวทำคะแนน A+)
    alert(explain(data.cards));

  } catch (err) {

    console.error(err);

    loadingEl.innerHTML = "";
    loadingEl.classList.remove("loader");

    // ❗ Error handling
    alert("❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");

  }
}

// 📜 โหลด history ตอนเปิดเว็บ
loadHistory();

// 📦 PWA
if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js');
}