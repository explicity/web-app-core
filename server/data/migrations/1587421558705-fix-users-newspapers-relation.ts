import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUsersNewspapersRelation1587421558705 implements MigrationInterface {
    name = 'fixUsersNewspapersRelation1587421558705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" DROP DEFAULT`, undefined);
    }

}
