export const sqlConfig = {
    server: '192.168.1.69',
    port: 1433,
    user: 'sa',
    password: 'VeryStr0ngP@ssw0rd',
    database: 'projeto',
    options: {
      enableArithAbort : true,
      encrypt: false,
      trustServerCertificate: true,
    },
    connectionTimeout : 5000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
}