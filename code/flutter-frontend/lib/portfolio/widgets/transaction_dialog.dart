import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/context.dart';
import 'package:stock_simulation_game/portfolio/portfolio.dart';

class TransactionDialog extends StatefulWidget {
  const TransactionDialog({
    required this.allStocks,
    required this.fatherContext,
    required this.isToBuy,
    super.key,
  });
  final List<Stock> allStocks;
  final BuildContext fatherContext;
  final bool isToBuy;
  static void showBuyDialog(
    BuildContext fatherContext,
    List<Stock> allStocks, {
    required bool isToBuy,
  }) {
    showDialog<String>(
      context: fatherContext,
      builder: (BuildContext context) => TransactionDialog(
        allStocks: allStocks,
        fatherContext: fatherContext,
        isToBuy: isToBuy,
      ),
    );
  }

  @override
  State<TransactionDialog> createState() => _TransactionDialogState();
}

class _TransactionDialogState extends State<TransactionDialog> {
  int _selectedPrefixIndex = 0;
  int quantityToTransact = 0;
  @override
  Widget build(BuildContext context) {
    final portfolio =
        widget.fatherContext.read<PortfolioBloc>().state.portfolio;
    final stocksThePlayerHas = portfolio.map((e) => e.stock).toList();
    final theStockToUse =
        widget.isToBuy ? widget.allStocks : stocksThePlayerHas;
    return Dialog(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: SizedBox(
          width: 400,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Stock:',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 17),
                  ),
                  DropdownButton<Stock>(
                    value: theStockToUse[_selectedPrefixIndex],
                    icon: const Icon(Icons.expand_more),
                    items: theStockToUse
                        .map(
                          (e) => DropdownMenuItem<Stock>(
                            value: e,
                            child: SizedBox(
                              width: 200,
                              child: Text(
                                '${e.name}  \$${formatter.format(e.unitValue)}',
                              ),
                            ),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      setState(() {
                        if (value != null) {
                          _selectedPrefixIndex = theStockToUse.indexOf(
                            value,
                          );
                        }
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 15),
              TextField(
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                decoration: const InputDecoration(
                  hintText: 'Cantidad',
                ),
                onChanged: (value) {
                  widget.fatherContext.read<PortfolioBloc>().add(
                        QuantityToTransactChanged(
                          value.isEmpty ? 0 : int.parse(value),
                        ),
                      );

                  setState(() {
                    quantityToTransact = value.isEmpty ? 0 : int.parse(value);
                  });
                },
              ),
              const SizedBox(height: 15),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  TextButton(
                    onPressed: () {
                      context.pop();
                    },
                    child: const Text(
                      'Cerrar',
                      style: TextStyle(color: Colors.red),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: quantityToTransact <= 0
                        ? null
                        : () {
                            context.pop();
                            showConfirmTransactionDialog(
                              widget.fatherContext,
                              theStockToUse[_selectedPrefixIndex],
                              isToBuy: widget.isToBuy,
                            );
                          },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      minimumSize: const Size(0, 40),
                    ),
                    child: widget.isToBuy
                        ? const Text('Comprar')
                        : const Text('Vender'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
