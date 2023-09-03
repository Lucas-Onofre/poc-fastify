import sqlite3 from 'sqlite3'
const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
    CREATE TABLE users (  
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
)`

export const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_ITENS_CREATE, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Tabela users criada com sucesso.')
            }
        })
    }
})