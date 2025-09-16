const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {string} imagePath - Path to the image file
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadImage = async (imagePath, folder = 'sih_uploads') => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto:good' },
        { format: 'auto' }
      ]
    });
    
    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} - Cloudinary delete result
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    throw new Error('Image deletion failed');
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  deleteImage
};