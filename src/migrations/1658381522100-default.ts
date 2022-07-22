import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658381522100 implements MigrationInterface {
    name = 'default1658381522100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "patients_id_seq" OWNED BY "patients"."id"`);
        await queryRunner.query(`ALTER TABLE "patients" ALTER COLUMN "id" SET DEFAULT nextval('"patients_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "beds_id_seq" OWNED BY "beds"."id"`);
        await queryRunner.query(`ALTER TABLE "beds" ALTER COLUMN "id" SET DEFAULT nextval('"beds_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beds" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "beds_id_seq"`);
        await queryRunner.query(`ALTER TABLE "patients" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "patients_id_seq"`);
    }

}
