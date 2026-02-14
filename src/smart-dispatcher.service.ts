import { Injectable } from '@nestjs/common';

@Injectable()
export class SmartDispatcherService {
    /**
     * วิเคราะห์และตัดสินใจเลือกโรงพยาบาลที่เหมาะสมที่สุดสำหรับผู้ป่วย
     * โดยใช้หลักการทางการแพทย์และการกู้ภัย (EMS Reasoning)
     */
    findBestHospital(patient: { severity: 'CRITICAL' | 'NORMAL' }, hospitals: { name: string, distance: number, isFull: boolean }[]) {
        console.log(`[UI-AGENT] Analyzing dispatch for ${patient.severity} case...`);

        if (patient.severity === 'CRITICAL') {
            // Logic สำหรับเคสวิกฤต: เน้นความพร้อม (Capacity) มากกว่าระยะทาง
            // เพราะการไปถึงที่ใกล้แต่รักษาไม่ได้ = เสียเวลาที่มีค่าที่สุดไปฟรีๆ
            const availableHospitals = hospitals.filter(h => !h.isFull);

            if (availableHospitals.length === 0) {
                return {
                    selected: hospitals.sort((a, b) => a.distance - b.distance)[0],
                    reasoning: "⚠️ วิกฤต: ทุกโรงพยาบาลเตียงเต็ม จำเป็นต้องเลือกที่ใกล้ที่สุดเพื่อประคับประคองอาการเบื้องต้น (Stabilization)"
                };
            }

            // เลือกที่ใกล้ที่สุดในกลุ่มที่ 'มีเตียง'
            const bestHospital = availableHospitals.sort((a, b) => a.distance - b.distance)[0];

            return {
                selected: bestHospital,
                reasoning: `✅ การตัดสินใจ: เลือก ${bestHospital.name} แม้อาจจะไกลกว่าบางที่ แต่เนื่องจากเป็นเคสวิกฤต ความพร้อมของเตียงและทีมแพทย์ (Definitive Care) สำคัญกว่าระยะทาง เพื่อเลี่ยงการเสียเวลาจากการย้ายโรงพยาบาลซ้ำซ้อน (Secondary Transfer)`
            };
        } else {
            // Logic สำหรับเคสปกติ: เน้นความสะดวกและระยะทาง
            const bestHospital = hospitals.sort((a, b) => a.distance - b.distance)[0];
            return {
                selected: bestHospital,
                reasoning: "ℹ️ การตัดสินใจ: เลือกโรงพยาบาลที่ใกล้ที่สุดตามมาตรฐานการขนส่งผู้ป่วยทั่วไป"
            };
        }
    }
}
