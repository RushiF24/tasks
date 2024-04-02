const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')

router.get('/', (req, res) => {
    res.render('jobapplicationform/job_application_form3',{data:''})
})

//inserting data into database
router.post('/addCandidate', (req, res) => {
    let { firstname, lastname, email, designation, phoneNumber, address, address2, city, state, gender, zip_code, relationship, dob, courseName, PassigYear, Percentage, cname, cdesignation, cfrom1, cto1, language, hindi, gujarati, english,tech, php, mysql, laravel, oracle, rname, contact, relation, location, noticePeriod, expectedCtc, currentCtc, department } = req.body;
    console.log('here', req.body);

    try {
        let insertbaiscDetailQuery = `insert into basic_details (first_name,last_name,email,designation,phone_number,address1,address2,city,state,gender,zipcode,relation_ship_status,dob) values ('${firstname}', '${lastname}', '${email}','${designation}', '${phoneNumber}','${address}', '${address2}', '${city}', '${state}','${gender}', '${zip_code}', '${relationship}',  '${dob}')`;


        db.query(insertbaiscDetailQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            console.log('ji');
            call(result.insertId)
            return res.end('Data received1.');
        });



    }
    catch (error) {
        res.write("Try again for basic detail")
        return res.end()
    }

    function call(cid) {
        try {
            let insertEducationQuery;
            if(courseName[0] != ''){

                for (let i = 0; i < courseName.length; i++) {
    
                    insertEducationQuery = `INSERT INTO educational_details2(candidate_id,course_name,passing_year,percentage) VALUES ('${cid}','${courseName[i]}', '${PassigYear[i]}', '${Percentage[i]}')`;
    
    
                    db.query(insertEducationQuery, (err, result) => {
                        if (err) throw err;
                        console.log("My SQL Connected via a new open connection.");
                        console.log('ji2');
                        return res.write("data print education");
                    });
                }
            }

        }
        catch (error) {

            return res.write("Try again")
        }

        try {
            let insertWorKExpQuery;
            if(cname[0] != ''){

                for (let i = 0; i < cname.length; i++) {
    
                    insertWorKExpQuery = `INSERT INTO work_experience(candidate_id,company_name,designation,from_1,to_1) VALUES ('${cid}','${cname[i]}', '${cdesignation[i]}', '${cfrom1[i]}', '${cto1[i]}')`;
    
                    db.query(insertWorKExpQuery, (err, result) => {
                        if (err) throw err;
                        console.log("My SQL Connected via a new open connection.");
                        console.log('ji2');
                        return res.write("data print education");
                    });
    
                }
            }



        }
        catch (error) {

            return res.write("Try again for work Experience")
        }
        try {

            let insertLanguageKnownQuery;
            // if(language[0] !='')
            for (let i = 0; i < language.length; i++) {
                insertLanguageKnownQuery = `INSERT INTO language_known1 (candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${cid}','${language[i]}',  '${req.body[language[i]].includes('read') ?  'read'  : ''}',  '${req.body[language[i]].includes('write') ?  'write'  : ''}', '${req.body[language[i]].includes('speak') ?  'speak'  : ''}')`;
                console.log('inserrt ',insertLanguageKnownQuery);
                db.query(insertLanguageKnownQuery, (err, result) => {
                        console.log('sgs');
                        if (err) throw err;
                        console.log("My SQL Connected via a new open connection.");
                        return res.write("data print language hindi");
                    });
            }
            // for (let i = 0; i < language.length; i++) {
            //     if (language[i] == 'hindi') {

            //         insertLanguageKnownQuery = `INSERT INTO language_known1(candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${cid}','${language[i]}', '${hindi.includes('read') ? 'read' : ''}', '${hindi.includes('write') ? 'write' : ''}', '${hindi.includes('speak') ? 'speak' : ''}')`;
            //         db.query(insertLanguageKnownQuery, (err, result) => {
            //             console.log('sgs');
            //             if (err) throw err;
            //             console.log("My SQL Connected via a new open connection.");
            //             return res.write("data print language hindi");
            //         });
            //     }
            //     if (language[i] == 'gujarati') {

            //         insertLanguageKnownQuery = `INSERT INTO language_known1(candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${cid}','${language[i]}', '${gujarati.includes('read') ? 'read' : ''}', '${gujarati.includes('write') ? 'write' : ''}', '${gujarati.includes('speak') ? 'speak' : ''}')`;
            //         db.query(insertLanguageKnownQuery, (err, result) => {
            //             if (err) throw err;
            //             console.log("My SQL Connected via a new open connection.");
            //             return res.write("data print language gujarati");
            //         });
            //     }
            //     if (language[i] == 'english') {

            //         insertLanguageKnownQuery = `INSERT INTO language_known1(candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${cid}','${language[i]}', '${english.includes('read') ? 'read' : ''}', '${english.includes('write') ? 'write' : ''}', '${english.includes('speak') ? 'speak' : ''}')`;
            //         console.log(insertLanguageKnownQuery);
            //         db.query(insertLanguageKnownQuery, (err, result) => {
            //             if (err) throw err;
            //             console.log("My SQL Connected via a new open connection.");
            //             return res.write("data print language english");
            //         });
            //     }
            // }

        }
        catch (error) {

            return res.write("Try again for lang")
        }
        try {

            let insertTechKnownQuery ;
                for(let i=0;i<tech.length;i++){

                    insertTechKnownQuery = `INSERT INTO tech_known2(candidate_id,t_name,t_level) VALUES ('${cid}','${tech[i]}', '${req.body[tech[i]]}')`;
                    console.log(insertTechKnownQuery);
                    db.query(insertTechKnownQuery, (err, result) => {
                        if (err) throw err;  
                        console.log("My SQL Connected via a new open connection.");
                        return res.write("data print tech ");
                    });
                }
        }
        catch (error) {

            return res.write("Try again for tech")
        }
        try {
            let insertRefrenceQuery;
            if(rname[0] != ''){

                for (let i = 0; i < rname.length; i++) {
    
                    insertRefrenceQuery = `INSERT INTO referance_contact(candidate_id,name,contact_number,relation) VALUES ('${cid}','${rname[i]}', '${contact[i]}', '${relation[i]}')`;
                    console.log(insertRefrenceQuery);
                    db.query(insertRefrenceQuery, (err, result) => {
                        if (err) throw err;
                        console.log("My SQL Connected via a new open connection.");
                        return res.write("data print for refrence ");
                    });
                }
            }
        }
        catch (error) {

            return res.write("Try again for refrence")
        }
        try {

            let insertPreferancesQuery = `INSERT INTO preferances(candidate_id,prefered_location,notice_period,expacted_ctc,current_ctc,department) VALUES ('${cid}','${location}', '${noticePeriod}', '${expectedCtc}','${currentCtc}','${department}')`;
            db.query(insertPreferancesQuery, (err, result) => {
                if (err) throw err;
                console.log("My SQL Connected via a new open connection.");
                return res.write("data print for Preferances ");
            });
        }
        catch (error) {

            return res.write("Try again for Preferances")
        }
    }


})

router.get('/candidates', (req,res) => {
    try{
        // let getdataq = `select * from basic_details where candidate_id = '${req.params.id}'; select * from educational_details2 where where candidate_id = '${req.params.id}';`
        // let getdataq = `select * from basic_details where candidate_id = '${req.params.id}';`
        let pageno = req.params.pageno||'1';
        
        let no_of_records_per_page = 200;
        let total_no_of_records = 50000;
        let total_no_of_pages = total_no_of_records / no_of_records_per_page;
        let startingRow = no_of_records_per_page * pageno - no_of_records_per_page;
        pageno = Number(pageno)
        let month = req.query.month || '1';
        
        let orderByfield = req.query.orderby || 'student_id';
        let orderdir = req.query.orderdir || 'asc'
        let forw = 'candidates'
        let getdataq = `select candidate_id,first_name,last_name,email,phone_number from basic_details;`
        // let getdataq = `select * from basic_details `
        // let q2= `select * from educational_details2 where candidate_id = '${req.params.id}';`
        // console.log(q2);
        // console.log('all candidis ',getdataq);
            db.query(getdataq, (err,result) => {
                // console.log('HERE',result);
                // console.log(result[0][0].dob);
                // res.render('job_application_form2_update',{data:result})
                res.render('studentExamAttendence/allStudents',{data:result,pageno: pageno,forw:forw, total: total_no_of_records, month:month,totalPage:total_no_of_pages,query:''})
            })
    }
    catch(error){
        res.write("Try again")
        return res.end()
    }
})

router.get('/candidate/:id', (req,res) => {
    try{
        // let getdataq = `select * from basic_details where candidate_id = '${req.params.id}'; select * from educational_details2 where where candidate_id = '${req.params.id}';`
        // let getdataq = `select * from basic_details where candidate_id = '${req.params.id}';`

        let getdataq = `select * from basic_details where candidate_id = '${req.params.id}';select * from educational_details2 where candidate_id = '${req.params.id}';select * from work_experience where candidate_id = '${req.params.id}'; select * from language_known1 where candidate_id = '${req.params.id}';select * from tech_known2 where candidate_id = '${req.params.id}';select * from referance_contact where candidate_id = '${req.params.id}';select * from preferances where candidate_id = '${req.params.id}';`
        // let q2= `select * from educational_details2 where candidate_id = '${req.params.id}';`
        // console.log(q2);
        console.log(getdataq);
            db.query(getdataq, (err,result) => {
                // console.log('HERE',result);
                // console.log(result[0][0].dob);
                // res.render('job_application_form2_update',{data:result})
                res.render('jobapplicationform/job_application_form3',{data:result})
            })
    }
    catch(error){
        res.write("Try again")
        return res.end()
    }
})
// app.put('/updateStudent', (req, res) => {
//     try {
//         let updateStudentsQuery = `update student_master set firstname='${req.body.fname}', lastname='${req.body.lname}', age='${req.body.age}' , number='${req.body.phoneNumber}', email = '${req.body.email}', gender='${req.body.gender}', hobbies='${req.body.hobbies}', address='${req.body.address}' where student_id = '${req.body.id}'`;

//         db.query(updateStudentsQuery, (err, result) => {
//             if(err) throw err;
//             console.log("My SQL Connected via a new open connection.");
//             res.json({"msg":{result}});
//         })
//     }
//     catch (error) {
//         res.write("Try again")
//         return res.end()
//     }
// })


router.post('/updateCandidate', (req, res) => {
    let { firstname, lastname, email, designation, phoneNumber, address, address2, city, state, gender, zip_code, relationship, dob, courseName, PassigYear, Percentage, cname, cdesignation, cfrom1, cto1, language, hindi, gujarati, english,tech, php, mysql, laravel, oracle, rname, contact, relation, location, noticePeriod, expectedCtc, currentCtc, department } = req.body;
    try {
        console.log(req.body.id);

        let updateCandidateBasicDetailQuery = `update basic_details set first_name='${firstname}', last_name='${lastname}',  email = '${email}',designation='${designation}' , phone_number='${phoneNumber}',address1='${address}',address2='${address2}',city='${city}',state='${state}', gender='${gender}', zipcode='${zip_code}', relation_ship_status='${relationship}', dob='${dob}' where candidate_id = '${req.body.id}'`;
        console.log(updateCandidateBasicDetailQuery);

        db.query(updateCandidateBasicDetailQuery, (err, result) => {
            if(err) throw err;
            console.log("My SQL Connected via a new open connection.");
            // res.json({"msg":{result}});
            res.end('updated')
        })
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
    try {
        console.log(req.body.id,req.body.edu_id);
        let edu_id = req.body.edu_id;
        let updateCandidateEducationalQuery;
        for (let i = 0; i < courseName.length; i++) {

            updateCandidateEducationalQuery = `update educational_details2 set course_name='${courseName[i]}', passing_year='${PassigYear[i]}',  percentage = '${Percentage[i]}' where candidate_id='${req.body.id}' and id='${edu_id[i]}'`;
            console.log(updateCandidateEducationalQuery)
            db.query(updateCandidateEducationalQuery, (err, result) => {
                if(err) throw err;
                console.log("My SQL Connected via a new open connection.");
                // if(!result.affectedRows){
                //     console.log(i,' i am not affected');
                //     let  updateInsertEducationQuery = `INSERT INTO educational_details2(candidate_id,course_name,passing_year,percentage) VALUES ('${cid}','${courseName[i]}', '${PassigYear[i]}', '${Percentage[i]}')`;
                //     db.query(updateInsertEducationQuery, (err, result) => {
                //         if (err) throw err;
                //         console.log("My SQL Connected via a new open connection.");
                //     });
                // }
                // res.json({"msg":{result}});
                res.end('updated')
            })
        }


    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
    try {
        console.log(req.body.id);
        let exp_id = req.body.exp_id;
        let updateCandidateWorkExperienceQuery ;
        for (let i = 0; i <  cname.length; i++) {
            updateCandidateWorkExperienceQuery = `update work_experience set company_name='${cname[i]}', designation='${cdesignation[i]}',  from_1 = '${cfrom1[i]}',to_1='${cto1[i]}' where candidate_id = '${req.body.id}' and id='${exp_id[i]}'`;
    
            db.query(updateCandidateWorkExperienceQuery, (err, result) => {
                if(err) throw err;
                console.log("My SQL Connected via a new open connection.");
                // res.json({"msg":{result}});
                res.end('updated')
            })
        }
       
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
    try {
        console.log(req.body.id);
        let updateCandidateLanguageQuery;
        for (let i = 0; i < language.length; i++) {
        updateCandidateLanguageQuery= `update language_known1 set language_name='${language[i]}', lang_read='${req.body[language[i]][0] || ''}',  lang_write = '${req.body[language[i]][1] || ''}',lang_speak='${req.body[language[i]][2] || ''}'  where candidate_id = '${req.body.id}' and language_name='${language[i]}'`;
 
        db.query(updateCandidateLanguageQuery, (err, result) => {
            if(err) throw err;
            console.log("My SQL Connected via a new open connection.");
            // console.log('result che aa2',result);
            // console.log(language,hindi,gujarati,english);
            if(!result.affectedRows){
                // console.log(i,' i am not affected');
                let updateInsertQuery = `INSERT INTO language_known1(candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${req.body.id}','${language[i]}', '${req.body[language[i]].includes('read') ?  'read'  : ''}', '${req.body[language[i]].includes('write') ?  'write'  : ''}', '${req.body[language[i]].includes('speak')?'speak':''}')`;
                db.query(updateInsertQuery, (err, result) => {
                    if (err) throw err;
                    console.log("My SQL Connected via a new open connection.");
                });
            }
            // res.json({"msg":{result}});
            res.end('updated')
        })
    }
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
    try {
        console.log(req.body.id);
        let updateCandidateTechQuery;
        console.log(tech);
        for (let i = 0; i < tech.length; i++) {
            updateCandidateTechQuery= `update tech_known2 set t_name='${tech[i]}', t_level='${req.body[tech[i]][0] || ''}' where candidate_id = '${req.body.id}' and t_name='${tech[i]}'`;
 
        db.query(updateCandidateTechQuery, (err, result) => {
            if(err) throw err;
            console.log("My SQL Connected via a new open connection.");
            console.log('tech nu update result',result);
            if(!result.affectedRows){

                let updateInsertTechKnownQuery = `INSERT INTO tech_known2(candidate_id,t_name,t_level) VALUES ('${req.body.id}','${tech[i]}', '${req.body[tech[i]]}')`;
                        console.log(updateInsertTechKnownQuery);
                        db.query(updateInsertTechKnownQuery, (err, result) => {
                            if (err) throw err;  
                            console.log("My SQL Connected via a new open connection.");
                            return res.write("data print tech ");
                        });
                // res.json({"msg":{result}});
                res.end('updated')
            }
        })
    }
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
    try {
        console.log(req.body.id);
        let updateCandidateRefQuery;
        let ref_id = req.body.ref_id;
        for (let i = 0; i < rname.length; i++) {
            updateCandidateRefQuery= `update referance_contact set name='${rname[i]}', contact_number='${contact[i]}',relation='${relation[i]}' where candidate_id = '${req.body.id}' and id='${ref_id[i]}'`;
 
        db.query(updateCandidateRefQuery, (err, result) => {
            if(err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.end('updated')
        })
    }
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
    try {
        console.log(req.body.id);
        let updateCandidatePrefQuery;
        let ref_id = req.body.ref_id;
            updateCandidatePrefQuery= `update preferances set prefered_location='${location}', notice_period='${noticePeriod}',expacted_ctc='${expectedCtc}', department='${department}' where candidate_id = '${req.body.id}'`;
 
        db.query(updateCandidatePrefQuery, (err, result) => {
            if(err) throw err;
            console.log("My SQL Connected via a new open connection.");
            res.end('updated')
        })
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})
    
// router.delete('/deleteStudent/:id', (req, res) => {
//     try {
//         let deleteStudentsQuery = `delete from student_master where student_id = '${req.params.id}'`;


//         db.query(deleteStudentsQuery, (err, result) => {
//             if (err) throw err;
//             console.log("My SQL Connected via a new open connection.");
//             res.json({ "msg": { result } });
//         })
//     }
//     catch (error) {
//         res.write("Try again")
//         return res.end()
//     }
// })

module.exports = router