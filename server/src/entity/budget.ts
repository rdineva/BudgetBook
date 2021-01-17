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

	@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
	dateCreated: Date;

	@Column({ type: 'json'})
	content: JSON;

	@Column({default: ''})
	currency: string;

	@ManyToOne(() => User, user => user.budgets)
	user: User;
}
