import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/register/register.dart';

class SecondPasswordWidget extends StatelessWidget {
  const SecondPasswordWidget({required this.isEnabled, super.key});
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final obscurePassword =
        context.select((RegisterBloc bloc) => bloc.state.obscurePassword);
    final password = context.select((RegisterBloc bloc) => bloc.state.password);
    final secondPassword =
        context.select((RegisterBloc bloc) => bloc.state.secondPassword);
    return TextField(
      enabled: isEnabled,
      autocorrect: false,
      obscureText: obscurePassword,
      keyboardType: TextInputType.visiblePassword,
      onChanged: (value) => context
          .read<RegisterBloc>()
          .add(RegisterSecondPasswordChanged(value)),
      decoration: InputDecoration(
        hintText: 'Repetir contraseña',
        errorText: secondPassword == password.value
            ? null
            : 'Las contraseñas no coinciden',
      ),
    );
  }
}
