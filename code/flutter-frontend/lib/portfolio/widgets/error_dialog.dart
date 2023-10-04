import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/context.dart';
import 'package:stock_simulation_game/portfolio/portfolio.dart';

void showErrorDialog(
  BuildContext fatherContext, {
  required bool isToBuy,
}) {
  showDialog<String>(
    context: fatherContext,
    builder: (BuildContext context) => BlocProvider.value(
      value: fatherContext.read<PortfolioBloc>(),
      child: ErrorDialog(
        isToBuy: isToBuy,
        fatherContext: fatherContext,
      ),
    ),
  );
}

class ErrorDialog extends StatefulWidget {
  const ErrorDialog({
    required this.isToBuy,
    required this.fatherContext,
    super.key,
  });

  final bool isToBuy;
  final BuildContext fatherContext;

  @override
  State<ErrorDialog> createState() => _ErrorDialog();
}

class _ErrorDialog extends State<ErrorDialog> {
  bool isLoading = false;
  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: SizedBox(
          width: 300,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.warning_amber_rounded,
                color: Colors.red,
                size: 40,
              ),
              const SizedBox(
                width: 15,
              ),
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      widget.isToBuy
                          ? 'No cuenta con el efectivo suficiente para realizar'
                              ' la transaccón.'
                          : 'No cuenta con esa cantidad de acciones para '
                              'vender.',
                      maxLines: 4,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        TextButton(
                          onPressed: () {
                            widget.fatherContext.pop();
                            context.pop();
                          },
                          child: const Text(
                            'Aceptar',
                            style: TextStyle(
                              color: Colors.red,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
