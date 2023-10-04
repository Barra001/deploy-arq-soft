import { AppException } from "../exception_filter/app.exception";

export class GameAlreadyExistsException extends AppException {
  constructor() {
    super(409, "Game already exists");
  }
}

export class GameInvalidName extends AppException {
  constructor() {
    super(400, "Game Invalid Name");
  }
}

export class GameInvalidCode extends AppException {
    constructor() {
      super(400, "Game Invalid Code");
    }
  }

export class GameInconsistentDates extends AppException {
  constructor() {
    super(400, "Game Inconsistents Dates");
  }
}

export class GameInsertDates extends AppException {
  constructor() {
    super(400, "Game Insert Dates");
  }
}
