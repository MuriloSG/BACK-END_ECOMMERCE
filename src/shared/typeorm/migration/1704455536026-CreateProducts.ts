import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1704455536026 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    /* Create UUID postgress*/
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 10,
          scale: 2
        },
        {
          name: 'quantity',
          type: 'int',
        },
        {
          name: 'category',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'UpdateAt',
          type: 'timestamp',
          default: 'now()'
        },

        /*
          Create column image products
        */
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
