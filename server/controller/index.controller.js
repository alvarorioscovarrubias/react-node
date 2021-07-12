const { Pool } = require('pg');

const pool = new Pool({
    host: 'desafio-full-stack.cdr9wf5llq1m.us-east-1.rds.amazonaws.com',
    user: 'fullstack',
    password: 'desafio-2020',
    database: 'georesearch',
    port:'5432'
})

const getPoints = async (req, res) => {

    let filter = req.query.filter
    if (filter == "") {
        const resp = await pool.query('SELECT * FROM pois')
        res.send(resp.rows)
        console.log(resp)
    } else {
        const resp = await pool.query(`SELECT * FROM pois WHERE category_name = '${filter}'`)
        res.send(resp.rows)
        console.log(resp)
    }
    
}

module.exports = { getPoints }