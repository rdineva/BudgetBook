import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"; 
import { Budget } from "./budget";

@Entity() 
export class User { 
   
   @PrimaryGeneratedColumn() 
   id: string; 
   
   @Column() 
   firstName: string; 
   
   @Column() 
   lastName: string; 
   
   @Column()
   username: string;

   @Column()
   password: string;
   
   @OneToMany(() => Budget, budget => budget.user)
   budgets: Budget[];
}