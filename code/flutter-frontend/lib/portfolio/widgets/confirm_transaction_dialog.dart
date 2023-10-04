import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/context.dart';
import 'package:stock_simulation_game/portfolio/portfolio.dart';

void showConfirmTransactionDialog(
  BuildContext fatherContext,
  Stock stock, {
  required bool isToBuy,
}) {
  showDialog<String>(
    context: fatherContext,
    builder: (BuildContext context) => BlocProvider.value(
      value: fatherContext.read<PortfolioBloc>(),
      child: ConfirmTransactionDialog(
        isToBuy: isToBuy,
        fatherContext: fatherContext,
        stock: stock,
      ),
    ),
  );
}

class ConfirmTransactionDialog extends StatefulWidget {
  const ConfirmTransactionDialog({
    required this.isToBuy,
    required this.fatherContext,
    required this.stock,
    super.key,
  });
  final bool isToBuy;

  final BuildContext fatherContext;
  final Stock stock;

  @override
  State<ConfirmTransactionDialog> createState() =>
      _ConfirmTransactionDialogState();
}

class _ConfirmTransactionDialogState extends State<ConfirmTransactionDialog> {
  bool isLoading = false;
  @override
  Widget build(BuildContext context) {
    final quantityOfTransaction =
        widget.fatherContext.read<PortfolioBloc>().state.quantityToTransact;
    return BlocListener<PortfolioBloc, PortfolioState>(
      listenWhen: (previous, current) => current.status.isTransactionDone,
      listener: (context, state) {
        context.pop();
      },
      child: Dialog(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: SizedBox(
            width: 400,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.green, width: 2),
                  ),
                  child: const Icon(
                    Icons.done,
                    color: Colors.green,
                    size: 30,
                  ),
                ),
                const SizedBox(
                  width: 20,
                ),
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'En caso de confirmar va a '
                        '${widget.isToBuy ? 'adquirir' : 'vender'}'
                        ' $quantityOfTransaction '
                        'acciones de ${widget.stock.name} a un precio de'
                        ' ${formatter.format(widget.stock.unitValue)} por '
                        'acción, '
                        '${widget.isToBuy ? 'disminuyendo' : 'aumentando'} '
                        'su dinero efectivo disponible en '
                        '${formatter.format(
                          widget.stock.unitValue * quantityOfTransaction,
                        )}',
                        maxLines: 4,
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          TextButton(
                            onPressed: () {
                              context.pop();
                            },
                            child: const Text(
                              'Cancelar',
                              style: TextStyle(color: Colors.red),
                            ),
                          ),
                          if (isLoading)
                            const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(),
                            )
                          else
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.green,
                                minimumSize: const Size(0, 40),
                              ),
                              onPressed: () {
                                widget.fatherContext.read<PortfolioBloc>().add(
                                      widget.isToBuy
                                          ? BuyStock(
                                              stock: widget.stock,
                                              quantity: quantityOfTransaction,
                                            )
                                          : SellStock(
                                              stock: widget.stock,
                                              quantity: quantityOfTransaction,
                                            ),
                                    );
                                setState(() {
                                  isLoading = true;
                                });
                              },
                              child: const Text('Confirmar'),
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
      ),
    );
  }
}
