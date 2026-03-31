module.exports = async function (context, req) {
  const meanings = {
    "The Fool": "เริ่มต้นใหม่",
    "The Magician": "พลังและความสามารถ"
  };

  const card = req.query.card;

  context.res = {
    body: {
      meaning: meanings[card] || "ไม่พบคำทำนาย"
    }
  };
};