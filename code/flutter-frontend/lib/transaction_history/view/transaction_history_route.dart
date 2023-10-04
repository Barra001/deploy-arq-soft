import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/transaction_history/transaction_history.dart';

class TransactionHistoryRoute extends StatelessWidget {
  const TransactionHistoryRoute({super.key});

  static Route<void> route() {
    return MaterialPageRoute(
      builder: (context) {
        return const TransactionHistoryRoute();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          TransacionHistoryBloc(gameRepository: context.read<GameRepository>())
            ..add(const StockRequested())
            ..add(const TransactionRequestedDroppable()),
      child: const TransactionHistoryView(),
    );
  }
}
