const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')

router.get('/', (req, res) => {
    // console.log(db);
    res.render('jobapplicationajax/jobapplicationajax', { data: '',mode:'insert'})
})
let cid;
//inserting data into database
router.post('/basic_details', (req, res) => {
    let { firstname, lastname, email, designation, phoneNumber, address, address2, city, state, gender, zip_code, relationship, dob, courseName, PassigYear, Percentage, cname, cdesignation, cfrom1, cto1, language, hindi, gujarati, english, tech, php, mysql, laravel, oracle, rname, contact, relation, location, noticePeriod, expectedCtc, currentCtc, department } = req.body;
    console.log('here', req.body);
    // let { firstname, lastname, email, designation, phoneNumber, address, address2, city, state, gender, zip_code, relationship, dob} = req.body;

    try {
        let insertbaiscDetailQuery = `insert into basic_details (first_name,last_name,email,designation,phone_number,address1,address2,city,state,gender,zipcode,relation_ship_status,dob) values ('${firstname}', '${lastname}', '${email}','${designation}', '${phoneNumber}','${address}', '${address2}', '${city}', '${state}','${gender}', '${zip_code}', '${relationship}',  '${dob}')`;
        console.log(insertbaiscDetailQuery);


        db.query(insertbaiscDetailQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            console.log('ji');
            // cid = result.insertId;
            console.log('cid here ',cid);
            // return res.end('Data received1.');
            res.json({ 'cid': result.insertId })
        });



    }
    catch (error) {
        res.write("Try again for basic detail")
        return res.end()
    }
})
router.post('/education', (req, res) => {
    try {
        let { cid, courseName, passingYear, percentage } = req.body;
        console.log(cid, courseName, passingYear, percentage);
        let insertEducationQuery;
        if (courseName[0] != '') {

            for (let i = 0; i < courseName.length; i++) {

                insertEducationQuery = `INSERT INTO educational_details2(candidate_id,course_name,passing_year,percentage) VALUES ('${cid}','${courseName[i]}', '${passingYear[i]}', '${percentage[i]}')`;
                console.log('DF', insertEducationQuery);


                db.query(insertEducationQuery, (err, result) => {
                    if (err) throw err;
                    console.log("My SQL Connected via a new open connection.");
                    console.log('educational');
                    return res.write("data print education");
                });
            }
        }

    }
    catch (error) {

        return res.write("Try again")
    }
})

router.post('/work_experience', (req, res) => {
    try {
        console.log('ds', req.body);
        let { cid, cname, cdesignation, cfrom1, cto1 } = req.body;
        console.log(cid, cname, cdesignation, cfrom1, cto1);
        let insertWorKExpQuery;
        console.log(cname);
        if (cname[0] != '') {
            for (let i = 0; i < cname.length; i++) {

                insertWorKExpQuery = `INSERT INTO work_experience(candidate_id,company_name,designation,from_1,to_1) VALUES ('${cid}','${cname[i]}', '${cdesignation[i]}', '${cfrom1[i]}', '${cto1[i]}')`;
                console.log(insertWorKExpQuery);
                db.query(insertWorKExpQuery, (err, result) => {
                    if (err) throw err;
                    console.log("My SQL Connected via a new open connection.");
                    console.log('work exp');
                    return res.write("data print education");
                });

            }
        }



    }
    catch (error) {

        return res.write("Try again for work Experience")
    }
})
router.post('/language_known', (req, res) => {

    try {
        let { cid, language, hindi, gujarati, english } = req.body
        console.log(language, hindi, gujarati, english);

        console.log(req.body);
        let insertLanguageKnownQuery;

        if (language[0] != '')
            for (let i = 0; i < language.length; i++) {
                insertLanguageKnownQuery = `INSERT INTO language_known1 (candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${cid}','${language[i]}',  '${req.body[language[i]].includes('read') ? 'read' : ''}',  '${req.body[language[i]].includes('write') ? 'write' : ''}', '${req.body[language[i]].includes('speak') ? 'speak' : ''}')`;
                console.log('inserrt ', insertLanguageKnownQuery);
                db.query(insertLanguageKnownQuery, (err, result) => {
                    console.log('sgs');
                    if (err) throw err;
                    console.log("My SQL Connected via a new open connection.");
                    return res.write("data print language hindi");
                });
            }

    }
    catch (error) {

        return res.write("Try again for lang")
    }
})
router.post('/tech_known', (req, res) => {


    try {
        console.log('sdgsa', req.body);
        let { cid, tech, php, mysql, laravel, oracle } = req.body
        let insertTechKnownQuery;
        for (let i = 0; i < tech.length; i++) {

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
})
router.post('/referance_contact', (req, res) => {

    try {
        let insertRefrenceQuery;
        let { cid, rname, contact, relation } = req.body
        console.log(req.body);
        console.log(cid, rname, contact, relation);
        if (rname[0] != '') {

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
})

router.post('/preferances', (req, res) => {

    try {
        let { cid, location, noticePeriod, currentCtc, expectedCtc, department } = req.body

        let insertPreferancesQuery = `INSERT INTO preferances(candidate_id,prefered_location,notice_period,expacted_ctc,current_ctc,department) VALUES ('${cid}','${location}', '${noticePeriod}', '${expectedCtc}','${currentCtc}','${department}')`;
        console.log(insertPreferancesQuery);
        db.query(insertPreferancesQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            return res.write("data print for Preferances ");
        });
    }
    catch (error) {

        return res.write("Try again for Preferances")
    }
})




router.get('/candidates',(req, res) => {
    try {
        let getdataq = `select * from basic_details `

        console.log(getdataq);
        db.query(getdataq, (err, result) => {
            console.log('H',result);
            res.render('allCandidates', { data: result,mode:'update'})
        })
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})
router.get('/candidate/:id', (req, res) => {
    try {
        // let getdataq = `select * from basic_details where candidate_id = '${req.params.id}'; select * from educational_details2 where where candidate_id = '${req.params.id}';`
        // let getdataq = `select * from basic_details where candidate_id = '${req.params.id}';`

        let getdataq = `select * from basic_details where candidate_id = '${req.params.id}';select * from educational_details2 where candidate_id = '${req.params.id}';select * from work_experience where candidate_id = '${req.params.id}'; select * from language_known1 where candidate_id = '${req.params.id}';select * from tech_known2 where candidate_id = '${req.params.id}';select * from referance_contact where candidate_id = '${req.params.id}';select * from preferances where candidate_id = '${req.params.id}';`

        console.log(getdataq);
        db.query(getdataq, (err, result) => {
            console.log('HERE',result);
            // console.log(result[0][0].dob);
            // res.render('job_routerlication_form2_update',{data:result})
            res.render('jobapplicationajax/jobapplicationajax', { data: result,mode:'update'})
        })
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})



// update router job application form
router.post('/update_basic_details', (req, res) => {
    let {cid, firstname, lastname, email, designation, phoneNumber, address, address2, city, state, gender, zip_code, relationship, dob, courseName, PassigYear, Percentage, cname, cdesignation, cfrom1, cto1, language, hindi, gujarati, english, tech, php, mysql, laravel, oracle, rname, contact, relation, location, noticePeriod, expectedCtc, currentCtc, department } = req.body;
    try {
        console.log(req.body.id);

        let updateCandidateBasicDetailQuery = `update basic_details set first_name='${firstname}', last_name='${lastname}', email = '${email}',designation='${designation}' , phone_number='${phoneNumber}',address1='${address}',address2='${address2}',city='${city}',state='${state}', gender='${gender}', zipcode='${zip_code}', relation_ship_status='${relationship}', dob='${dob}' where candidate_id = '${cid}'`;
        console.log(updateCandidateBasicDetailQuery);

        db.query(updateCandidateBasicDetailQuery, (err, result) => {
            if (err) throw err;
            console.log("My SQL Connected via a new open connection.");
            // res.json({"msg":{result}});
            res.end('updated')
        })
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }

})
router.post('/update_education', (req, res) => {

    try {
        let { cid, courseName, passingYear, percentage,edu_id } = req.body;
        console.log('d',cid, courseName, passingYear, percentage,edu_id);
        // let edu_id = req.body.edu_id;
        let updateCandidateEducationalQuery;
        for (let i = 0; i < courseName.length; i++) {

            updateCandidateEducationalQuery = `update educational_details2 set course_name='${courseName[i]}', passing_year='${passingYear[i]}',  percentage = '${percentage[i]}' where candidate_id='${cid}' and id='${edu_id[i]}'`;
            console.log(updateCandidateEducationalQuery)
            db.query(updateCandidateEducationalQuery, (err, result) => {
                if (err) throw err;
                console.log("My SQL Connected via a new open connectidfon.");
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
})

router.post('/update_work_experience', (req, res) => {
    try {
        console.log(req.body.id);
        let exp_id = req.body.exp_id;
        let updateCandidateWorkExperienceQuery;
        for (let i = 0; i < cname.length; i++) {
            updateCandidateWorkExperienceQuery = `update work_experience set company_name='${cname[i]}', designation='${cdesignation[i]}',  from_1 = '${cfrom1[i]}',to_1='${cto1[i]}' where candidate_id = '${req.body.id}' and id='${exp_id[i]}'`;

            db.query(updateCandidateWorkExperienceQuery, (err, result) => {
                if (err) throw err;
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

})

router.post('/update_language_known', (req, res) => {
    
    try {
        let { cid, language, hindi, gujarati, english } = req.body
        let updateCandidateLanguageQuery;
        for (let i = 0; i < language.length; i++) {
            updateCandidateLanguageQuery = `update language_known1 set language_name='${language[i]}', lang_read='${req.body[language[i]][0] || ''}',  lang_write = '${req.body[language[i]][1] || ''}',lang_speak='${req.body[language[i]][2] || ''}'  where candidate_id = '${cid}' and language_name='${language[i]}'`;

            db.query(updateCandidateLanguageQuery, (err, result) => {
                if (err) throw err;
                console.log("My SQL Connected via a new open connection.");
                // console.log('result che aa2',result);
                // console.log(language,hindi,gujarati,english);
                if (!result.affectedRows) {
                    // console.log(i,' i am not affected');
                    let updateInsertQuery = `INSERT INTO language_known1(candidate_id,language_name,lang_read,lang_write,lang_speak) VALUES ('${req.body.id}','${language[i]}', '${req.body[language[i]].includes('read') ? 'read' : ''}', '${req.body[language[i]].includes('write') ? 'write' : ''}', '${req.body[language[i]].includes('speak') ? 'speak' : ''}')`;
                    db.query(updateInsertQuery, (err, result) => {
                        if (err) throw err;
                        console.log("My SQL Connected via a new open connection.");
                    });
                }
                // res.json({"msg":{result}});
                res.end('updated language')
            })
        }
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

router.post('/update_tech_known', (req, res) => {
    
    try {
        let { cid, tech, php, mysql, laravel, oracle } = req.body
        let updateCandidateTechQuery;
        console.log(tech);
        for (let i = 0; i < tech.length; i++) {
            updateCandidateTechQuery = `update tech_known2 set t_name='${tech[i]}', t_level='${req.body[tech[i]][0] || ''}' where candidate_id = '${cid}' and t_name='${tech[i]}'`;

            db.query(updateCandidateTechQuery, (err, result) => {
                if (err) throw err;
                console.log("My SQL Connected via a new open connection.");
                // console.log('tech nu update result', result);
                if (!result.affectedRows) {

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
})

router.post('/update_referance_contact', (req, res) => {

    try {
        let { cid, rname, contact, relation } = req.body
        console.log(cid, rname, contact, relation );
        let updateCandidateRefQuery;
        let ref_id = req.body.ref_id;
        for (let i = 0; i < rname.length; i++) {
            updateCandidateRefQuery = `update referance_contact set name='${rname[i]}', contact_number='${contact[i]}',relation='${relation[i]}' where candidate_id = '${cid}' and id='${ref_id[i]}'`;
            console.log(updateCandidateRefQuery);

            db.query(updateCandidateRefQuery, (err, result) => {
                if (err) throw err;
                console.log("My SQL Connected via a new open connection.");
                res.end('updated')
            })
        }
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

router.post('/update_preferances', (req, res) => {
    try {
        let updateCandidatePrefQuery;
        let { cid, location, noticePeriod, currentCtc, expectedCtc, department } = req.body
        updateCandidatePrefQuery = `update preferances set prefered_location='${location}', notice_period='${noticePeriod}',expacted_ctc='${expectedCtc}',current_ctc='${currentCtc}', department='${department}' where candidate_id = '${cid}'`;
        console.log(updateCandidatePrefQuery);

        db.query(updateCandidatePrefQuery, (err, result) => {
            if (err) throw err;
            console.log('s', result);
            console.log("My SQL Connected via a new open connection.");
            res.end('updated')
        })
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})


router.get('/getcity', (req, res) => {
    try {
        let stateName = req.query.stateName;
        console.log(req);
        let getCityQuery = `select * from city where state_name = '${stateName}'`
        console.log(getCityQuery);
        db.query(getCityQuery, (err, result) => {
            console.log(result);
            res.json({ 'data': result })
        })
    } catch (error) {
        res.write("try again")
        return res.end()
    }
})


module.exports = router