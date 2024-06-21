import express from "express";
import { authorization,payment,IPNURL } from "../controllers/pesapal.controller.js";

const router = express.Router()

router.route('/access-token')
.get(authorization)
router.route('/payment')
.get(authorization,payment)
router.route('/ipnregister')
.get(authorization,IPNURL)

export default router