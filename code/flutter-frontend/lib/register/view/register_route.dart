import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/register/register.dart';
import 'package:user_repository/user_repository.dart';

class RegisterRoute extends StatelessWidget {
  const RegisterRoute({super.key});

  static Route<void> route() {
    return MaterialPageRoute(
      builder: (context) {
        return BlocProvider(
          create: (context) =>
              RegisterBloc(userRepository: context.read<UserRepository>()),
          child: const RegisterRoute(),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return const RegisterView();
  }
}
