module.exports = async function (context, req) {
  const cards = [
    { name: "The Fool", meaning: "การเริ่มต้นใหม่ โอกาสใหม่กำลังมา" },
    { name: "The Magician", meaning: "คุณมีพลังและความสามารถในมือ" },
    { name: "The High Priestess", meaning: "เชื่อสัญชาตญาณของตัวเอง" },
    { name: "The Empress", meaning: "ความอุดมสมบูรณ์ ความรัก" },
    { name: "The Emperor", meaning: "ความมั่นคง การควบคุม" }
  ];

  // สุ่ม 3 ใบ
  let selected = [];
  while (selected.length < 3) {
    let rand = cards[Math.floor(Math.random() * cards.length)];
    if (!selected.includes(rand)) {
      selected.push(rand);
    }
  }

  context.res = {
    body: {
      cards: selected
    }
  };
};
