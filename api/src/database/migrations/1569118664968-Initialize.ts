import {
  Table,
  QueryRunner,
  MigrationInterface,
  TableCheck
} from 'typeorm'

import { UserStatus } from '../../models'
import {
  PUBLIC_TABLES,
  COLUMN_TYPES,
  FOREIGN_KEYS,
  createAndUpdateDates,
  createForeignKeyOption,
  INDICES,
  EnumToArray
} from '../utils'
import { addDefaultData } from '../seeds'

export class Initialize1569118664968 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    console.log('************** CREATE PUBLIC SCHEMA **************')
    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.ROLE,
      columns: [
        { name: 'id', type: COLUMN_TYPES.INT, isPrimary: true, isGenerated: true },
        { name: 'name', type: COLUMN_TYPES.VARCHAR, length: '50' }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.BUSINESS,
      columns: [
        { name: 'id', type: COLUMN_TYPES.INT, isPrimary: true, isGenerated: true },
        { name: 'name', type: COLUMN_TYPES.VARCHAR, length: '50' },
        { name: 'imageUrl', type: COLUMN_TYPES.VARCHAR, length: '100' },
        { name: 'investment', type: COLUMN_TYPES.INT },
        { name: 'score', type: COLUMN_TYPES.INT },
        { name: 'income', type: COLUMN_TYPES.INT },
        { name: 'duration', type: COLUMN_TYPES.INT }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.MANAGER,
      columns: [
        { name: 'id', type: COLUMN_TYPES.INT, isPrimary: true, isGenerated: true },
        { name: 'name', type: COLUMN_TYPES.VARCHAR, length: '50' },
        { name: 'imageUrl', type: COLUMN_TYPES.VARCHAR, length: '100' },
        { name: 'investment', type: COLUMN_TYPES.INT },
        { name: FOREIGN_KEYS.BUSINESS_ID, type: COLUMN_TYPES.INT },
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.BUSINESS_ID, PUBLIC_TABLES.BUSINESS)
      ]
    }), true)
    
    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.USER,
      columns: [
        { name: 'id', type: COLUMN_TYPES.TEXT, isPrimary: true, isGenerated: false },
        { name: 'password', type: COLUMN_TYPES.TEXT, isNullable: true },
        { name: 'firstName', type: COLUMN_TYPES.VARCHAR, length: '50' },
        { name: 'lastName', type: COLUMN_TYPES.VARCHAR, length: '50' },
        { name: 'email', type: COLUMN_TYPES.VARCHAR, length: '50' },
        { name: 'status', type: COLUMN_TYPES.TEXT, enum: EnumToArray(UserStatus) },
        { name: 'birthdate', type: COLUMN_TYPES.TIMESTAMP_UTC, isNullable: true },
        { name: 'address', type: COLUMN_TYPES.VARCHAR, length: '50', isNullable: true },
        { name: 'phoneNumber', type: COLUMN_TYPES.VARCHAR, length: '20', isNullable: true },
        { name: 'termsAndConditions', type: COLUMN_TYPES.BOOLEAN, default: false },
        { name: 'capital', type: COLUMN_TYPES.INT, default: 0 },
        { name: 'score', type: COLUMN_TYPES.INT, default: 0 },
        { name: FOREIGN_KEYS.ROLE_ID, type: COLUMN_TYPES.INT },
        ...createAndUpdateDates
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.ROLE_ID, PUBLIC_TABLES.ROLE),
      ],
      indices: [
        { name: INDICES.USER_EMAIL, columnNames: ['email'], isUnique: true }
      ]
    }), true)

    // Prevent negative values
    const { driver } = queryRunner.connection
    await queryRunner.createCheckConstraint(
      PUBLIC_TABLES.USER,
      new TableCheck({
        expression: `${driver.escape('capital')} >= 0`
      })
    )

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.USER_BUSINESS,
      columns: [
        { name: 'id', type: COLUMN_TYPES.INT, isPrimary: true, isGenerated: true },
        { name: 'inventory', type: COLUMN_TYPES.INT, default: 1 },
        { name: 'speed', type: COLUMN_TYPES.INT, default: 1 },
        { name: 'lastRunAt', type: COLUMN_TYPES.TIMESTAMP_UTC, isNullable: true },
        {
          name: FOREIGN_KEYS.USER_ID,
          type: COLUMN_TYPES.TEXT,
          isPrimary: true
        },
        {
          name: FOREIGN_KEYS.BUSINESS_ID,
          type: COLUMN_TYPES.INT,
          isPrimary: true
        },
        ...createAndUpdateDates
      ],
      indices: [
        {
          name: INDICES.USER_BUSINESS,
          columnNames: [FOREIGN_KEYS.USER_ID, FOREIGN_KEYS.BUSINESS_ID],
          isUnique: true
        }
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.USER_ID, PUBLIC_TABLES.USER),
        createForeignKeyOption(FOREIGN_KEYS.BUSINESS_ID, PUBLIC_TABLES.BUSINESS)
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: PUBLIC_TABLES.USER_MANAGER,
      columns: [
        { name: 'id', type: COLUMN_TYPES.INT, isPrimary: true, isGenerated: true },
        {
          name: FOREIGN_KEYS.USER_ID,
          type: COLUMN_TYPES.TEXT,
          isPrimary: true
        },
        {
          name: FOREIGN_KEYS.MANAGER_ID,
          type: COLUMN_TYPES.INT,
          isPrimary: true
        },
        ...createAndUpdateDates
      ],
      indices: [
        {
          name: INDICES.USER_MANAGER,
          columnNames: [FOREIGN_KEYS.USER_ID, FOREIGN_KEYS.MANAGER_ID],
          isUnique: true
        }
      ],
      foreignKeys: [
        createForeignKeyOption(FOREIGN_KEYS.USER_ID, PUBLIC_TABLES.USER),
        createForeignKeyOption(FOREIGN_KEYS.MANAGER_ID, PUBLIC_TABLES.MANAGER)
      ]
    }), true)

    console.log('************** INSERT DEFAULT DATA **************')

    // INSERT DATA
    await addDefaultData(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('************** REMOVE PUBLIC SCHEMA **************')

    await queryRunner.dropTable(PUBLIC_TABLES.USER_MANAGER)
    await queryRunner.dropTable(PUBLIC_TABLES.USER_BUSINESS)
    await queryRunner.dropTable(PUBLIC_TABLES.USER)
    await queryRunner.dropTable(PUBLIC_TABLES.MANAGER)
    await queryRunner.dropTable(PUBLIC_TABLES.BUSINESS)
    await queryRunner.dropTable(PUBLIC_TABLES.ROLE)
  }
}
