import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/form.dart';
import 'package:stock_simulation_game/log_in/log_in.dart';

class EmailWidget extends StatelessWidget {
  const EmailWidget({
    required this.isEnabled,
    super.key,
  });
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final email = context.select((LogInBloc bloc) => bloc.state.email);
    return TextField(
      enabled: isEnabled,
      onChanged: (value) =>
          context.read<LogInBloc>().add(LoginEmailChanged(value)),
      decoration: InputDecoration(
        hintText: 'Email',
        errorText: email.getErrorString(),
      ),
    );
  }
}
