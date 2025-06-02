import express from 'express';
import { AsyncHandler } from '../../utils/asyncHandler';
import { authController } from '../../controller/auth';


const router = express.Router();

router.post(
    '/signup',
     AsyncHandler(authController.Signup)
    );


export const AuthRoutes = router;