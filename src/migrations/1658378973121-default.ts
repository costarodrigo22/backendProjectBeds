import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658378973121 implements MigrationInterface {
    name = 'default1658378973121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("id" integer NOT NULL, "name" text NOT NULL, "gender" text NOT NULL, "birth_date" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "address" text NOT NULL, "height" integer NOT NULL, "weight" integer NOT NULL, "allergy" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beds" ("id" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2212ae7113d85a70dc65983e742" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "beds"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
