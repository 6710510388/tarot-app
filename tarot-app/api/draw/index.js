module.exports = async function (context, req) {
  const cards = [
    "The Fool",
    "The Magician",
    "The High Priestess"
  ];

  const random = cards[Math.floor(Math.random() * cards.length)];

  context.res = {
    body: {
      name: random
    }
  };
};