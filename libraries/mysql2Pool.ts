import mysql2, {Connection} from "mysql2/promise"

declare global {
  var mysql2Pool: Connection
}

const mysql2Pool = async () => {
  if (!global.mysql2Pool) {
    const mysql2Pool = mysql2.createPool({
      host: process.env.NEXT_PUBLIC_MYSQL_HOST,
      port: Number(process.env.NEXT_PUBLIC_MYSQL_PORT),
      database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
      user: process.env.NEXT_PUBLIC_MYSQL_USER,
      password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD
    })
    const [rows, fields] = await mysql2Pool.execute(`
      select 'MySQL Connected' as Result
    `)
    console.log(rows)
    global.mysql2Pool = mysql2Pool
  }
  return global.mysql2Pool
}

export default mysql2Pool
