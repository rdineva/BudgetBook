import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCurrency1610824323344 implements MigrationInterface {
    name = 'AddCurrency1610824323344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" RENAME COLUMN "type" TO "currency"`);
        await queryRunner.query(`ALTER TYPE "public"."budget_type_enum" RENAME TO "budget_currency_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "budget"."dateCreated" IS NULL`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "currency" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "currency" "budget_currency_enum" NOT NULL DEFAULT 'budget entry'`);
        await queryRunner.query(`COMMENT ON COLUMN "budget"."dateCreated" IS NULL`);
        await queryRunner.query(`ALTER TYPE "budget_currency_enum" RENAME TO "budget_type_enum"`);
        await queryRunner.query(`ALTER TABLE "budget" RENAME COLUMN "currency" TO "type"`);
    }

}
