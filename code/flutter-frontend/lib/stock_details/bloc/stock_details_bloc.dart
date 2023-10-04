import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:game_repository/game_repository.dart';

part 'stock_details_event.dart';
part 'stock_details_state.dart';

class StockDetailsBloc extends Bloc<StockDetailsEvent, StockDetailsState> {
  StockDetailsBloc({
    required GameRepository gameRepository,
    required Stock stock,
    required bool isForSearch,
  })  : _gameRepository = gameRepository,
        super(
          StockDetailsState.initial(stock: stock, isForSearch: isForSearch),
        ) {
    on<StockDetailsRequested>(_onStockDetailsRequested);
    on<TransactionsRequested>(_onTransactionsRequested);
    on<NewsRequested>(_onNewsRequested);
    on<RecomendationRequested>(_onRecomendationRequested);
    on<StockVolumeRequested>(_onStockVolumeRequested);
  }

  final GameRepository _gameRepository;

  bool get everythingIsLoaded => _isEverythingLoaded([
        (state.stockTransactions != null || state.isForSearch),
        state.news != null,
        state.recomendation != null,
        (state.quantity != null || state.isForSearch),
        (state.stockVolume != null || !state.isForSearch),
      ]);

  bool _isEverythingLoaded(List<bool> list) {
    var count = 0;
    for (final element in list) {
      if (!element) {
        count++;
      }
    }
    return count <= 1;
  }

  Future<void> _onStockVolumeRequested(
    StockVolumeRequested event,
    Emitter<StockDetailsState> emit,
  ) async {
    emit(state.copyWith(status: StockDetailsStatus.loading));
    try {
      final stockVolume = await _gameRepository.getStockVolume(
        stockCode: state.stock.code,
      );

      emit(
        state.copyWith(
          status: everythingIsLoaded ? StockDetailsStatus.loaded : null,
          stockVolume: stockVolume,
        ),
      );
    } catch (e) {
      emit(state.copyWith(status: StockDetailsStatus.failure));
    }
  }

  Future<void> _onRecomendationRequested(
    RecomendationRequested event,
    Emitter<StockDetailsState> emit,
  ) async {
    emit(state.copyWith(status: StockDetailsStatus.loading));
    try {
      final recomendation = await _gameRepository.getStockRecomendation(
        stockCode: state.stock.code,
      );

      emit(
        state.copyWith(
          status: everythingIsLoaded ? StockDetailsStatus.loaded : null,
          recomendation: recomendation,
        ),
      );
    } catch (e) {
      emit(state.copyWith(status: StockDetailsStatus.failure));
    }
  }

  Future<void> _onNewsRequested(
    NewsRequested event,
    Emitter<StockDetailsState> emit,
  ) async {
    emit(state.copyWith(status: StockDetailsStatus.loading));
    try {
      final news = await _gameRepository.getNews(stockCode: state.stock.code);

      emit(
        state.copyWith(
          status: everythingIsLoaded ? StockDetailsStatus.loaded : null,
          news: news,
        ),
      );
    } catch (e) {
      emit(state.copyWith(status: StockDetailsStatus.failure));
    }
  }

  Future<void> _onTransactionsRequested(
    TransactionsRequested event,
    Emitter<StockDetailsState> emit,
  ) async {
    emit(state.copyWith(status: StockDetailsStatus.loading));
    try {
      final transactions = await _gameRepository.getPlayerTransactions(
        stockCode: state.stock.code,
        limit: 20,
      );

      emit(
        state.copyWith(
          status: everythingIsLoaded ? StockDetailsStatus.loaded : null,
          stockTransactions: transactions,
        ),
      );
    } catch (e) {
      emit(state.copyWith(status: StockDetailsStatus.failure));
    }
  }

  Future<void> _onStockDetailsRequested(
    StockDetailsRequested event,
    Emitter<StockDetailsState> emit,
  ) async {
    emit(state.copyWith(status: StockDetailsStatus.loading));
    try {
      final playerInfo = await _gameRepository.getPlayer();

      emit(
        state.copyWith(
          status: everythingIsLoaded ? StockDetailsStatus.loaded : null,
          quantity: playerInfo.portfolio
              .firstWhere(
                (element) => element.stockCode == state.stock.code,
              )
              .quantity,
        ),
      );
    } catch (e) {
      emit(state.copyWith(status: StockDetailsStatus.failure));
    }
  }
}
