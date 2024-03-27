const express = require('express')
const router = express.Router()
const fs = require("fs")

router.get('/', (req, res) => {
    res.render('studentCrudFile/form')
})

router.post('/addStudent', (req, res) => {
    var uniId = Math.floor(Math.random() * 1000)

    try {
        fs.readFile('./file/studentData.json', function (err, data) {

            var temp = data.length == 0 ? [] : JSON.parse(data);
            // console.log(JSON.stringify(data));
            var temp2 = req.body;
            temp2.id = uniId;
            temp = [...temp, temp2]

            
            fs.writeFile('./file/studentData.json', JSON.stringify(temp), function (err) {
                if (err) throw err;
                console.log('writed!');
            })
            // res.render('allStudents',{data:data})
            res.write("saved")
            res.end()
        });
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }

})


router.get('/students', (req, res) => {
    try {
        fs.readFile('./file/studentData.json', function (err, data) {
            var temp = data.length == 0 ? [] : JSON.parse(data);
            // console.log(JSON.stringify(data));

            res.render('studentCrudFile/allStudents', { data: temp })

        });
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})


router.get('/students/:id', (req, res) => {
    try {
        fs.readFile('./file/studentData.json', function (err, data) {
            var temp = data.length == 0 ? [] : JSON.parse(data);
            // console.log(temp);

                var id = req.params.id;
                console.log(id);
                const userData = temp.find((user) =>
                    user.id == id
                );
                console.log(userData);
                if(userData){
                    res.render('studentCrudFile/studentDetail', { data: userData })
                }
                else{   
                    res.write('user not found')
                    res.end()
                }


        });
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})


module.exports = router