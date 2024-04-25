import mysql2, {Connection} from "mysql2/promise"

declare global {
  var mysql2Pool: Connection
}

const mysql2Pool = async () => {
  if (!global.mysql2Pool) {
    const mysql2Pool = mysql2.createPool({
      host: "125.176.102.143",
      port: 23306,
      database: "meat_web",
      user: "meat_web",
      password: "meat_web"
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
