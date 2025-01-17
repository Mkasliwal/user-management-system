import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 255, nullable: false})
    name: string

    @Column({ type: "varchar", length: 20, nullable: false, unique: true})
    mobile: string

    @Column({ type: "varchar", length: 255, nullable: false})
    password: string

    @Column({ type: "boolean", nullable: false, default: false})
    status: boolean

    @Column({ type: 'timestamp', default: null})
    last_login: Date

    @Column({ type: "varchar", length: 45, default: null})
    ip_address: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date
}