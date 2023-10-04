"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouterWrapper = exports.MulterField = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
class MulterField {
    constructor(name, maxCount) {
        this.name = name;
        this.maxCount = maxCount;
    }
}
exports.MulterField = MulterField;
class AppRouterWrapper {
    constructor(exceptionFilterFunction, plataformActivity) {
        this.plataformActivity = plataformActivity;
        this.router = new express_1.Router();
        dotenv_1.default.config();
        this.multer = (0, multer_1.default)({
            dest: process.env.FILES_TEMP_PATH,
            limits: AppRouterWrapper.filesLimits,
        });
        this.exceptionFilterFunction = exceptionFilterFunction;
    }
    createFields(files) {
        const fields = [];
        files.forEach((file) => {
            fields.push({ name: file.name, maxCount: file.maxCount });
        });
        return fields;
    }
    post(path, endPointFunction, files = null) {
        if (files) {
            this.router.post(path, this.multer.fields(this.createFields(files)), (req, res) => endPointFunction(req, res).catch((err) => this.exceptionFilterFunction(err, req, res, this.plataformActivity)));
            return;
        }
        this.router.post(path, (req, res) => endPointFunction(req, res).catch((err) => this.exceptionFilterFunction(err, req, res, this.plataformActivity)));
    }
    get(path, endPointFunction) {
        this.router.get(path, (req, res) => endPointFunction(req, res).catch((err) => this.exceptionFilterFunction(err, req, res, this.plataformActivity)));
    }
    put(path, endPointFunction) {
        this.router.put(path, (req, res) => endPointFunction(req, res).catch((err) => this.exceptionFilterFunction(err, req, res, this.plataformActivity)));
    }
    delete(path, endPointFunction) {
        this.router.delete(path, (req, res) => endPointFunction(req, res).catch((err) => this.exceptionFilterFunction(err, req, res, this.plataformActivity)));
    }
}
exports.AppRouterWrapper = AppRouterWrapper;
AppRouterWrapper.filesLimits = {
    files: 3,
};
//# sourceMappingURL=router.wrapper.js.map