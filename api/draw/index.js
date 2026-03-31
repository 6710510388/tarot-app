// โครงสร้างไฟล์สำหรับ Azure Functions V3/V4 (Node.js)
// ไฟล์นี้ตั้งอยู่ที่: api/draw/index.js

// ฐานข้อมูลจำลอง (ในสเกลจริงสามารถใช้ JSON ไฟล์แยกหรือ CosmosDB ได้ แต่ใส่ในนี้เพื่อความ Lean สุดๆ)
const tarotDeck = [
    { 
        id: "ar00", 
        name: "The Fool", 
        image_url: "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg", 
        meanings: { 
            general: "การเริ่มต้นใหม่ การผจญภัยที่ไม่ได้คาดคิด ความเป็นอิสระ", 
            love: "ความสัมพันธ์ที่ตื่นเต้น ไม่ผูกมัด สนุกสนาน", 
            work: "โอกาสใหม่ที่ต้องกล้าเสี่ยง การริเริ่มโปรเจกต์ใหม่" 
        } 
    },
    { 
        id: "ar01", 
        name: "The Magician", 
        image_url: "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg", 
        meanings: { 
            general: "พลังในการเนรมิตสิ่งต่างๆ ความสามารถ ศักยภาพที่ซ่อนอยู่", 
            love: "มีเสน่ห์ดึงดูด การใช้คำพูดโน้มน้าวใจ", 
            work: "แก้ไขปัญหาเฉพาะหน้าได้ดี มีความสามารถรอบด้าน" 
        } 
    },
    { 
        id: "ar02", 
        name: "The High Priestess", 
        image_url: "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg", 
        meanings: { 
            general: "ลางสังหรณ์ ความลึกลับ ความรู้ที่ซ่อนเร้น", 
            love: "รักที่ไม่ได้เปิดเผย ความสัมพันธ์ที่ผูกพันลึกซึ้งทางวิญญาณ", 
            work: "ใช้สัญชาตญาณในการตัดสินใจ งานเบื้องหลัง" 
        } 
    },
    { 
        id: "ar03", 
        name: "The Empress", 
        image_url: "https://upload.wikimedia.org/wikipedia/en/c/c7/RWS_Tarot_03_Empress.jpg", 
        meanings: { 
            general: "ความอุดมสมบูรณ์ ความเป็นแม่ การดูแลเอาใจใส่", 
            love: "ความรักที่อบอุ่น ดูแลกันและกัน มีโอกาสตั้งครรภ์", 
            work: "ธุรกิจเจริญงอกงาม ผลตอบแทนที่น่าพอใจ" 
        } 
    },
    { 
        id: "ar10", 
        name: "Wheel of Fortune", 
        image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg", 
        meanings: { 
            general: "โชคชะตา การเปลี่ยนแปลงที่ไม่คาดคิด วัฏจักร", 
            love: "พรหมลิขิต การเปลี่ยนแปลงสถานะความสัมพันธ์", 
            work: "จังหวะและโอกาสทองกำลังมาถึง" 
        } 
    },
    { 
        id: "ar13", 
        name: "Death", 
        image_url: "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg", 
        meanings: { 
            general: "การสิ้นสุดเพื่อเริ่มต้นใหม่ การเปลี่ยนแปลงครั้งใหญ่", 
            love: "จบความสัมพันธ์ที่แย่ เพื่อเปิดรับคนใหม่", 
            work: "ลาออก ย้ายงาน หรือจบโปรเจกต์เดิม" 
        } 
    }
    // เพิ่มให้ครบ 78 ใบที่นี่...
];

module.exports = async function (context, req) {
    // 1. รับค่า Category (เผื่อใช้อนาคตเช่น เลือกหมวดความรัก)
    const category = (req.query.category || (req.body && req.body.category)) || 'all';

    // 2. Logic สุ่มไพ่ 1 ใบจาก Server (กันการโกงฝั่ง Client)
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    let selectedCard = { ...tarotDeck[randomIndex] };

    // 3. Logic สุ่มว่าไพ่กลับหัวหรือไม่ (Reversed) - ให้โอกาสกลับหัว 30%
    const isReversed = Math.random() > 0.7;
    selectedCard.isReversed = isReversed;

    // 4. การจัดการคำทำนายกรณีกลับหัว (สลับบริบทเล็กน้อยเพื่อความขลัง)
    if (isReversed) {
        // ในระบบจริงอาจจะมี Data แยกของ Reversed แต่เราใช้วิธีแนบ Prefix ให้ Frontend จัดการ หรือแก้ตรงนี้เลย
        selectedCard.meanings.general = "ข้อควรระวัง: " + selectedCard.meanings.general + " อาจจะมีความล่าช้า หรือถูกบล็อกพลังงาน";
    }

    // 5. ส่งค่ากลับพร้อม Set Headers รองรับ CORS
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            // Azure SWA จัดการ CORS ให้ระดับหนึ่ง แต่ระบุไว้ก็ปลอดภัย
            'Access-Control-Allow-Origin': '*' 
        },
        body: selectedCard
    };
};