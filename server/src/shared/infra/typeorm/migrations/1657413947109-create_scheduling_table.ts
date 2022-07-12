import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSchedulingTable1657413947109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scheduling',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'date',
            type: 'datetime'
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            name: 'scheduling_user_fk',
            referencedTableName: 'scheduling',
            referencedColumnNames: ['id'],
            columnNames: ['user_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scheduling', 'scheduling_user_fk');
    await queryRunner.dropTable('scheduling');
  }
}
