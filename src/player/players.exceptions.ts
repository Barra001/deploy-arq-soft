import { AppException } from "../exception_filter/app.exception";

export class PlayerAlreadyExistsException extends AppException {
  constructor() {
    super(409, "Player already exists");
  }
}

export class PlayerInvalidName extends AppException {
  constructor() {
    super(400, "Player Invalid Name");
  }
}

export class PlayerInvalidPassword extends AppException {
  constructor() {
    super(400, "Player Invalid Password");
  }
}

export class PlayerInvalidMail extends AppException {
  constructor() {
    super(400, "Player Invalid Mail");
  }
}
export class GameNotFoundException extends AppException {
  constructor() {
    super(404, "Game code not found");
  }
}
