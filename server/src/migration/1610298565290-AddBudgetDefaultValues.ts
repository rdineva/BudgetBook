import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBudgetDefaultValues1610298565290 implements MigrationInterface {
    name = 'AddBudgetDefaultValues1610298565290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "dateCreated"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "budget_type_enum" AS ENUM('template', 'budget entry')`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "type" "budget_type_enum" NOT NULL DEFAULT 'budget entry'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "budget_type_enum"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "dateCreated"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "dateCreated" date NOT NULL`);
    }

}
