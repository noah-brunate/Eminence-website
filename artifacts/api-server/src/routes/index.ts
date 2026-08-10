import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";
import careersRouter from "./careers";
import chatRouter from "./chat";
import contentRouter from "./content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(newsletterRouter);
router.use(careersRouter);
router.use(chatRouter);
router.use(contentRouter);

export default router;
