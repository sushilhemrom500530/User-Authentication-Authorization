import express from 'express';
import { AsyncHandler } from '../../utils/asyncHandler';
import { authController } from '../../controller/auth';
import { validate } from '../../middleware/validate';
import { ValidationSchema } from '../../utils/validationSchema';


const router = express.Router();

router.post(
    '/signup',
    validate(ValidationSchema.Signup),
     AsyncHandler(authController.Signup)
);

router.post(
    '/signin',
    validate(ValidationSchema.Signin),
     AsyncHandler(authController.Signin)
);


export const AuthRoutes = router;