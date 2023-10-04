part of 'portfolio_bloc.dart';

abstract class PortfolioEvent extends Equatable {
  const PortfolioEvent();
}

class PortfolioRequested extends PortfolioEvent {
  const PortfolioRequested();

  @override
  List<Object> get props => [];
}

class QuantityToTransactChanged extends PortfolioEvent {
  const QuantityToTransactChanged(this.quantityToBuy);

  final int quantityToBuy;

  @override
  List<Object> get props => [quantityToBuy];
}

class TransactionRequest extends PortfolioEvent {
  const TransactionRequest({
    required this.stock,
    required this.quantity,
    required this.isToBuy,
  });

  final Stock stock;
  final int quantity;
  final bool isToBuy;

  @override
  List<Object> get props => [stock, quantity, isToBuy];
}

class BuyStock extends TransactionRequest {
  const BuyStock({required super.stock, required super.quantity})
      : super(isToBuy: true);
}

class SellStock extends TransactionRequest {
  const SellStock({required super.stock, required super.quantity})
      : super(isToBuy: false);
}
