import express from "express"
import controller from "./productcontroller"
import checkAuth from "../middleware/checkAuth"

const router = express.Router()

router.post(`/addproduct`,
    checkAuth.user,
    controller.addProduct
)

export default router