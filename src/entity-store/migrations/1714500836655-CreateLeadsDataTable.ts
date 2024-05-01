import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrations1714500836655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'leads_data',
        columns: [
          {
            name: 'lead_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'applicant_name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'applicant_number',
            type: 'numeric',
            precision: 20,
            isNullable: false,
          },
          {
            name: 'applicant_address',
            type: 'varchar(250)',
            isNullable: false,
          },
          {
            name: 'district',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar(50)',
            isNullable: false,
            default: "'generated'",
          },
          {
            name: 'generated_by',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'leads_data',
      new TableForeignKey({
        columnNames: ['generated_by'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('leads_data');
  }
}
