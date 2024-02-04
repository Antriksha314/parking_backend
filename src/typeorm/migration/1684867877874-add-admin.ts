import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdmin1684867877874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const getadmin = await queryRunner.query(`select * from "user" where email = 'admin@yopmail.com';`);
    const admin = getadmin.find((a: any) => a.id);

    const getrole = await queryRunner.query(`select * from "role" where type = 'ADMIN';`);
    const role = getrole.find((a: any) => a.id);
    await queryRunner.query(`INSERT INTO "user_roles_role" ("userId","roleId") VALUES ('${admin.id}','${role.id}');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
