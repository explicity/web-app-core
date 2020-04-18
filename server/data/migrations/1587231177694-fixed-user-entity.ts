import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedUserEntity1587231177694 implements MigrationInterface {
    name = 'fixedUserEntity1587231177694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL`, undefined);
    }

}
