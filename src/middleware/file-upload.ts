import multer from "multer";
import { v1 as uuidv1 } from "uuid";

const MimeTypeMap: any = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const fileUpload = multer({
	// limits: 500000,
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, "uploads/images");
		},
		filename: (req, file, callback) => {
			const ext = MimeTypeMap[file.mimetype];
			callback(null, uuidv1() + "." + ext);
		},
	}),
	fileFilter: (req, file, callback) => {
		const isValid = !!MimeTypeMap[file.mimetype];
		const error = isValid ? null : new Error("Invalid File Type");
		if (error) {
			callback(error);
		} else {
			callback(null, isValid);
		}
	},
});

export = fileUpload;
