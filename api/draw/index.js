const tarotDeck = [
    { 
        id: "01", 
        name: "The Magician", 
        type: "Major Arcana",
        img: "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
        general: "พลังแห่งการเริ่มต้น สิ่งที่คุณคิดสามารถเนรมิตให้เป็นจริงได้ด้วยความสามารถของคุณเอง", 
        love: "คนโสดมีเสน่ห์ดึงดูด คนมีคู่สามารถจัดการความสัมพันธ์ได้อย่างดีเยี่ยม", 
        work: "ความสำเร็จจากไหวพริบและทักษะเฉพาะตัว การเจรจาต่อรองจะสำเร็จลุล่วง"
    },
    { 
        id: "06", 
        name: "The Lovers", 
        type: "Major Arcana",
        img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
        general: "การตัดสินใจครั้งสำคัญที่ใช้หัวใจนำทาง ความสามัคคีและการร่วมมือ", 
        love: "ความรักที่โรแมนติกและสมบูรณ์แบบ การพบเจอคู่แท้หรือคนที่ศีลเสมอกัน", 
        work: "การเป็นหุ้นส่วนที่ดี การทำงานเป็นทีมจะนำมาซึ่งผลลัพธ์ที่น่าประทับใจ"
    },
    { 
        id: "19", 
        name: "The Sun", 
        type: "Major Arcana",
        img: "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg",
        general: "แสงสว่างแห่งความหวัง ความสุข ความสำเร็จ และความรุ่งโรจน์ในทุกๆ ด้าน", 
        love: "ความสัมพันธ์ที่ชัดเจน อบอุ่น และเปิดเผย มีโอกาสพัฒนาไปในทิศทางที่ดีมาก", 
        work: "ผลงานโดดเด่นเป็นที่ยอมรับ ปัญหาทุกอย่างจะคลี่คลายและสว่างไสว"
    }
];

module.exports = async function (context, req) {
    const zodiac = req.query.zodiac || "Unknown";
    
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    let card = { ...tarotDeck[randomIndex] };

    let energyScore = Math.floor(Math.random() * 30) + 70;

    context.res = {
        status: 200,
        headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
        },
        body: { 
            ...card, 
            score: energyScore,
            userZodiac: zodiac
        }
    };
};