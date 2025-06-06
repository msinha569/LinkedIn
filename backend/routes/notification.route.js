import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { deleteNotification, getUserNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";

const router = Router()

router.get('/',protectRoute, getUserNotifications)
router.put('/:id/read',protectRoute,markNotificationAsRead)
router.delete('/:id',protectRoute,deleteNotification)

export default router