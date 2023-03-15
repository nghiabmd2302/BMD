
import * as jwt from "jsonwebtoken"
import {Staff} from "../entities/Staff"
import { Customer } from "../entities/Customer"
import {Response}from "express"
export const generateToken = async (staff: Staff | Customer, res: Response) => {
    let role = ""
    //@ts-ignore
    if(staff?.role?.name) {role = staff?.role?.name}
    //@ts-ignore
    else {role = staff.code}
    //@ts-ignore
    const token = jwt.sign({staffId: staff.id, role: role}, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_EXPIRESIN}`})
    
    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ), 
        httpOnly: true,
    }

    //@ts-ignore
    res.status(200).cookie("token", token, options).json( {
        status: true,
        message: "",
        data: {
            token
        }
    })
}