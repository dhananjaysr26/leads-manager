import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrations1714501279172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documents_data',
        columns: [
          {
            name: 'document_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document_type',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'document_name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'document_path',
            type: 'varchar(250)',
            isNullable: false,
          },
          {
            name: 'lead_id',
            type: 'int',
            isNullable: false,
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
      'documents_data',
      new TableForeignKey({
        columnNames: ['lead_id'],
        referencedColumnNames: ['lead_id'],
        referencedTableName: 'leads_data',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('documents_data');
  }
}
