import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";
import careersRouter from "./careers";
import chatRouter from "./chat";
import contentRouter from "./content";
import bookingsRouter from "./bookings";

import { adminAuthRouter } from "../lib/admin-auth";

import { siteContentRouter } from "./site-content";

import { bookingRepliesRouter } from "./booking-replies";

const router: IRouter = Router();
router.use(bookingRepliesRouter);
router.use(siteContentRouter);
router.use(adminAuthRouter);

router.use(healthRouter);
router.use(contactRouter);
router.use(newsletterRouter);
router.use(careersRouter);
router.use(chatRouter);
router.use(contentRouter);
router.use(bookingsRouter);

export default router;
