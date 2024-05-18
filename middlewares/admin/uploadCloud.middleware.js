const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
// Phần này code trên trang docs của nó lên không hiểu lắm
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const upload = (req, res, next) => {
  if(req.file){
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
  
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
  
    let upload = async (req) => {
      let result = await streamUpload(req);
      console.log(result);
      // Chèn link ảnh vào
      console.log(req.file);
      req.body[req.file.fieldname] = result.url; // Tải code vào thư mục uploads
      next();
    }
  
    upload(req); // vì upload là 1 hàm async await nên cần chia trường hợp để nó chờ đợi nếu không sẽ chạy ngay vào next()
  }else{
    next();
  }
};

module.exports = { upload };