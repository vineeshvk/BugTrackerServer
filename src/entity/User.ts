import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany
} from 'typeorm';
import { Bug } from './Bug';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	admin: boolean;

	@OneToMany(type => Bug, bug => bug.assignedTo)
	bugs: Bug[];
}
