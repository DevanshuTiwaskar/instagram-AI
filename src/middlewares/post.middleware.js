import multer from 'multer'


const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    limits: 1024 * 1024 * 5 //5MB

 })

export const handleFileUpload = upload.single('image')