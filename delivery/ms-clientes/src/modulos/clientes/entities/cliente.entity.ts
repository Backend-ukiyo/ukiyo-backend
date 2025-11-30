import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string; // PK UUID (Identificador que usarán otros servicios)

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'telefono', nullable: true })
    telefono: string;
}