import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHederaFieldsToUser1763034962574 implements MigrationInterface {
    name = 'AddHederaFieldsToUser1763034962574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hederaPrivateKey\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hederaPrivateKey\``);
    }

}
