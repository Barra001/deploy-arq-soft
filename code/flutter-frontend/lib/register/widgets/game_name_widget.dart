import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/register/register.dart';

class GameCodeWidget extends StatelessWidget {
  const GameCodeWidget({required this.isEnabled, super.key});
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final gameName = context.select((RegisterBloc bloc) => bloc.state.codeGame);
    return TextField(
      enabled: isEnabled,
      onChanged: (value) =>
          context.read<RegisterBloc>().add(GameCodeChanged(value)),
      decoration: InputDecoration(
        hintText: 'Código del juego',
        errorText: gameName.getErrorString(),
      ),
    );
  }
}
