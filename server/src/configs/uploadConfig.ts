import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";
import { createBrotliCompress } from "zlib";
import {v4 as uuid} from 'uuid'


const multerConfig = {
    dest:'uploads'
}

const uuidRandom = (file) => {
    const result = `${uuid()}${extname(file.originalname)}`
    return result
}

export const multerOptions = {
    fileFilter:(req:any, file:any, cb:any) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png|gif|)$/)){
            cb(null,true)

        }else{
            cb(new HttpException(`Unsuported file type ${extname(file.originalname)}`,HttpStatus.BAD_REQUEST), false)
        }
    },

    storage:diskStorage({
        destination:(req:any, file:any, cb:any)=>{
            const uploadPatch = multerConfig.dest
            if(!existsSync(uploadPatch)){
                mkdirSync(uploadPatch)
            }
            cb(null, uploadPatch)
        },
        filename:(req:any, file:any, cb:any)=>{
            cb(null,uuidRandom(file))
        }
    })
}

