import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/log_in/log_in.dart';

class PasswordWidget extends StatelessWidget {
  const PasswordWidget({
    required this.isEnabled,
    super.key,
  });
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final obscurePassword =
        context.select((LogInBloc bloc) => bloc.obscurePassowrd);
    final password = context.select((LogInBloc bloc) => bloc.state.password);
    return TextField(
      enabled: isEnabled,
      autocorrect: false,
      obscureText: obscurePassword,
      keyboardType: TextInputType.visiblePassword,
      onChanged: (value) =>
          context.read<LogInBloc>().add(LoginPasswordChanged(value)),
      decoration: InputDecoration(
        hintText: 'Password',
        errorText: password.getErrorString(),
        suffixIcon: IconButton(
          icon: Icon(
            obscurePassword ? Icons.visibility : Icons.visibility_off,
          ),
          onPressed: () {
            context.read<LogInBloc>().add(
                  LoginPasswordVisibilityChanged(
                    obscure: !obscurePassword,
                  ),
                );
          },
        ),
      ),
    );
  }
}
