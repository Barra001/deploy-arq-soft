import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/log_in/log_in.dart';
import 'package:stock_simulation_game/player_home/view/view.dart';
import 'package:stock_simulation_game/register/view/register_route.dart';
import 'package:stock_simulation_game/widgets/card_body.dart';

class LogInView extends StatelessWidget {
  const LogInView({super.key});

  @override
  Widget build(BuildContext context) {
    final status = context.select((LogInBloc bloc) => bloc.state.status);
    final selectedRole =
        context.select((LogInBloc bloc) => bloc.state.selectedRole);
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Stock Simulator Game',
        ),
      ),
      body: BlocListener<LogInBloc, LogInState>(
        listenWhen: (previous, current) => previous.status != current.status,
        listener: (context, state) {
          if (state.status.isSuccess) {
            context
              ..succesSnackBar('Log in exitoso')
              ..pushReplacement(PlayerHomeRoute.route());
          } else if (state.status.isFailure) {
            context.errorSnackBar(state.errorMessage);
          }
        },
        child: CardBody(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Log in',
                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
              ),
              const SizedBox(
                height: 25,
              ),
              EmailWidget(
                isEnabled: !status.isInProgress,
              ),
              const SizedBox(
                height: 20,
              ),
              PasswordWidget(
                isEnabled: !status.isInProgress,
              ),
              const SizedBox(
                height: 20,
              ),
              GameNameWidget(isEnabled: !status.isInProgress),
              const SizedBox(
                height: 20,
              ),
              const Text(
                'Role:',
                style: TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
              ),
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Player',
                    style: TextStyle(fontWeight: FontWeight.w500, fontSize: 15),
                  ),
                  Radio(
                    value: UserRole.player,
                    groupValue: selectedRole,
                    onChanged: status.isInProgress
                        ? null
                        : (value) => context
                            .read<LogInBloc>()
                            .add(const SelectedPlayerRole()),
                  ),
                  const SizedBox(
                    width: 20,
                  ),
                  const Text(
                    'Admin',
                    style: TextStyle(fontWeight: FontWeight.w500, fontSize: 15),
                  ),
                  Radio(
                    value: UserRole.admin,
                    groupValue: selectedRole,
                    onChanged: status.isInProgress
                        ? null
                        : (value) => context
                            .read<LogInBloc>()
                            .add(const SelectedAdminRole()),
                  ),
                ],
              ),
              const SizedBox(
                height: 10,
              ),
              if (selectedRole.isAdmin)
                const Text(
                  'El rol de admin no está disponible en esta versión',
                  style: TextStyle(color: Colors.red),
                ),
              const SizedBox(
                height: 15,
              ),
              if (status.isInProgress)
                const Padding(
                  padding: EdgeInsets.all(10),
                  child: CircularProgressIndicator(),
                )
              else ...[
                ElevatedButton(
                  onPressed: () {
                    context.read<LogInBloc>().add(
                          const LoginWithEmailAndPasswordRequested(),
                        );
                  },
                  child: const Text('Log in'),
                ),
                const SizedBox(
                  height: 5,
                ),
                TextButton(
                  onPressed: status.isInProgress
                      ? null
                      : () {
                          context.push(RegisterRoute.route());
                        },
                  child: const Text('Register'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
