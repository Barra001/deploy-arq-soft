import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/register/register.dart';
import 'package:stock_simulation_game/widgets/card_body.dart';

class RegisterView extends StatelessWidget {
  const RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    final status = context.select((RegisterBloc bloc) => bloc.state.status);
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Register',
        ),
      ),
      body: BlocListener<RegisterBloc, RegisterState>(
        listenWhen: (previous, current) => previous.status != current.status,
        listener: (context, state) {
          if (state.status.isSuccess) {
            context
              ..succesSnackBar('Register exitoso')
              ..pop();
          } else if (state.status.isFailure) {
            context.errorSnackBar(state.errorMessage);
          }
        },
        child: CardBody(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Registrarse',
                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
              ),
              const SizedBox(
                height: 25,
              ),
              EmailWidget(
                isEnabled: !status.isInProgress,
              ),
              const SizedBox(
                height: 15,
              ),
              PasswordWidget(
                isEnabled: !status.isInProgress,
              ),
              const SizedBox(
                height: 15,
              ),
              SecondPasswordWidget(
                isEnabled: !status.isInProgress,
              ),
              const SizedBox(
                height: 15,
              ),
              GameCodeWidget(isEnabled: !status.isInProgress),
              const SizedBox(
                height: 15,
              ),
              NameWidget(isEnabled: !status.isInProgress),
              const SizedBox(
                height: 15,
              ),
              if (status.isInProgress)
                const Padding(
                  padding: EdgeInsets.all(10),
                  child: CircularProgressIndicator(),
                )
              else
                ElevatedButton(
                  onPressed: () {
                    context.read<RegisterBloc>().add(
                          const RegisterRequested(),
                        );
                  },
                  child: const Text('Registrarse'),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class NameWidget extends StatelessWidget {
  const NameWidget({required this.isEnabled, super.key});
  final bool isEnabled;
  @override
  Widget build(BuildContext context) {
    final name = context.select((RegisterBloc bloc) => bloc.state.name);
    return TextField(
      enabled: isEnabled,
      onChanged: (value) =>
          context.read<RegisterBloc>().add(RegisterNameChanged(value)),
      decoration: InputDecoration(
        hintText: 'Nombre',
        errorText: name.getErrorString(),
      ),
    );
  }
}
