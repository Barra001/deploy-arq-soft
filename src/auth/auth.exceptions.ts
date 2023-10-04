import { AppException } from "./../exception_filter/app.exception";

export class UndefinedRoleException extends AppException {
  constructor() {
    super(400, "El rol no fue definido");
  }
}

export class UndefinedUserException extends AppException {
  constructor() {
    super(400, "El usuario no fue definido");
  }
}

export class NotEnoughPrivilegesException extends AppException {
  constructor() {
    super(403, "El usuario no tiene suficientes privilegios");
  }
}

export class NoTokenPresentException extends AppException {
  constructor() {
    super(401, "No se encontró un token de usuario en la solicitud");
  }
}

export class InvalidTokenException extends AppException {
  constructor() {
    super(401, "Token inválido");
  }
}

export class UserNotExistsException extends AppException {
  constructor() {
    super(401, "El usuario no existe");
  }
}

export class GameNotExistsException extends AppException {
  constructor() {
    super(404, "Juego no encontrado");
  }
}
