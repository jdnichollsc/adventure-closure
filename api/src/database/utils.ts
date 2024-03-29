import { 
  TableForeignKeyOptions
} from 'typeorm/schema-builder/options/TableForeignKeyOptions'
import {
  TableColumnOptions
} from 'typeorm/schema-builder/options/TableColumnOptions'

export const FOREIGN_KEYS = {
  ROLE_ID: 'roleId',
  USER_ID: 'userId',
  BUSINESS_ID: 'businessId',
  MANAGER_ID: 'managerId'
}
export const INDICES = {
  USER_EMAIL: 'IDX_USER_EMAIL',
  USER_BUSINESS: 'IDX_USER_BUSINESS',
  USER_MANAGER: 'IDX_USER_MANAGER'
}
export const COLUMN_TYPES = {
  INT: 'int',
  TEXT: 'text',
  VARCHAR: 'varchar',
  BOOLEAN: 'boolean',
  TIMESTAMP_UTC: 'timestamp without time zone'
}

export const createAndUpdateDates: TableColumnOptions[] = [
  { name: 'createdAt', type: COLUMN_TYPES.TIMESTAMP_UTC, default: 'NOW()' },
  { name: 'updatedAt', type: COLUMN_TYPES.TIMESTAMP_UTC, default: 'NOW()' }
]

export const createForeignKeyOption = (
  columnName: string,
  tableName: string,
  columnId = 'id'
): TableForeignKeyOptions => {
  return {
    columnNames: [columnName],
    referencedColumnNames: [columnId],
    referencedTableName: tableName,
    onDelete: "CASCADE"
  }
}

export const PUBLIC_TABLES = {
  USER: 'public.user',
  ROLE: 'public.role',
  BUSINESS: 'public.business',
  MANAGER: 'public.manager',
  USER_BUSINESS: 'public.user_business',
  USER_MANAGER: 'public.user_manager'
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function EnumToArray(enumeration: any): string[] {
  return Object.keys(enumeration).map(key => enumeration[key])
}