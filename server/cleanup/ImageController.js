// var express = require("express");
// var multer  = require('multer');
// import {ensureToken} from './utils/jwtUtils';
// // import { ensureToken, generateToken } from './jwtUtils';
// import Blog from './Model/Blog';
// // import CommonResponse from './helpers/index';
// import CommonResponse from './helper/index';

// var router = express.Router({
//   caseSensitive: true,
// });

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './public/images');
//     },
//     filename: (req, file, cb) => {
//       var filetype = '';
//       if(file.mimetype === 'image/gif') {
//         filetype = 'gif';
//       }
//       if(file.mimetype === 'image/png') {
//         filetype = 'png';
//       }
//       if(file.mimetype === 'image/jpeg') {
//         filetype = 'jpg';
//       }
//       cb(null, 'image-' + Date.now() + '.' + filetype);
//     }
// });
// var upload = multer({ storage: storage });

// router.use(async function (req, res, next) {
//   try{
//     // const { authorization: token } = req.headers;
//     const contextResult = await ensureToken(req);
//     if(contextResult){
//       req.userId = contextResult.creatorId;
//       return next();
//     }
//     throw new Error('Invalid Token');
//   }
//   catch(error){
//     res.json(CommonResponse('error', null, error.message));
//   }
// })

// router.post("/upload", upload.single('file'), async function (req, res) {
//   try{
//     const blog = await Blog.findById(req.body.blogId).populate('Creator','firstName lastName profession');
//     if(blog){
//       blog.image = req.file.filename;
//       await blog.save();
//       return res.status(200).json(CommonResponse('success', blog, null));
//     }
//     throw new Error("Blog Not Found"); 
//   }
//   catch(error){
//     return res.json(CommonResponse('error', null, error.message));
//   }
// });

// module.exports = router;