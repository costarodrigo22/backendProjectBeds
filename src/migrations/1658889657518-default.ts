import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658889657518 implements MigrationInterface {
    name = 'default1658889657518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beds" ADD "name_patient" text`);
        await queryRunner.query(`ALTER TABLE "beds" ADD "document" text`);
        await queryRunner.query(`ALTER TABLE "beds" ADD "allergy" text`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "document" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "document"`);
        await queryRunner.query(`ALTER TABLE "beds" DROP COLUMN "allergy"`);
        await queryRunner.query(`ALTER TABLE "beds" DROP COLUMN "document"`);
        await queryRunner.query(`ALTER TABLE "beds" DROP COLUMN "name_patient"`);
    }

}
