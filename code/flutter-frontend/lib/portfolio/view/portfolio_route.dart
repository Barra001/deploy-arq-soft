import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/portfolio/portfolio.dart';

class PortfolioRoute extends StatelessWidget {
  const PortfolioRoute({super.key});

  static Route<void> route() {
    return MaterialPageRoute(
      builder: (context) {
        return const PortfolioRoute();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          PortfolioBloc(gameRepository: context.read<GameRepository>())
            ..add(const PortfolioRequested()),
      child: const PortfolioView(),
    );
  }
}
