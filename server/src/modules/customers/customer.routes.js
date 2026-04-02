import express from "express";
import { protect } from "../../middleware/auth.js";
import {
    createCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from "./customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", protect, createCustomer);
router.put("/:id", protect, updateCustomer);
router.delete("/:id", protect, deleteCustomer);

export default router;
