import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/external_api/external_api.dart';

part 'portfolio_event.dart';
part 'portfolio_state.dart';

class PortfolioBloc extends Bloc<PortfolioEvent, PortfolioState> {
  PortfolioBloc({required GameRepository gameRepository})
      : _gameRepository = gameRepository,
        super(const PortfolioState.initial()) {
    on<PortfolioRequested>(_onPortfolioRequested);
    on<QuantityToTransactChanged>(_onQuantityToTransactChanged);
    on<TransactionRequest>(_onTransactionRequest);
  }
  final GameRepository _gameRepository;

  Future<void> _onPortfolioRequested(
    PortfolioRequested event,
    Emitter<PortfolioState> emit,
  ) async {
    emit(state.copyWith(status: PortfolioStatus.loading));
    try {
      final playerDataRequest = _gameRepository.getPlayer();
      final stocksOnGameRequest = _gameRepository.getGameStocks(limit: 9999);
      final playerData = await playerDataRequest;
      final stocksOnGame = await stocksOnGameRequest;
      emit(
        state.copyWith(
          status: PortfolioStatus.success,
          moneyAvailable: playerData.balance,
          gameStocks: stocksOnGame,
          portfolio: playerData.portfolio
              .map(
                (purchaseInfo) => (
                  stock: stocksOnGame.firstWhere(
                    (element) => element.code == purchaseInfo.stockCode,
                  ),
                  quantity: purchaseInfo.quantity
                ),
              )
              .toList(),
        ),
      );
    } catch (e) {
      emit(state.copyWith(status: PortfolioStatus.failure));
    }
  }

  void _onQuantityToTransactChanged(
    QuantityToTransactChanged event,
    Emitter<PortfolioState> emit,
  ) {
    emit(state.copyWith(quantityToTransact: event.quantityToBuy));
  }

  Future<void> _onTransactionRequest(
    TransactionRequest event,
    Emitter<PortfolioState> emit,
  ) async {
    emit(state.copyWith(status: PortfolioStatus.tansactionLoading));
    try {
      if (event.isToBuy) {
        await _gameRepository.buyStock(
          stockCode: event.stock.code,
          quantity: event.quantity,
        );
      } else {
        await _gameRepository.sellStock(
          stockCode: event.stock.code,
          quantity: event.quantity,
        );
      }
      emit(
        state.copyWith(
          status: PortfolioStatus.transactionDone,
          quantityToTransact: 0,
        ),
      );
      add(const PortfolioRequested());
    } on ExternalApiError catch (e) {
      if (e.message.contains('Fondos insuficientes')) {
        emit(
          state.copyWith(
            status: PortfolioStatus.insufficientFundsError,
            quantityToTransact: 0,
          ),
        );
        return;
      }
      if (e.message.contains('No tienes suficientes acciones')) {
        emit(
          state.copyWith(
            status: PortfolioStatus.insufficientStocksError,
            quantityToTransact: 0,
          ),
        );
        return;
      }
      if (e.message
          .contains('No hay suficientes acciones de este stock para comprar')) {
        emit(
          state.copyWith(
            status: PortfolioStatus.insufficientStocksToBuy,
            quantityToTransact: 0,
          ),
        );
        return;
      }
    } on Exception catch (_) {
      emit(
        state.copyWith(
          status: PortfolioStatus.transactionFailure,
          quantityToTransact: 0,
        ),
      );
    }
  }
}
