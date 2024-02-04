import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

async function hashPasswordfunc(password: string) {
  return await bcrypt.hash(password, 10);
}

export class addRole1684867874937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hashPasswordfunc('admin@123');

    await queryRunner.query(`INSERT INTO "role" (name, type, slug) VALUES ('admin','ADMIN', 'admin-role'),('user','USER','user-role');`);
    await queryRunner.query(
      `INSERT INTO "user" ("firstName", "lastName", "email", "password", "otp") VALUES ('Admin', 'last', 'admin@yopmail.com', '${password}', '123123');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` DELETE FROM user WHERE email LIKE 'admin@yopmail.com;`);

    await queryRunner.query(`DROP TABLE "role"`);
  }
}
