part of 'portfolio_bloc.dart';

enum PortfolioStatus {
  initial,
  success,
  failure,
  loading,
  transactionDone,
  tansactionLoading,
  transactionFailure,
  transactionSuccesNotified,
  insufficientFundsError,
  insufficientStocksError,
  insufficientStocksToBuy;

  bool get isLoading => this == PortfolioStatus.loading;
  bool get isSuccess => this == PortfolioStatus.success;
  bool get isFailure => this == PortfolioStatus.failure;
  bool get isTransactionDone => this == PortfolioStatus.transactionDone;
  bool get isTransactionLoading => this == PortfolioStatus.tansactionLoading;
  bool get isTransactionFailure => this == PortfolioStatus.transactionFailure;
  bool get isTransactionSuccesNotified =>
      this == PortfolioStatus.transactionSuccesNotified;
  bool get isInsufficientFundsError =>
      this == PortfolioStatus.insufficientFundsError;
  bool get isInsufficientStocksError =>
      this == PortfolioStatus.insufficientStocksError;
  bool get isInsufficientStocksToBuy =>
      this == PortfolioStatus.insufficientStocksToBuy;
}

class PortfolioState extends Equatable {
  const PortfolioState({
    required this.status,
    required this.portfolio,
    required this.moneyAvailable,
    required this.gameStocks,
    required this.quantityToTransact,
    required this.stockToTransact,
  });
  const PortfolioState.initial()
      : this(
          status: PortfolioStatus.initial,
          portfolio: const [],
          moneyAvailable: 0,
          gameStocks: const [],
          stockToTransact: null,
          quantityToTransact: 0,
        );

  final PortfolioStatus status;
  final List<({int quantity, Stock stock})> portfolio;
  final double moneyAvailable;
  final List<Stock> gameStocks;
  final int quantityToTransact;
  final Stock? stockToTransact;

  double get totaStocklValue => portfolio.fold<double>(
        0,
        (previousValue, element) =>
            previousValue + element.quantity * element.stock.unitValue,
      );

  double get totalValue => totaStocklValue + moneyAvailable;

  PortfolioState copyWith({
    PortfolioStatus? status,
    List<({int quantity, Stock stock})>? portfolio,
    double? moneyAvailable,
    List<Stock>? gameStocks,
    int? quantityToTransact,
    Stock? stockToTransact,
  }) {
    return PortfolioState(
      status: status ?? this.status,
      portfolio: portfolio ?? this.portfolio,
      moneyAvailable: moneyAvailable ?? this.moneyAvailable,
      gameStocks: gameStocks ?? this.gameStocks,
      quantityToTransact: quantityToTransact ?? this.quantityToTransact,
      stockToTransact: stockToTransact ?? this.stockToTransact,
    );
  }

  @override
  List<Object?> get props => [
        status,
        portfolio,
        moneyAvailable,
        gameStocks,
        quantityToTransact,
        stockToTransact,
      ];
}
