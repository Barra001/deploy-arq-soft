import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';

class StockDetailsRoute extends StatelessWidget {
  const StockDetailsRoute({
    required this.stock,
    required this.isForSearch,
    super.key,
  });

  final Stock stock;

  final bool isForSearch;
  static Route<void> route({required Stock stock, bool isForSearch = false}) {
    return MaterialPageRoute(
      builder: (context) {
        return StockDetailsRoute(
          stock: stock,
          isForSearch: isForSearch,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final bloc = StockDetailsBloc(
      gameRepository: context.read<GameRepository>(),
      stock: stock,
      isForSearch: isForSearch,
    )
      ..add(const RecomendationRequested())
      ..add(const NewsRequested());

    if (isForSearch) {
      bloc.add(const StockVolumeRequested());
    } else {
      bloc
        ..add(const TransactionsRequested())
        ..add(const StockDetailsRequested());
    }
    return BlocProvider.value(
      value: bloc,
      child: StockDetailsView(
        isForSearch: isForSearch,
      ),
    );
  }
}
