import { AppException } from "./../exception_filter/app.exception";

export class UnauthorizedModificationOfStock extends AppException {
  constructor() {
    super(401, "No está autorizado para modificar este stock");
  }
}

export class StockHasActiveTransactionsException extends AppException {
  constructor() {
    super(400, "El stock tiene transacciones activas");
  }
}

export class StockAlreadyExistsException extends AppException {
  constructor() {
    super(400, "Ya existe un stock con ese código");
  }
}

export class StockInvalidPrice extends AppException {
  constructor() {
    super(400, "El precio del stock debe ser mayor que cero");
  }
}
