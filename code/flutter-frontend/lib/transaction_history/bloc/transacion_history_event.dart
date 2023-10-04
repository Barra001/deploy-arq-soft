part of 'transacion_history_bloc.dart';

sealed class TransacionHistoryEvent extends Equatable {
  const TransacionHistoryEvent();

  @override
  List<Object> get props => [];
}

class SelectedStartDate extends TransacionHistoryEvent {
  const SelectedStartDate(this.startDate);

  final DateTime startDate;

  @override
  List<Object> get props => [startDate];
}

class SelectedEndDate extends TransacionHistoryEvent {
  const SelectedEndDate(this.endDate);

  final DateTime endDate;

  @override
  List<Object> get props => [endDate];
}

class StockRequested extends TransacionHistoryEvent {
  const StockRequested();

  @override
  List<Object> get props => [];
}

class TransactionsRequested extends TransacionHistoryEvent {
  const TransactionsRequested({required this.isNewSearch});
  final bool isNewSearch;
  @override
  List<Object> get props => [isNewSearch];
}

class TransactionRequestedDroppable extends TransactionsRequested {
  const TransactionRequestedDroppable() : super(isNewSearch: false);
}

class TransactionRequestedSearch extends TransactionsRequested {
  const TransactionRequestedSearch() : super(isNewSearch: true);
}

class SelectedStock extends TransacionHistoryEvent {
  const SelectedStock(this.stockCode);

  final String stockCode;

  @override
  List<Object> get props => [stockCode];
}

class RemoveStartDate extends TransacionHistoryEvent {
  const RemoveStartDate();

  @override
  List<Object> get props => [];
}

class RemoveEndDate extends TransacionHistoryEvent {
  const RemoveEndDate();

  @override
  List<Object> get props => [];
}
