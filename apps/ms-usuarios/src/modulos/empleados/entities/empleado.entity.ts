import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('empleados')
export class Empleado {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({ name: 'usuario_id', type: 'uuid', unique: true })
    usuarioId: string; // FK REAL a Usuario.id (dentro de BD_Usuarios)

    @Column()
    nombre: string;

    @Column()
    turno: string; 

    @OneToOne(() => Usuario, (usuario) => usuario.empleado)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
}