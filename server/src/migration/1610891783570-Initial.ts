import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1610891783570 implements MigrationInterface {
    name = 'Initial1610891783570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "content" json NOT NULL, "currency" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "budget"`);
    }

}
