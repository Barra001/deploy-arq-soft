import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:equatable/equatable.dart';
import 'package:game_repository/game_repository.dart';

part 'transacion_history_event.dart';
part 'transacion_history_state.dart';

class TransacionHistoryBloc
    extends Bloc<TransacionHistoryEvent, TransacionHistoryState> {
  TransacionHistoryBloc({required GameRepository gameRepository})
      : _gameRepository = gameRepository,
        super(const TransacionHistoryState.initial()) {
    on<SelectedStartDate>(_onSelectedStartDate);
    on<SelectedEndDate>(_onSelectedEndDate);
    on<StockRequested>(_onStockRequested);
    on<TransactionRequestedDroppable>(
      _onGetTransactions,
      transformer: droppable(),
    );
    on<TransactionRequestedSearch>(
      _onGetTransactions,
    );
    on<SelectedStock>(
      _onSelectedStock,
    );
    on<RemoveStartDate>(
      _onRemoveStartDate,
    );
    on<RemoveEndDate>(
      _onRemoveEndDate,
    );
  }

  final GameRepository _gameRepository;

  /// The number of transactions to load at once.
  static const limit = 12;
  Future<void> _onStockRequested(
    StockRequested event,
    Emitter<TransacionHistoryState> emit,
  ) async {
    emit(state.copyWith(stocksStatus: StocksStatus.loading));
    try {
      final stocks = await _gameRepository.getGameStocks(limit: 9999);
      emit(
        state.copyWith(
          stocksStatus: StocksStatus.loaded,
          gameStocks: stocks,
        ),
      );
    } catch (e) {
      emit(state.copyWith(stocksStatus: StocksStatus.failure));
    }
  }

  void _onSelectedStartDate(
    SelectedStartDate event,
    Emitter<TransacionHistoryState> emit,
  ) {
    emit(state.copyWith(startDate: event.startDate));
  }

  void _onSelectedEndDate(
    SelectedEndDate event,
    Emitter<TransacionHistoryState> emit,
  ) {
    emit(state.copyWith(endDate: event.endDate));
  }

  void _onSelectedStock(
    SelectedStock event,
    Emitter<TransacionHistoryState> emit,
  ) {
    emit(state.copyWith(selectedStockCode: event.stockCode));
  }

  Future<void> _onGetTransactions(
    TransactionsRequested event,
    Emitter<TransacionHistoryState> emit,
  ) async {
    emit(
      state.copyWith(
        transactionsStatus: TransacionsStatus.loading,
        transactions: event.isNewSearch ? [] : null,
        hasReachedMax: false,
      ),
    );
    try {
      final cloudTransactions = await _gameRepository.getPlayerTransactions(
        from: state.startDate,
        until: state.endDate,
        skip: event.isNewSearch ? null : state.transactions.length,
        stockCode: state.selectedStockCode == 'no-filter'
            ? null
            : state.selectedStockCode,
        limit: TransacionHistoryBloc.limit,
      );

      final savedTransactions =
          event.isNewSearch ? <Transaction>[] : state.transactions;

      emit(
        state.copyWith(
          transactionsStatus: TransacionsStatus.loaded,
          transactions: [...savedTransactions, ...cloudTransactions],
          hasReachedMax: cloudTransactions.length < TransacionHistoryBloc.limit,
        ),
      );
    } catch (e) {
      emit(state.copyWith(transactionsStatus: TransacionsStatus.failure));
    }
  }

  void _onRemoveStartDate(
    RemoveStartDate event,
    Emitter<TransacionHistoryState> emit,
  ) {
    emit(state.copyWith(removeStartDate: true));
  }

  void _onRemoveEndDate(
    RemoveEndDate event,
    Emitter<TransacionHistoryState> emit,
  ) {
    emit(state.copyWith(removeEndDate: true));
  }
}
