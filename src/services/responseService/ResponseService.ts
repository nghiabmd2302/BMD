import { Response as Res } from "express"

export class ResponseService {
    resOk (res: Res, data: any = {}, message: string = "") {
        // @ts-ignore
        res.status(200).json({
            message,
            data,
            status: true
        })
    }

    resCount (res: Res, data: any = {}, total: number = 0, message: string = "") {
        // @ts-ignore
        res.status(200).json({
            message,
            data,
            status: true
        })
    }
}

export const Responses = new ResponseService()