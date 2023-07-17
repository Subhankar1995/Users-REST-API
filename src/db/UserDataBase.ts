import {Pool} from 'pg'
import { databaseConfig } from '../config'
 
const pool = new Pool({
    user: databaseConfig.user,
    host: databaseConfig.host,
    database: databaseConfig.databaseName,
    password: databaseConfig.password,
    port: databaseConfig.port,
  })
 
export default pool