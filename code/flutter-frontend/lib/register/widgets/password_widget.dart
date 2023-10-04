import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/register/register.dart';

class PasswordWidget extends StatelessWidget {
  const PasswordWidget({
    required this.isEnabled,
    super.key,
  });
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final obscurePassword =
        context.select((RegisterBloc bloc) => bloc.state.obscurePassword);
    final password = context.select((RegisterBloc bloc) => bloc.state.password);
    return TextField(
      enabled: isEnabled,
      autocorrect: false,
      obscureText: obscurePassword,
      keyboardType: TextInputType.visiblePassword,
      onChanged: (value) =>
          context.read<RegisterBloc>().add(RegisterPasswordChanged(value)),
      decoration: InputDecoration(
        hintText: 'Contraseña',
        errorText: password.getErrorString(),
        suffixIcon: IconButton(
          icon: Icon(
            obscurePassword ? Icons.visibility : Icons.visibility_off,
          ),
          onPressed: () {
            context.read<RegisterBloc>().add(
                  RegisterPasswordVisibilityChanged(
                    obscure: !obscurePassword,
                  ),
                );
          },
        ),
      ),
    );
  }
}
