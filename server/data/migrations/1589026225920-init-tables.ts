import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1589026225920 implements MigrationInterface {
    name = 'initTables1589026225920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article_reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLiked" boolean NOT NULL DEFAULT true, "articleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_c73d1aec06b48d4de2f99425cf1" UNIQUE ("userId", "articleId"), CONSTRAINT "PK_1e233223c5b3ca86885a69cfbd9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_62817c7227130f4398f8f668d0" ON "article_reactions" ("isLiked") `, undefined);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_48ce552495d14eae9b187bb671" ON "permissions" ("name") `, undefined);
        await queryRunner.query(`CREATE TYPE "roles_role_enum" AS ENUM('User', 'Admin', 'Guest')`, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "roles_role_enum" NOT NULL DEFAULT 'Guest', "description" text, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ccc7c1489f3a6b3c9b47d4537c" ON "roles" ("role") `, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" text, "lastName" text, "username" text NOT NULL, "email" text NOT NULL, "emailConfirmed" boolean NOT NULL DEFAULT false, "password" text NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5372672fbfd1677205e0ce3ece" ON "users" ("firstName") `, undefined);
        await queryRunner.query(`CREATE TABLE "newspapers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" text NOT NULL, CONSTRAINT "PK_617c33c3772b6f187161277b6f9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_de7206fa527ef16fa0ef0f690a" ON "newspapers" ("title") `, undefined);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "keyword" text NOT NULL, "parentId" uuid, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bbde41d42d0cbda1fd4eb24420" ON "tags" ("keyword") `, undefined);
        await queryRunner.query(`CREATE TYPE "articles_genre_enum" AS ENUM('Beauty', 'School', 'Science')`, undefined);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" text NOT NULL, "subtitle" text, "content" text NOT NULL, "publicationDate" date NOT NULL, "genre" "articles_genre_enum" NOT NULL, "imageLink" text DEFAULT null, "likeCount" integer NOT NULL DEFAULT 0, "commentCount" integer NOT NULL DEFAULT 0, "annotationId" uuid, "newspaperId" uuid NOT NULL, CONSTRAINT "REL_4d62ac02c687dd8b275155102f" UNIQUE ("annotationId"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3c28437db9b5137136e1f6d609" ON "articles" ("title") `, undefined);
        await queryRunner.query(`CREATE TABLE "annotations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" text NOT NULL, "body" text, CONSTRAINT "PK_d5b59b40ef7ee54b4309c2e89b2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2107b249bdb54f4314267a9bd7" ON "annotations" ("title") `, undefined);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "articleId" uuid NOT NULL, "userId" uuid NOT NULL, "body" text NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b0011304ebfcb97f597eae6c31" ON "comments" ("articleId") `, undefined);
        await queryRunner.query(`CREATE TABLE "permissions_to_roles" ("rolesId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_a53f70181b004198caf3ba34c98" PRIMARY KEY ("rolesId", "permissionsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c1c358ed732dc83839ca98a770" ON "permissions_to_roles" ("rolesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_671ed5cde3611a2ca9d638caf7" ON "permissions_to_roles" ("permissionsId") `, undefined);
        await queryRunner.query(`CREATE TABLE "roles_to_users" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_0e52c63b8f8a7c47f4b5a23d125" PRIMARY KEY ("usersId", "rolesId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_7408026eaaa7bea0119a28a449" ON "roles_to_users" ("usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_60a7867e5806ad78523a058324" ON "roles_to_users" ("rolesId") `, undefined);
        await queryRunner.query(`CREATE TABLE "users_to_newspapers" ("newspapersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_7272c3f8a1bf940d7818184e519" PRIMARY KEY ("newspapersId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_633dce7a574446607c14b63592" ON "users_to_newspapers" ("newspapersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8649518f0e9cdd9d79d4007691" ON "users_to_newspapers" ("usersId") `, undefined);
        await queryRunner.query(`CREATE TABLE "article_authors" ("articlesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_4b350deebce6a16239ea5271acc" PRIMARY KEY ("articlesId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a264184c7db46180bbddfa450c" ON "article_authors" ("articlesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3010dab5782bb7308a165102a2" ON "article_authors" ("usersId") `, undefined);
        await queryRunner.query(`CREATE TABLE "tags_to_articles" ("articlesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_5f4eb6a9f584f04f8d24c9551f5" PRIMARY KEY ("articlesId", "tagsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9cee50ba142c1c8b1c622323cb" ON "tags_to_articles" ("articlesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_737f2ec186085f5eff3b1fa948" ON "tags_to_articles" ("tagsId") `, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" ADD CONSTRAINT "FK_4adb4808cbe21bd8b2e878031d8" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" ADD CONSTRAINT "FK_a86dc904885bd3312cf039c6f54" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_9f9590cc11561f1f48ff034ef99" FOREIGN KEY ("parentId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_4d62ac02c687dd8b275155102fe" FOREIGN KEY ("annotationId") REFERENCES "annotations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_2f89a0704857d167b13e55caf39" FOREIGN KEY ("newspaperId") REFERENCES "newspapers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "FK_c1c358ed732dc83839ca98a7707" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "FK_671ed5cde3611a2ca9d638caf77" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "roles_to_users" ADD CONSTRAINT "FK_7408026eaaa7bea0119a28a4493" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "roles_to_users" ADD CONSTRAINT "FK_60a7867e5806ad78523a058324f" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" ADD CONSTRAINT "FK_633dce7a574446607c14b635928" FOREIGN KEY ("newspapersId") REFERENCES "newspapers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" ADD CONSTRAINT "FK_8649518f0e9cdd9d79d4007691b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "article_authors" ADD CONSTRAINT "FK_a264184c7db46180bbddfa450ca" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "article_authors" ADD CONSTRAINT "FK_3010dab5782bb7308a165102a29" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_to_articles" ADD CONSTRAINT "FK_9cee50ba142c1c8b1c622323cb7" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_to_articles" ADD CONSTRAINT "FK_737f2ec186085f5eff3b1fa948b" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags_to_articles" DROP CONSTRAINT "FK_737f2ec186085f5eff3b1fa948b"`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_to_articles" DROP CONSTRAINT "FK_9cee50ba142c1c8b1c622323cb7"`, undefined);
        await queryRunner.query(`ALTER TABLE "article_authors" DROP CONSTRAINT "FK_3010dab5782bb7308a165102a29"`, undefined);
        await queryRunner.query(`ALTER TABLE "article_authors" DROP CONSTRAINT "FK_a264184c7db46180bbddfa450ca"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" DROP CONSTRAINT "FK_8649518f0e9cdd9d79d4007691b"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_to_newspapers" DROP CONSTRAINT "FK_633dce7a574446607c14b635928"`, undefined);
        await queryRunner.query(`ALTER TABLE "roles_to_users" DROP CONSTRAINT "FK_60a7867e5806ad78523a058324f"`, undefined);
        await queryRunner.query(`ALTER TABLE "roles_to_users" DROP CONSTRAINT "FK_7408026eaaa7bea0119a28a4493"`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "FK_671ed5cde3611a2ca9d638caf77"`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "FK_c1c358ed732dc83839ca98a7707"`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`, undefined);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f"`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_2f89a0704857d167b13e55caf39"`, undefined);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_4d62ac02c687dd8b275155102fe"`, undefined);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_9f9590cc11561f1f48ff034ef99"`, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" DROP CONSTRAINT "FK_a86dc904885bd3312cf039c6f54"`, undefined);
        await queryRunner.query(`ALTER TABLE "article_reactions" DROP CONSTRAINT "FK_4adb4808cbe21bd8b2e878031d8"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_737f2ec186085f5eff3b1fa948"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9cee50ba142c1c8b1c622323cb"`, undefined);
        await queryRunner.query(`DROP TABLE "tags_to_articles"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3010dab5782bb7308a165102a2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a264184c7db46180bbddfa450c"`, undefined);
        await queryRunner.query(`DROP TABLE "article_authors"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8649518f0e9cdd9d79d4007691"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_633dce7a574446607c14b63592"`, undefined);
        await queryRunner.query(`DROP TABLE "users_to_newspapers"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_60a7867e5806ad78523a058324"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_7408026eaaa7bea0119a28a449"`, undefined);
        await queryRunner.query(`DROP TABLE "roles_to_users"`, undefined);
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
        await queryRunner.query(`DROP INDEX "IDX_de7206fa527ef16fa0ef0f690a"`, undefined);
        await queryRunner.query(`DROP TABLE "newspapers"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5372672fbfd1677205e0ce3ece"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ccc7c1489f3a6b3c9b47d4537c"`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP TYPE "roles_role_enum"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_48ce552495d14eae9b187bb671"`, undefined);
        await queryRunner.query(`DROP TABLE "permissions"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_62817c7227130f4398f8f668d0"`, undefined);
        await queryRunner.query(`DROP TABLE "article_reactions"`, undefined);
    }

}
