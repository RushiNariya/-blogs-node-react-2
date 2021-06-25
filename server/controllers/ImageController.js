import { ensureToken } from '../utils/jwtUtils';
import Blog from '../Model/Blog';
import CommonResponse from '../helper/index';


const authenticateUser = async (req, res, next) => {

  try{
    // const { authorization: token } = req.headers;
    const contextResult = await ensureToken(req);
    if(contextResult){
      req.userId = contextResult.creatorId;
      return next();
    }
    throw new Error('Invalid Token');
  }
  catch(error){
    res.json(CommonResponse('error', null, error.message));
  }

}

const ImageUpload = async (req, res, next) => {

  try{
    const blog = await Blog.findById(req.body.blogId).populate('Creator','firstName lastName profession');
    if(blog){
      blog.image = req.file.filename;
      await blog.save();
      return res.status(200).json(CommonResponse('success', blog, null));
    }
    throw new Error("Blog Not Found"); 
  }
  catch(error){
    return res.json(CommonResponse('error', null, error.message));
  }

}

module.exports = {
  ImageUpload,
  authenticateUser
}