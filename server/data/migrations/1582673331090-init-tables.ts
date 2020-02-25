import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1582673331090 implements MigrationInterface {
    name = 'initTables1582673331090'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "article_reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLiked" boolean NOT NULL DEFAULT false, "articleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_c73d1aec06b48d4de2f99425cf1" UNIQUE ("userId", "articleId"), CONSTRAINT "PK_1e233223c5b3ca86885a69cfbd9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_62817c7227130f4398f8f668d0" ON "article_reactions" ("isLiked") `, undefined);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "roles_role_enum" AS ENUM('User', 'Admin')`, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "description" text, "role" "roles_role_enum" NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" text NOT NULL, "lastName" text NOT NULL, "login" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "roleId" integer, CONSTRAINT "REL_368e146b785b574f42ae9e53d5" UNIQUE ("roleId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5372672fbfd1677205e0ce3ece" ON "users" ("firstName") `, undefined);
        await queryRunner.query(`CREATE TABLE "newspapers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, CONSTRAINT "PK_617c33c3772b6f187161277b6f9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1bd94cbaf1a96e70312897b6e4" ON "newspapers" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "keyword" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bbde41d42d0cbda1fd4eb24420" ON "tags" ("keyword") `, undefined);
        await queryRunner.query(`CREATE TYPE "articles_genre_enum" AS ENUM('Beauty', 'School', 'Science')`, undefined);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" text NOT NULL, "subtitle" text, "body" text NOT NULL, "publicationDate" date NOT NULL, "genre" "articles_genre_enum" NOT NULL, "imageLink" text, "authorId" uuid, "newspaperId" uuid, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3c28437db9b5137136e1f6d609" ON "articles" ("title") `, undefined);
        await queryRunner.query(`CREATE TABLE "annotations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" text NOT NULL, "body" text, CONSTRAINT "PK_d5b59b40ef7ee54b4309c2e89b2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2107b249bdb54f4314267a9bd7" ON "annotations" ("title") `, undefined);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "articleId" uuid NOT NULL, "userId" uuid NOT NULL, "body" text NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b0011304ebfcb97f597eae6c31" ON "comments" ("articleId") `, undefined);
        await queryRunner.query(`CREATE TABLE "permissions_to_roles" ("rolesId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_a53f70181b004198caf3ba34c98" PRIMARY KEY ("rolesId", "permissionsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c1c358ed732dc83839ca98a770" ON "permissions_to_roles" ("rolesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_671ed5cde3611a2ca9d638caf7" ON "permissions_to_roles" ("permissionsId") `, undefined);
        await queryRunner.query(`CREATE TABLE "users_to_newspapers" ("newspapersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_7272c3f8a1bf940d7818184e519" PRIMARY KEY ("newspapersId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_633dce7a574446607c14b63592" ON "users_to_newspapers" ("newspapersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8649518f0e9cdd9d79d4007691" ON "users_to_newspapers" ("usersId") `, undefined);
        await queryRunner.query(`CREATE TABLE "tags_to_articles" ("articlesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_5f4eb6a9f584f04f8d24c9551f5" PRIMARY KEY ("articlesId", "tagsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9cee50ba142c1c8b1c622323cb" ON "tags_to_articles" ("articlesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_737f2ec186085f5eff3b1fa948" ON "tags_to_articles" ("tagsId") `, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" ADD CONSTRAINT "FK_4adb4808cbe21bd8b2e878031d8" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" ADD CONSTRAINT "FK_a86dc904885bd3312cf039c6f54" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_2f89a0704857d167b13e55caf39" FOREIGN KEY ("newspaperId") REFERENCES "newspapers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "FK_c1c358ed732dc83839ca98a7707" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "FK_671ed5cde3611a2ca9d638caf77" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" ADD CONSTRAINT "FK_633dce7a574446607c14b635928" FOREIGN KEY ("newspapersId") REFERENCES "newspapers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" ADD CONSTRAINT "FK_8649518f0e9cdd9d79d4007691b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_to_articles" ADD CONSTRAINT "FK_9cee50ba142c1c8b1c622323cb7" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_to_articles" ADD CONSTRAINT "FK_737f2ec186085f5eff3b1fa948b" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tags_to_articles" DROP CONSTRAINT "FK_737f2ec186085f5eff3b1fa948b"`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_to_articles" DROP CONSTRAINT "FK_9cee50ba142c1c8b1c622323cb7"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" DROP CONSTRAINT "FK_8649518f0e9cdd9d79d4007691b"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" DROP CONSTRAINT "FK_633dce7a574446607c14b635928"`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "FK_671ed5cde3611a2ca9d638caf77"`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "FK_c1c358ed732dc83839ca98a7707"`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f"`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_2f89a0704857d167b13e55caf39"`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" DROP CONSTRAINT "FK_a86dc904885bd3312cf039c6f54"`, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" DROP CONSTRAINT "FK_4adb4808cbe21bd8b2e878031d8"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_737f2ec186085f5eff3b1fa948"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9cee50ba142c1c8b1c622323cb"`, undefined);
        await queryRunner.query(`DROP TABLE "tags_to_articles"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8649518f0e9cdd9d79d4007691"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_633dce7a574446607c14b63592"`, undefined);
        await queryRunner.query(`DROP TABLE "users_to_newspapers"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_671ed5cde3611a2ca9d638caf7"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c1c358ed732dc83839ca98a770"`, undefined);
        await queryRunner.query(`DROP TABLE "permissions_to_roles"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b0011304ebfcb97f597eae6c31"`, undefined);
        await queryRunner.query(`DROP TABLE "comments"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2107b249bdb54f4314267a9bd7"`, undefined);
        await queryRunner.query(`DROP TABLE "annotations"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3c28437db9b5137136e1f6d609"`, undefined);
        await queryRunner.query(`DROP TABLE "articles"`, undefined);
        await queryRunner.query(`DROP TYPE "articles_genre_enum"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_bbde41d42d0cbda1fd4eb24420"`, undefined);
        await queryRunner.query(`DROP TABLE "tags"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1bd94cbaf1a96e70312897b6e4"`, undefined);
        await queryRunner.query(`DROP TABLE "newspapers"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5372672fbfd1677205e0ce3ece"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP TYPE "roles_role_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "permissions"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_62817c7227130f4398f8f668d0"`, undefined);
        await queryRunner.query(`DROP TABLE "article_reactions"`, undefined);
    }

}
