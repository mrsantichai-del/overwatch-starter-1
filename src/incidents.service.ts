import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { EventsGateway } from './events.gateway';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentsRepository: Repository<Incident>,
    private eventsGateway: EventsGateway,
  ) { }

  async create(createIncidentDto: CreateIncidentDto) {
    const { text, lat, lng } = createIncidentDto;
    const { type, priority } = this.analyzeThreat(text);

    const incident = this.incidentsRepository.create({
      text,
      type,
      priority,
      lat,
      lng,
    });

    const savedIncident = await this.incidentsRepository.save(incident);
    this.eventsGateway.emitNewIncident(savedIncident);
    return savedIncident;
  }

  analyzeThreat(text: string): { type: string, priority: string } {
    if (!text) return { type: 'UNCLEAR', priority: 'LOW' };

    const highKeywords = ['ไฟ', 'เพลิง', 'ไหม้', 'ระเบิด', 'ชน', 'ตาย', 'ศพ', 'อาวุธ', 'ปล้น'];
    const lowKeywords = ['รถติด', 'น้ำท่วม', 'ฝนตก', 'ขยะ', 'เสียงดัง'];

    const containsHigh = highKeywords.some(keyword => text.includes(keyword));
    const containsLow = lowKeywords.some(keyword => text.includes(keyword));

    if (containsHigh) {
      return { type: 'ACCIDENT', priority: 'HIGH' };
    } else if (containsLow) {
      return { type: 'GENERAL', priority: 'LOW' };
    }

    return { type: 'UNCLEAR', priority: 'LOW' };
  }

  findAll() {
    return `This action returns all incidents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incident`;
  }

  update(id: number, updateIncidentDto: UpdateIncidentDto) {
    return `This action updates a #${id} incident`;
  }

  remove(id: number) {
    return `This action removes a #${id} incident`;
  }
}
