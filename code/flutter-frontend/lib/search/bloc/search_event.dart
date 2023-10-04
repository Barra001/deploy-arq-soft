part of 'search_bloc.dart';

sealed class SearchEvent extends Equatable {
  const SearchEvent();
}

class StocksRequested extends SearchEvent {
  const StocksRequested({
    this.query = '',
  });
  final String? query;

  @override
  List<Object?> get props => [query];
}

class StocksRequestedDroppable extends StocksRequested {
  const StocksRequestedDroppable() : super(query: null);
}

class StocksRequestSearch extends StocksRequested {
  const StocksRequestSearch({
    required super.query,
  });
}
