part of 'stock_details_bloc.dart';

enum StockDetailsStatus {
  initial,
  loading,
  loaded,
  failure;

  bool get isLoading => this == StockDetailsStatus.loading;
  bool get isLoaded => this == StockDetailsStatus.loaded;
  bool get isFailure => this == StockDetailsStatus.failure;
}

class StockDetailsState extends Equatable {
  const StockDetailsState({
    required this.status,
    required this.stockTransactions,
    required this.news,
    required this.stock,
    required this.quantity,
    required this.recomendation,
    required this.stockVolume,
    required this.isForSearch,
  });
  const StockDetailsState.initial({
    required Stock stock,
    required bool isForSearch,
  }) : this(
          status: StockDetailsStatus.initial,
          stockTransactions: null,
          news: null,
          stock: stock,
          quantity: null,
          recomendation: null,
          stockVolume: null,
          isForSearch: isForSearch,
        );

  final StockDetailsStatus status;
  final List<Transaction>? stockTransactions;
  final List<News>? news;
  final Stock stock;
  final int? quantity;
  final String? recomendation;
  final int? stockVolume;
  final bool isForSearch;
  double get totalValue => stock.unitValue * (quantity ?? 0);

  StockDetailsState copyWith({
    StockDetailsStatus? status,
    List<Transaction>? stockTransactions,
    List<News>? news,
    int? quantity,
    String? recomendation,
    int? stockVolume,
    bool? isForSearch,
  }) {
    return StockDetailsState(
      stockVolume: stockVolume ?? this.stockVolume,
      status: status ?? this.status,
      stockTransactions: stockTransactions ?? this.stockTransactions,
      news: news ?? this.news,
      stock: stock,
      quantity: quantity ?? this.quantity,
      recomendation: recomendation ?? this.recomendation,
      isForSearch: isForSearch ?? this.isForSearch,
    );
  }

  @override
  List<Object?> get props => [
        status,
        stockTransactions,
        news,
        stock,
        quantity,
        recomendation,
        stockVolume,
        isForSearch,
      ];
}
