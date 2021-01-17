import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1610875474190 implements MigrationInterface {
    name = 'Initial1610875474190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "content" json NOT NULL, "currency" character varying NOT NULL DEFAULT '', "userId" integer, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
