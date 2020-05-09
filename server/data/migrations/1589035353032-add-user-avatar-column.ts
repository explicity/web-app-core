import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserAvatarColumn1589035353032 implements MigrationInterface {
    name = 'addUserAvatarColumn1589035353032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "logoImageLink" TO "avatarImageLink"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatarImageLink" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatarImageLink" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "avatarImageLink" TO "logoImageLink"`, undefined);
    }

}
