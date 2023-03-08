
import * as jwt from "jsonwebtoken"
import Staff from "../entities/StaffEntity"
import {Res} from "@tsed/common"
import { Customer } from "../entities/CustomerEntity"

export const generateToken = async (staff: Partial<Staff> | Partial<Customer>, res: Res) => {
    const token = jwt.sign({staffId: staff.id, role: staff.code}, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_EXPIRESIN}`})
    
    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ), 
        httpOnly: true,
    }

    console.log(token)

    res.status(200).cookie("token", token, options).json( {
        status: true,
        message: "",
        data: {
            token
        }
    })
}