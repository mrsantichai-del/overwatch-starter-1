const realScenarios = [
    {
        name: "แยกอโศก-เพชรบุรี",
        text: "รายงาน: การจราจรติดขัดรุนแรงและพบอุบัติเหตุรถเฉี่ยวชน",
        lat: 13.7476,
        lng: 100.5630
    },
    {
        name: "ห้าแยกลาดพร้าว",
        text: "รายงาน: ปริมาณรถหนาแน่นสูงและพบอุบัติเหตุซ้ำซ้อน",
        lat: 13.8166,
        lng: 100.5658
    },
    {
        name: "แยกพระราม 9",
        text: "รายงาน: การจราจรติดขัดขัดขวางเส้นทางย่านธุรกิจ",
        lat: 13.7578,
        lng: 100.5650
    },
    {
        name: "แยกสาทร-สุรศักดิ์",
        text: "รายงาน: อุบัติเหตุรถชนบนทางเชื่อมฝั่งธนบุรี",
        lat: 13.7228,
        lng: 100.5186
    },
    {
        name: "แยกประตูน้ำ",
        text: "รายงาน: ความหนาแน่นของรถยนต์และคนเดินเท้าเสี่ยงอุบัติเหตุ",
        lat: 13.7547,
        lng: 100.5391
    }
];

async function sendTacticalIncident() {
    const scenario = realScenarios[Math.floor(Math.random() * realScenarios.length)];

    console.log('\x1b[36m%s\x1b[0m', '----------------------------------------');
    console.log('\x1b[35m%s\x1b[0m', `[REAL-WORLD SYNC] ${scenario.name}`);
    console.log(`[DATA] ${scenario.text}`);
    console.log(`[POS] Lat: ${scenario.lat} | Lng: ${scenario.lng}`);

    try {
        const response = await fetch('http://localhost:3000/incidents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: scenario.text,
                lat: scenario.lat,
                lng: scenario.lng
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('\x1b[32m%s\x1b[0m', `[SUCCESS] Incident Anchor Activated! (ID: ${data.id})`);
            console.log(`[SYSTEM] Type: ${data.type} | Priority: ${data.priority}`);
        } else {
            console.log('\x1b[31m%s\x1b[0m', `[FAILED] HTTP Error: ${response.status}`);
        }
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `[ERROR] Connection refused. Is the server running?`);
    }
}

console.log('\x1b[45m\x1b[37m%s\x1b[0m', ' REALITY ANCHORING SIMULATION ACTIVE ');
console.log('Broadcasting real-world dangerous intersection data every 5s...');

// Initial run
sendTacticalIncident();

// Interval run
setInterval(sendTacticalIncident, 5000);
