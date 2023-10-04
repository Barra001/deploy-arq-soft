import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:equatable/equatable.dart';
import 'package:game_repository/game_repository.dart';
import 'package:rxdart/rxdart.dart';

part 'search_event.dart';
part 'search_state.dart';

EventTransformer<Event> debounceSequential<Event>(Duration duration) {
  return (events, mapper) => events.debounceTime(duration).asyncExpand(mapper);
}

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  SearchBloc({required GameRepository gameRepository})
      : _gameRepository = gameRepository,
        super(const SearchState.initial()) {
    on<StocksRequestedDroppable>(
      _getStocks,
      transformer: droppable(),
    );
    on<StocksRequestSearch>(
      _getStocks,
      transformer: debounceSequential(const Duration(milliseconds: 400)),
    );
  }
  late final GameRepository _gameRepository;

  /// The number of stocks to load at once.
  static const limit = 12;

  Future<void> _getStocks(
    StocksRequested event,
    Emitter<SearchState> emit,
  ) async {
    final newSearch = event.query != null && event.query != state.lastQuery;

    emit(
      state.copyWith(
        status: SearchStatus.loading,
        stocks: newSearch ? [] : null,
        hasReachedMax: false,
      ),
    );

    try {
      final cloudStocks = await _gameRepository.getGameStocks(
        skip: newSearch ? null : state.stocks.length,
        limit: limit,
        query: newSearch ? event.query : state.lastQuery,
      );

      final savedStocks = newSearch ? <Stock>[] : state.stocks;

      emit(
        state.copyWith(
          stocks: [...savedStocks, ...cloudStocks],
          status: SearchStatus.loaded,
          hasReachedMax: cloudStocks.length < limit,
          lastQuery: event.query,
        ),
      );
    } catch (_) {
      emit(
        state.copyWith(
          status: SearchStatus.error,
        ),
      );
    }
  }
}
