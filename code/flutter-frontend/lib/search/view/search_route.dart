import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/search/search.dart';

class SearchRoute extends StatelessWidget {
  const SearchRoute({super.key});
  static Route<void> route() {
    return MaterialPageRoute(
      builder: (context) {
        return const SearchRoute();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          SearchBloc(gameRepository: context.read<GameRepository>())
            ..add(const StocksRequestedDroppable()),
      child: const SearchView(),
    );
  }
}
