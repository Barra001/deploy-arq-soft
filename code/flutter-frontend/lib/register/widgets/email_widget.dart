import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/form.dart';
import 'package:stock_simulation_game/register/register.dart';

class EmailWidget extends StatelessWidget {
  const EmailWidget({
    required this.isEnabled,
    super.key,
  });
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final email = context.select((RegisterBloc bloc) => bloc.state.email);
    return TextField(
      enabled: isEnabled,
      onChanged: (value) {
        context.read<RegisterBloc>().add(RegisterEmailChanged(value));
      },
      decoration: InputDecoration(
        hintText: 'Email',
        errorText: email.getErrorString(),
      ),
    );
  }
}
