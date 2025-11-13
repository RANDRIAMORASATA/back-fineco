import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHederaFieldsToUser1763035336004 implements MigrationInterface {
    name = 'AddHederaFieldsToUser1763035336004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hederaPrivateKey\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hederaPrivateKey\``);
    }

}
