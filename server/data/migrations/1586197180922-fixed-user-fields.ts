import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedUserFields1586197180922 implements MigrationInterface {
    name = 'fixedUserFields1586197180922'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "login" TO "username"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" TO "UQ_fe0bb3f6520ee0469504521e710"`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "imageLink" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" TO "UQ_2d443082eccd5198f95f2a36e2c"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "login"`, undefined);
    }

}
