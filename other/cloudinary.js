const cloudinary = require("cloudinary");
cloudinary.config({ 
    cloud_name: 'dj2f01kee', 
    api_key: '296838651954556', 
    api_secret: 'SSaOjxJU7TzY3waJN8X6w_9y2Aw' 
  });
cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });