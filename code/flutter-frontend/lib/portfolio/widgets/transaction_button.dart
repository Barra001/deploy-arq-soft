import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/portfolio/portfolio.dart';

class TransactionButton extends StatelessWidget {
  const TransactionButton({
    required this.isToBuy,
    super.key,
  });
  final bool isToBuy;

  @override
  Widget build(BuildContext context) {
    final gameStocks =
        context.select((PortfolioBloc value) => value.state.gameStocks);
    final isLoading =
        context.select((PortfolioBloc value) => value.state.status.isLoading);
    return ElevatedButton(
      onPressed: isLoading
          ? null
          : () {
              TransactionDialog.showBuyDialog(
                context,
                gameStocks,
                isToBuy: isToBuy,
              );
            },
      style: ElevatedButton.styleFrom(
        backgroundColor: isToBuy ? Colors.green : Colors.red,
      ),
      child: Row(
        children: [
          Text(isToBuy ? 'Comprar' : 'Vender'),
          const SizedBox(
            width: 5,
          ),
          Icon(isToBuy ? Icons.add : Icons.remove, size: 20),
        ],
      ),
    );
  }
}
