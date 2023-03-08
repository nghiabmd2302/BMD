import * as bcrypt from "bcryptjs"
import { Error } from "../services/errorService/ErrorService";
export const hashPassword = async (password: string) => {
   try {
       return await bcrypt.hash(password, 12);
   }catch(err) {
       throw Error.internalServer(err.message, {})
   }
}

export const comparePassword = async (inputPassword: string, oldPassword: string) => {
    if(! await bcrypt.compareSync(inputPassword, oldPassword)) {
        throw Error.badRequest("Mật khẩu sai!", {})
    }
    return true
}
