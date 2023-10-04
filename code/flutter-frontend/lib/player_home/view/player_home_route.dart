import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/player_home/player_home.dart';
import 'package:user_repository/user_repository.dart';

class PlayerHomeRoute extends StatelessWidget {
  const PlayerHomeRoute({super.key});

  static Route<void> route() {
    return MaterialPageRoute(
      builder: (context) {
        return const PlayerHomeRoute();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          PlayerHomeBloc(userRepository: context.read<UserRepository>()),
      child: const PlayerHomeView(),
    );
  }
}
