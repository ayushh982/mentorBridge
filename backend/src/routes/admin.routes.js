import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";


import {
    getPendingMentors,
    approveMentor,
    rejectMentor,
    getAllUsers,
} from "../controllers/admin.controller.js";

const router = Router();

router.get(
    "/pending-mentors",
    verifyJWT,
    verifyAdmin,
    getPendingMentors
);

router.patch(
    "/approve/:id",
    verifyJWT,
    verifyAdmin,
    approveMentor
);

router.patch(
    "/reject/:id",
    verifyJWT,
    verifyAdmin,
    rejectMentor
);

router.get(
    "/users",
    verifyJWT,
    verifyAdmin,
    getAllUsers
);

export default router;