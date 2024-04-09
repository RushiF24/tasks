const express = require('express')
const router = express.Router()
const db = require('../../../db')
const controller = require("../../../controllers/task/delimeteSearch/delimeteSearch")

router.get('/students/:pageno?', controller.students)

// router.post('/delimitedSearch', (req, res) => {
//     try {
//         let inp = req.body.searchq;
//         console.log(inp);

//         let pageno = req.params.pageno || '1';

//         let month = req.query.month || '1';

//         let forw = 'delimetedsearch';

//         let no_of_records_per_page = 50;
//         let total_no_of_records = 200;
//         let total_no_of_pages = total_no_of_records / no_of_records_per_page;
//         pageno = Number(pageno)

//         let fieldMap = {
//             "_": "first_name",
//             "^" : "last_name",
//             "$" : "email",
//             "{" : "student_mobile_number",
//             ":" : "country"
//         }


//         const delims2 = [ '_', '^', '$', '{', ':' ];
//         let ck ;
//         let resultObj = {};
//         // let resultObj1 = {
//         //     "_": "",
//         //     "^" : "",
//         //     "$" : "",
//         //     "{" : "",
//         //     ":" : ""
//         // };
//         let checkDel = true ;
//         for(let char of inp){
//             if(delims2.includes(char)){
//                 ck = char;
//                 checkDel = true;
//             }
//             else{
//                 if(ck in resultObj && checkDel) {
//                     resultObj[ck] = (resultObj[ck] || '')+ ','+ char;
//                 }
//                 else{
//                     resultObj[ck] = (resultObj[ck] || '')+ char;
//                 }
//                 checkDel = false
//             }
//         }
//         console.log(resultObj);

//         if(Object.keys(resultObj).length === 0){
//             throw error
//         }

//         // let delimitedQuery =  `select student_master.student_id,student_master.first_name,student_master.last_name, count(attendence) as Attendence, 
//         // (count(attendence)/(select count(distinct date) from student_attendence))*100 as Percentage
//         // from student_master 
//         // inner join student_attendence 
//         // where student_master.student_id = student_attendence.student_id and student_attendence.attendence='P' and student_master.first_name like '%${resultObj['_']}%' and student_master.last_name like '%${resultObj['^']}%' group by student_id having (count(attendence)/(select count(distinct date) from student_attendence))*100 >= '${pr}' ;`
        
//         // let delimitedQuery = `select * from student_master where student_master.first_name like '%${resultObj['_']}%' and student_master.last_name like '%${resultObj['^']}%' and student_master.email like '%${resultObj['$']}%' and student_master.student_mobile_number like '%${resultObj['{']}%' and student_master.country like '%${resultObj[':']}%';`



//         let delimitedQuery = `SELECT student_id,first_name,last_name,email,student_mobile_number FROM student_master_200 where `;
//         console.log(delimitedQuery);
//         let times = 1;
//         for(let key in resultObj){
//             let mainKey = key
//             if(fieldMap.hasOwnProperty(key)){
//                 if(resultObj[key].includes(',')){
//                     times = 2;
//                     let keyArr = resultObj[key].split(',');
//                     console.log(keyArr);

//                         delimitedQuery = delimitedQuery + "( "
//                         for(let i =0;i<keyArr.length;i++){
//                             if(i == keyArr.length -1){
//                                 // if(Object.keys(mainKey).length == Object.keys(resultObj).length){
//                                 //     delimitedQuery = delimitedQuery + fieldMap[key] + " like " + `'%${keyArr[i]}%'`  + ")"
//                                 // }
//                                 // else{

//                                     delimitedQuery = delimitedQuery + fieldMap[key] + " like " + `'%${keyArr[i]}%'`  + ")"
//                                 // }
//                             }
//                             else{
//                                 delimitedQuery = delimitedQuery + fieldMap[key] + " like " + `'%${keyArr[i]}%'`+ " OR "
//                             }
//                         }
//                 }
//                 else{
//                     if(times==1){
//                         delimitedQuery = delimitedQuery + fieldMap[key] + " like " + `'%${resultObj[key]}%'`
//                         times = 2;
//                     }
//                     else{

//                         delimitedQuery = delimitedQuery + " AND " + fieldMap[key] + " like " + `'%${resultObj[key]}%'`
//                     }
//                 }
//             }
//         }
//         forw = 'delimitedSearch'

//         console.log(delimitedQuery);
//         // res.end()
//         db.query(delimitedQuery,(err,result) => {
//             if(err) throw err;
//             // console.log(result);
//             res.render('studentExamAttendence/allStudents', { data: result, pageno: pageno,forw:forw, total: total_no_of_records, month: month, totalPage: total_no_of_pages, forw: forw, query: month ,query:inp})
//         })
//     }
//     catch {
//         res.write("Try again")
//         return res.end()
//     }
// })
router.post('/delimitedSearch', controller.delimetedsearch)

module.exports = router