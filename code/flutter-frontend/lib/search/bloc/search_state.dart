part of 'search_bloc.dart';

enum SearchStatus {
  loading,
  loaded,
  error;

  bool get isLoading => this == loading;
  bool get isLoaded => this == loaded;
  bool get isError => this == error;
}

class SearchState extends Equatable {
  const SearchState({
    required this.status,
    required this.stocks,
    required this.hasReachedMax,
    required this.lastQuery,
  });

  const SearchState.initial({
    this.status = SearchStatus.loading,
    this.stocks = const <Stock>[],
    this.hasReachedMax = false,
    this.lastQuery = '',
  });

  final SearchStatus status;
  final List<Stock> stocks;
  final bool hasReachedMax;
  final String lastQuery;

  SearchState copyWith({
    SearchStatus? status,
    List<Stock>? stocks,
    bool? hasReachedMax,
    String? lastQuery,
  }) {
    return SearchState(
      status: status ?? this.status,
      stocks: stocks ?? this.stocks,
      hasReachedMax: hasReachedMax ?? this.hasReachedMax,
      lastQuery: lastQuery ?? this.lastQuery,
    );
  }

  @override
  List<Object?> get props => [
        status,
        stocks,
        hasReachedMax,
        lastQuery,
      ];
}
