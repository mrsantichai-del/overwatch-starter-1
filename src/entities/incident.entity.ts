import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Incident {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column()
    type: string;

    @Column()
    priority: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'float', nullable: true })
    lat: number;

    @Column({ type: 'float', nullable: true })
    lng: number;
}
