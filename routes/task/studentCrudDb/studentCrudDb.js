const express = require('express')
const router = express.Router()
const db = require('../../../db')

router.get('/students/:pageno?', (req, res) => {
    try {
        let pageno = req.params.pageno||'1';
        console.log('hifdg333',pageno);


        let no_of_records_per_page = 200;
        let total_no_of_records = 50000;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;
        let startingRow = no_of_records_per_page * pageno - no_of_records_per_page;
        pageno = Number(pageno)


        let orderByfield = req.query.orderby || 'student_id';
        let orderdir = req.query.orderdir || 'asc'
        console.log('ji');

        if (pageno > total_no_of_pages || pageno < 1) {
            res.end('page not found')
        }
        let getAllStudentsQuery = `select * from student_master order by ${orderByfield} ${orderdir} limit ${no_of_records_per_page} offset ${startingRow}`;
        console.log(getAllStudentsQuery);

        db.query(getAllStudentsQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.render('studentCrudDb/allStudents', { data: result, pageno: pageno, total: total_no_of_records })
        })

    }
    catch (error) {
        res.write("Try again for student crud db")
        return res.end()
    }
})

module.exports = router