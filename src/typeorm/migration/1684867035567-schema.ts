import { MigrationInterface, QueryRunner } from 'typeorm';

export class schema1684867035567 implements MigrationInterface {
  name = 'schema1684867035567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "base" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_meta" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_2b45acc20c0a71d613f9ed6d9e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."role_type_enum" AS ENUM('ADMIN', 'USER')`);
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" "public"."role_type_enum" NOT NULL DEFAULT 'USER', "slug" character varying NOT NULL, "permissions" text, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "ip" character varying, "systemAddress" text, "metaJson" text, "browser" character varying, "status" boolean NOT NULL DEFAULT false, "bannedIps" text, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "otp" character varying, "otpExpiryTime" TIMESTAMP DEFAULT NOW() + INTERVAL '5 minutes', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."parking_entity_status_enum" AS ENUM('approved', 'rejected', 'disabled', 'pending')`);
    await queryRunner.query(
      `CREATE TABLE "parking_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "size" integer NOT NULL, "capacity" integer NOT NULL, "totalLocations" integer NOT NULL, "status" "public"."parking_entity_status_enum" NOT NULL DEFAULT 'pending', "metaJson" text, "ownerId" integer, CONSTRAINT "PK_077b372e2eeb2acc21004b9adc2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."spot_type_enum" AS ENUM('CAR', 'BIKE')`);
    await queryRunner.query(`CREATE TYPE "public"."spot_status_enum" AS ENUM('Available', 'Occupied', 'Reserved', 'Pending')`);
    await queryRunner.query(
      `CREATE TABLE "spot" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "number" character varying NOT NULL, "uniqueId" character varying NOT NULL, "type" "public"."spot_type_enum" NOT NULL DEFAULT 'CAR', "status" "public"."spot_status_enum" NOT NULL DEFAULT 'Pending', "size" character varying NOT NULL, "sectionId" integer, CONSTRAINT "PK_f2a0a47e5ae78713daf83a5f7b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."rate_type_enum" AS ENUM('HOURS', 'DAYS')`);
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL, "duration" character varying NOT NULL, "type" "public"."rate_type_enum" NOT NULL DEFAULT 'HOURS', "sectionId" integer, CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."section_status_enum" AS ENUM('Available', 'Occupied', 'Reserved', 'Pending')`);
    await queryRunner.query(`CREATE TYPE "public"."section_type_enum" AS ENUM('CAR', 'BIKE')`);
    await queryRunner.query(
      `CREATE TABLE "section" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "number" character varying NOT NULL, "totalSpots" integer NOT NULL, "status" "public"."section_status_enum" NOT NULL DEFAULT 'Pending', "type" "public"."section_type_enum" NOT NULL DEFAULT 'CAR', "floorId" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."floor_status_enum" AS ENUM('Available', 'Occupied', 'Reserved', 'Pending')`);
    await queryRunner.query(
      `CREATE TABLE "floor" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "floorNumber" integer NOT NULL, "totalSections" integer NOT NULL, "totalSectionsForCar" integer NOT NULL, "totalSectionsForBike" integer NOT NULL, "status" "public"."floor_status_enum" NOT NULL DEFAULT 'Pending', "locationId" integer, CONSTRAINT "PK_16a0823530c5b0dd226b8a96ee1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."parking_locations_status_enum" AS ENUM('Available', 'Occupied', 'Reserved', 'Pending')`);
    await queryRunner.query(
      `CREATE TABLE "parking_locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "propertyName" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zipCode" character varying NOT NULL, "size" character varying NOT NULL, "status" "public"."parking_locations_status_enum" NOT NULL DEFAULT 'Pending', "metaJson" text, "parkingId" integer, CONSTRAINT "PK_7297cd67e1320e6830565441e8c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."parking_opening_hours_status_enum" AS ENUM('Available', 'Occupied', 'Reserved', 'Pending')`);
    await queryRunner.query(
      `CREATE TABLE "parking_opening_hours" ("id" SERIAL NOT NULL, "dayName" character varying NOT NULL, "openingTime" character varying NOT NULL, "closingTime" character varying NOT NULL, "status" "public"."parking_opening_hours_status_enum" NOT NULL DEFAULT 'Pending', "locationId" integer, CONSTRAINT "PK_914614d128e803309ddfc40ea63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
    await queryRunner.query(
      `CREATE TABLE "user_sessions_session" ("userId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_ed1f318dad5a907151f64089323" PRIMARY KEY ("userId", "sessionId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_620f11776a8275780b3c07c4f2" ON "user_sessions_session" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_43a4174f69e1183c31d780936f" ON "user_sessions_session" ("sessionId") `);
    await queryRunner.query(
      `ALTER TABLE "user_meta" ADD CONSTRAINT "FK_f6c72c83c1787aee12530dbcd05" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_entity" ADD CONSTRAINT "FK_c79a232d3c1b5287a14f2fbdb34" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "spot" ADD CONSTRAINT "FK_1bc02e80db41a4da8e7dc5238be" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rate" ADD CONSTRAINT "FK_c33cf0570cc521c7a7c65280e64" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section" ADD CONSTRAINT "FK_4e488a283766c0211dc7c6cc39a" FOREIGN KEY ("floorId") REFERENCES "floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "floor" ADD CONSTRAINT "FK_aaec2bb758a1f6b435050d59551" FOREIGN KEY ("locationId") REFERENCES "parking_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_locations" ADD CONSTRAINT "FK_7c06430d4d558f913df1932d613" FOREIGN KEY ("parkingId") REFERENCES "parking_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_opening_hours" ADD CONSTRAINT "FK_405908954bc6a7938d9ea85434a" FOREIGN KEY ("locationId") REFERENCES "parking_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sessions_session" ADD CONSTRAINT "FK_620f11776a8275780b3c07c4f21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sessions_session" ADD CONSTRAINT "FK_43a4174f69e1183c31d780936f5" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_sessions_session" DROP CONSTRAINT "FK_43a4174f69e1183c31d780936f5"`);
    await queryRunner.query(`ALTER TABLE "user_sessions_session" DROP CONSTRAINT "FK_620f11776a8275780b3c07c4f21"`);
    await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
    await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
    await queryRunner.query(`ALTER TABLE "parking_opening_hours" DROP CONSTRAINT "FK_405908954bc6a7938d9ea85434a"`);
    await queryRunner.query(`ALTER TABLE "parking_locations" DROP CONSTRAINT "FK_7c06430d4d558f913df1932d613"`);
    await queryRunner.query(`ALTER TABLE "floor" DROP CONSTRAINT "FK_aaec2bb758a1f6b435050d59551"`);
    await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_4e488a283766c0211dc7c6cc39a"`);
    await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_c33cf0570cc521c7a7c65280e64"`);
    await queryRunner.query(`ALTER TABLE "spot" DROP CONSTRAINT "FK_1bc02e80db41a4da8e7dc5238be"`);
    await queryRunner.query(`ALTER TABLE "parking_entity" DROP CONSTRAINT "FK_c79a232d3c1b5287a14f2fbdb34"`);
    await queryRunner.query(`ALTER TABLE "user_meta" DROP CONSTRAINT "FK_f6c72c83c1787aee12530dbcd05"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_43a4174f69e1183c31d780936f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_620f11776a8275780b3c07c4f2"`);
    await queryRunner.query(`DROP TABLE "user_sessions_session"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`);
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(`DROP TABLE "parking_opening_hours"`);
    await queryRunner.query(`DROP TYPE "public"."parking_opening_hours_status_enum"`);
    await queryRunner.query(`DROP TABLE "parking_locations"`);
    await queryRunner.query(`DROP TYPE "public"."parking_locations_status_enum"`);
    await queryRunner.query(`DROP TABLE "floor"`);
    await queryRunner.query(`DROP TYPE "public"."floor_status_enum"`);
    await queryRunner.query(`DROP TABLE "section"`);
    await queryRunner.query(`DROP TYPE "public"."section_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."section_status_enum"`);
    await queryRunner.query(`DROP TABLE "rate"`);
    await queryRunner.query(`DROP TYPE "public"."rate_type_enum"`);
    await queryRunner.query(`DROP TABLE "spot"`);
    await queryRunner.query(`DROP TYPE "public"."spot_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."spot_type_enum"`);
    await queryRunner.query(`DROP TABLE "parking_entity"`);
    await queryRunner.query(`DROP TYPE "public"."parking_entity_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_type_enum"`);
    await queryRunner.query(`DROP TABLE "user_meta"`);
    await queryRunner.query(`DROP TABLE "base"`);
  }
}
