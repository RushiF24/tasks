const express = require('express')
const router = express.Router()
const db = require('../../../db')



router.get('/students/:pageno?', (req, res) => {
    try {
        let pageno = req.params.pageno || '1';
        
        let month = req.query.month || '1';

        let no_of_records_per_page = 50;
        let total_no_of_records = 200;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;
        let startingRow = no_of_records_per_page * pageno - no_of_records_per_page;
        pageno = Number(pageno)

let forw = 'search'

        if (pageno > total_no_of_pages || pageno < 1) {
            res.end('page not found')
        }

        let getAllStudentsQuery = `select student_master_200.student_id,student_master_200.first_name, count(attendence) as Attendence,(count(attendence)/(select count(distinct date) from student_attendence where month(date) = ${month}))*100 as Percentage from student_master_200 inner join student_attendence where student_master_200.student_id = student_attendence.student_id and month(date) = ${month} and student_attendence.attendence='P' group by student_id limit ${no_of_records_per_page} offset ${startingRow}`;
console.log(getAllStudentsQuery);

        db.query(getAllStudentsQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.render('studentExamAttendence/allStudents', { data: result, pageno: pageno,forw:forw, total: total_no_of_records, month:month,totalPage:total_no_of_pages,query:month })
        })

    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

router.get('/examReport', (req, res) => {
    try {
        let pageno = req.params.pageno;
        
        let month = req.query.month || '1';
        let year = req.query.year || '24'

        let no_of_records_per_page = 200;
        let total_no_of_records = 400;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;
        let startingRow = no_of_records_per_page * pageno - no_of_records_per_page;
        pageno = Number(pageno)



        if (pageno > total_no_of_pages || pageno < 1) {
            res.end('page not found')
        }
        

        let getExamReportQuery = `select student_master_200.student_id,student_master_200.first_name as Name, sum(exam_result.prilimias_mark_pr) as PPractical, sum(exam_result.prilimias_mark_th) as PTheory, sum(exam_result.terminal_mark_pr) as TPractical, sum(exam_result.terminal_mark_th) as TTheory, sum(exam_result.final_mark_pr) as FPractical, sum(exam_result.final_mark_th) as FTheory
        from student_master_200 
        inner join exam_result 
        where student_master_200.student_id = exam_result.student_id
        and exam_result.attendence='p' group by student_master_200.student_id order by student_master_200.student_id`;



        db.query(getExamReportQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.render('studentExamAttendence/examReport', { data: result, pageno: pageno, total: total_no_of_records, month:month,totalPage:total_no_of_pages})
        })

    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})


router.get('/reportCard/:studentId', (req, res) => {
    try {
        let studentId = req.params.studentId;
        

        let no_of_records_per_page = 200;
        let total_no_of_records = 400;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;

        let getReportCardQuery = `select exam_result.subject_id, exam_result.prilimias_mark_pr as PPractical, exam_result.prilimias_mark_th as PTheory, exam_result.terminal_mark_pr as TPractical, exam_result.terminal_mark_th as TTheory, exam_result.final_mark_pr as FPractical, exam_result.final_mark_th as FTheory, (prilimias_mark_pr+prilimias_mark_th+terminal_mark_pr+terminal_mark_pr+final_mark_pr+final_mark_th) as totalMark
        from exam_result 
        where exam_result.student_id = ${studentId}`;
        
        
        db.query(getReportCardQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            // console.log(result);
            res.render('studentExamAttendence/reportCard', { data: result, total: total_no_of_records,totalPage:total_no_of_pages })
        })

    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})
router.post('/search', (req, res) => {
    try {
        let student_id = req.body.student_id;

        let pageno = req.params.pageno || '1';

        let month = req.query.month || '1';

        let forw = 'search';
        let no_of_records_per_page = 50;
        let total_no_of_records = 200;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;
        pageno = Number(pageno)

        let getSearchStudentsQuery = `select student_master_200.student_id,student_master_200.first_name,student_master_200.last_name, count(attendence) as Attendence, 
        (count(attendence)/(select count(distinct date) from student_attendence))*100 as Percentage
        from student_master_200
        inner join student_attendence 
        where student_master_200.student_id = student_attendence.student_id and student_attendence.attendence='P' and student_master_200.student_id = ${student_id} group by student_id`;

        db.query(getSearchStudentsQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.render('studentExamAttendence/allStudents', { data: result, pageno: pageno, total: total_no_of_records, month: month, totalPage: total_no_of_pages, forw: forw, query: month })
        })
    }
    catch {
        res.write("Try again")
        return res.end()
    }
})

router.post('/filterSearch', (req, res) => {
    try {
        let fname = req.body.fname;
        let lname = req.body.lname;
        let pr = req.body.pr;
        let type = req.body.type;

        let pageno = req.params.pageno || '1';

        let month = req.query.month || '1';

        let forw = 'search';

        let no_of_records_per_page = 50;
        let total_no_of_records = 200;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;
        pageno = Number(pageno)

        let filterdSearchStudentsQuery;

        if (type == 'and') {
            filterdSearchStudentsQuery = `select student_master_200.student_id,student_master_200.first_name,student_master_200.last_name, count(attendence) as Attendence, 
            (count(attendence)/(select count(distinct date) from student_attendence))*100 as Percentage
            from student_master_200
            inner join student_attendence 
            where student_master_200.student_id = student_attendence.student_id and student_attendence.attendence='P' and student_master_200.first_name like '%${fname}%' and student_master_200.last_name like '%${lname}%' group by student_id having (count(attendence)/(select count(distinct date) from student_attendence))*100 >= '${pr}' `;
        }
        else {
            filterdSearchStudentsQuery = `select student_master_200.student_id,student_master_200.first_name,student_master_200.last_name, count(attendence) as Attendence, 
            (count(attendence)/(select count(distinct date) from student_attendence))*100 as Percentage
            from student_master_200
            inner join student_attendence 
            where student_master_200.student_id = student_attendence.student_id and student_attendence.attendence='P' and (student_master_200.first_name like '%${fname}%' or student_master_200.last_name like '%${lname}%') group by student_id having (count(attendence)/(select count(distinct date) from student_attendence))*100 >= '${pr}' `;
        }

        db.query(filterdSearchStudentsQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.render('studentExamAttendence/allStudents', { data: result, pageno: pageno, total: total_no_of_records, month: month, totalPage: total_no_of_pages, forw: forw, query: month })
        })

    }
    catch {
        res.write("Try again")
        return res.end()
    }
})
module.exports = router