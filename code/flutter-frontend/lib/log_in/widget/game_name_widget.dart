import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/log_in/log_in.dart';

class GameNameWidget extends StatelessWidget {
  const GameNameWidget({required this.isEnabled, super.key});
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final gameName = context.select((LogInBloc bloc) => bloc.state.gameName);
    return TextField(
      enabled: isEnabled,
      onChanged: (value) =>
          context.read<LogInBloc>().add(GameNameChanged(value)),
      decoration: InputDecoration(
        hintText: 'Game name',
        errorText: gameName.getErrorString(),
      ),
    );
  }
}
