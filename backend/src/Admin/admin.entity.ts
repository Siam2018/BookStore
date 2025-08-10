import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity("admin")
export class AdminEntity {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 150 })
    fullName: string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    password: string;


    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}