var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var multer = require('multer')
var fs = require('fs')
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
	// file type 
		console.log(file.originalname)
		cb(null, 'app/')
		
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname+'-'+ Date.now())
	}
});
var upload = multer({storage: storage})


const SparkPolicy = require('../policies/SparkPolicy')
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express'});  
});

router.post('/sparkSubmit', SparkPolicy.sparkSubmit )
router.post('/makeList', SparkPolicy.makeList )

router.get('/spark',SparkPolicy.command)
//router.get('/yarnAll', SparkPolicy.AllYarnStates)
router.get('/yarnAllState', SparkPolicy.AllYarnStates)
router.get('/appState', SparkPolicy.appState)

router.post('/uploads',upload.single(),function(req, res, next){

})
module.exports = router;
