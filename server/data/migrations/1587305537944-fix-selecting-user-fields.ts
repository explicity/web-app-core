import {MigrationInterface, QueryRunner} from "typeorm";

export class fixSelectingUserFields1587305537944 implements MigrationInterface {
    name = 'fixSelectingUserFields1587305537944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" DROP DEFAULT`, undefined);
    }

}
