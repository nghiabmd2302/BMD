import { Response as Res } from "express"

export class ResponseService {
    sendOK (res: Res, data: any = {}, message: string = "") {
        // @ts-ignore
        res.status(200).json({
            message,
            data,
            status: true
        })
    }

    sendError (res: Res, data: any = {}, message: string = "") {
        // @ts-ignore
        res.status(400).json({
            message,
            data,
            status: false
        })
    }
}

export const Responses = new ResponseService()