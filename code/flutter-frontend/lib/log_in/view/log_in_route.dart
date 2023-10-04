import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/log_in/log_in.dart';
import 'package:user_repository/user_repository.dart';

class LogInRoute extends StatelessWidget {
  const LogInRoute({super.key});
  static Route<void> route() {
    return MaterialPageRoute(
      builder: (context) {
        return const LogInRoute();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          LogInBloc(userRepository: context.read<UserRepository>()),
      child: const LogInView(),
    );
  }
}
