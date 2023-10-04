part of 'stock_details_bloc.dart';

abstract class StockDetailsEvent extends Equatable {
  const StockDetailsEvent();
}

class StockDetailsRequested extends StockDetailsEvent {
  const StockDetailsRequested();

  @override
  List<Object?> get props => [];
}

class TransactionsRequested extends StockDetailsEvent {
  const TransactionsRequested();

  @override
  List<Object?> get props => [];
}

class NewsRequested extends StockDetailsEvent {
  const NewsRequested();

  @override
  List<Object?> get props => [];
}

class RecomendationRequested extends StockDetailsEvent {
  const RecomendationRequested();

  @override
  List<Object?> get props => [];
}

class StockVolumeRequested extends StockDetailsEvent {
  const StockVolumeRequested();

  @override
  List<Object?> get props => [];
}
