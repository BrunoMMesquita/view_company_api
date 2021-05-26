import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
var bcrypt = require('bcryptjs');

@Entity()
export class UserAdmin {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;

    @BeforeUpdate()
    @BeforeInsert()
    hashPassord() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}