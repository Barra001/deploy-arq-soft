import { AppException } from "../exception_filter/app.exception";


export class NewsInvalidName extends AppException {
    constructor() {
        super(400, "News Invalid Name");
    }
}

export class NewsInvalidDate extends AppException {
    constructor() {
        super(400, "News Invalid Date");
    }
}

export class NewsInsertDates extends AppException {
    constructor() {
        super(400, "News Insert Dates");
    }
}
