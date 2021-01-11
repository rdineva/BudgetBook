import {
	Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,
} from 'typeorm';
import { User } from './user';

export enum BudgetType {
    TEMPLATE = "template",
    BUDGET_ENTRY = "budget entry",
}

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

	@Column({
        type: "enum",
        enum: BudgetType,
        default: BudgetType.BUDGET_ENTRY
    })
	type: BudgetType;

	@ManyToOne(() => User, user => user.budgets)
	user: User;
}
