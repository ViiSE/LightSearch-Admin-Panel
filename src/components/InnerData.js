
export function dbType() {
    return [
        {
            name: "firebirdsql",
            driver: "org.firebirdsql.jdbc.FBDriver"
        },
        {
            name: "mysql",
            driver: "com.mysql.jdbc.Driver"
        },
        {
            name: "postgresql",
            driver: "org.postgresql.Driver"
        },
        {
            name: "db2",
            driver: "COM.ibm.db2.jdbc.app.DB2Driver"
        }
    ]
}