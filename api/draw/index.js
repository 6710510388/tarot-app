const fs=require("fs");
const path=require("path");

module.exports=async function(context,req){

  const mode=Number(req.query.mode||3);
  const topic=req.query.topic||"love";

  const file=path.join(__dirname,"../../frontend/tarot.json");
  const cards=JSON.parse(fs.readFileSync(file));

  let result=[];

  while(result.length<mode){
    let c=cards[Math.floor(Math.random()*cards.length)];
    if(!result.includes(c)){
      const reversed=Math.random()<0.5;
      result.push({
        name:c.name,
        image:c.image,
        reversed,
        meaning: reversed? "⚠️ "+c.meanings[topic] : c.meanings[topic]
      });
    }
  }

  context.res = {
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify({ cards: result })
  };
};
