part of 'transacion_history_bloc.dart';

enum TransacionsStatus {
  initial,

  failure,
  loading,
  loaded;

  bool get isFailure => this == TransacionsStatus.failure;
  bool get isLoading => this == TransacionsStatus.loading;
}

enum StocksStatus {
  initial,

  failure,
  loading,
  loaded;

  bool get isFailure => this == StocksStatus.failure;
  bool get isLoading => this == StocksStatus.loading;
}

class TransacionHistoryState extends Equatable {
  const TransacionHistoryState({
    required this.transactionsStatus,
    required this.stocksStatus,
    required this.startDate,
    required this.endDate,
    required this.gameStocks,
    required this.transactions,
    required this.hasReachedMax,
    required this.selectedStockCode,
  });
  const TransacionHistoryState.initial()
      : this(
          transactionsStatus: TransacionsStatus.initial,
          stocksStatus: StocksStatus.initial,
          startDate: null,
          endDate: null,
          gameStocks: const [],
          transactions: const [],
          hasReachedMax: false,
          selectedStockCode: null,
        );

  final TransacionsStatus transactionsStatus;
  final StocksStatus stocksStatus;
  final DateTime? startDate;
  final DateTime? endDate;
  final List<Stock> gameStocks;
  final List<Transaction> transactions;
  final bool hasReachedMax;
  final String? selectedStockCode;

  TransacionHistoryState copyWith({
    TransacionsStatus? transactionsStatus,
    StocksStatus? stocksStatus,
    DateTime? startDate,
    DateTime? endDate,
    List<Stock>? gameStocks,
    List<Transaction>? transactions,
    bool? hasReachedMax,
    String? selectedStockCode,
    bool removeStartDate = false,
    bool removeEndDate = false,
  }) {
    return TransacionHistoryState(
      stocksStatus: stocksStatus ?? this.stocksStatus,
      startDate: removeStartDate ? null : startDate ?? this.startDate,
      endDate: removeEndDate ? null : endDate ?? this.endDate,
      gameStocks: gameStocks ?? this.gameStocks,
      transactions: transactions ?? this.transactions,
      hasReachedMax: hasReachedMax ?? this.hasReachedMax,
      selectedStockCode: selectedStockCode ?? this.selectedStockCode,
      transactionsStatus: transactionsStatus ?? this.transactionsStatus,
    );
  }

  @override
  List<Object?> get props => [
        transactionsStatus,
        startDate,
        endDate,
        gameStocks,
        transactions,
        hasReachedMax,
        selectedStockCode,
        transactionsStatus,
        stocksStatus,
      ];
}
