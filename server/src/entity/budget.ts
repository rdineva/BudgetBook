import {
	Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Budget extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column('date')
	dateCreated: Date;

	@Column({ type: 'json'})
	content: JSON;

	@Column()
	type: string;

	@ManyToOne(() => User, user => user.budgets)
	user: User;
}
