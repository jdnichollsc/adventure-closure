import { join } from 'path'
import { ConnectionOptions } from 'typeorm'

import { PROD_ENV } from '../constants'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.SQL_HOST || 'localhost',
  port: 5432,
  username: process.env.SQL_USER || 'postgres',
  password: process.env.SQL_PASSWORD || 'postgres',
  database: process.env.SQL_DATABASE || 'my_database',
  entities: [
    join(__dirname, '../models/*{.ts,.js}'),
  ],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [
    join(__dirname, 'migrations/*{.ts,.js}')
  ],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}

export = connectionOptions