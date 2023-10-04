import { AppException } from "./../exception_filter/app.exception";

export class UnsufficientFundsException extends AppException {
  constructor() {
    super(400, "Fondos insuficientes");
  }
}

export class InvalidStockCodeException extends AppException {
  constructor() {
    super(400, "No hay acciones asociadas a este código");
  }
}

export class InsufficientStockToSellException extends AppException {
  constructor() {
    super(400, "No tienes suficientes acciones de este stock para vender");
  }
}

export class InsufficientSharesToBuyException extends AppException {
  constructor() {
    super(400, "No hay suficientes acciones de este stock para comprar");
  }
}
