const express = require('express')
const router = express.Router()
const db = require('../../../db')

const viewGridForm = (req, res) => {
    res.render('viewgrid/form')
}

const serveQuery = (req, res) => {
    try {

        let query;
        let pageno = req.params.pageno || '1';
        let no_of_records_per_page = 50;
        let total_no_of_records;

        pageno = Number(pageno)
        let forw = 'serveQuery';


        let tempQuery;
        if (req.method == 'POST') {
            tempQuery = req.body.query
            query = tempQuery;
        }
        else {
            tempQuery = req.query.query
            query = tempQuery;
        }

        db.query(tempQuery, (err, result) => {
            if (err) {
                res.end('Invalid query')
            }
            else {
                total_no_of_records = result.length;
            }


            total_no_of_pages = total_no_of_records / no_of_records_per_page;

            if (pageno > total_no_of_pages || pageno < 1) {
                res.end('page not found')
            }

            let startingRow = (no_of_records_per_page * pageno) - no_of_records_per_page;

            if (!query.split('limit')[1]) {
                query += ` limit ${startingRow},${no_of_records_per_page};`
            }

            db.query(query, (err, result) => {
                if (err) {
                    res.end('Invalid query')
                }
                else {
                    console.log("My SQL Connected via a new open connection.");
                    console.log(total_no_of_records);
                    res.render('userpages/taskTable', { data: result, total: total_no_of_records, pageno: pageno, totalPage: total_no_of_pages, query: tempQuery, forw: forw });
                }
            })
        })
    }
    catch (error) {
        res.write("Try Again")
        return res.end()
    }
}


module.exports = {viewGridForm,serveQuery}
