import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/context.dart';
import 'package:stock_simulation_game/portfolio/portfolio.dart';
import 'package:stock_simulation_game/widgets/widgets.dart';

class PortfolioView extends StatelessWidget {
  const PortfolioView({super.key});

  @override
  Widget build(BuildContext context) {
    final blocState = context.watch<PortfolioBloc>().state;
    final isLoading = blocState.status.isLoading;
    return BlocListener<PortfolioBloc, PortfolioState>(
      listenWhen: (previous, current) => previous.status != current.status,
      listener: (context, state) {
        if (state.status.isFailure) {
          context.errorSnackBar('Error al cargar el portafolio');
        }
        if (state.status.isTransactionDone) {
          context.succesSnackBar('Transacción realizada con éxito');
        }
        if (state.status.isTransactionFailure) {
          context
            ..pop()
            ..errorSnackBar('Error al realizar la transacción');
        }
        if (state.status.isInsufficientFundsError) {
          showErrorDialog(isToBuy: true, context);
        }
        if (state.status.isInsufficientStocksError) {
          showErrorDialog(isToBuy: false, context);
        }
        if (state.status.isInsufficientStocksToBuy) {
          context.errorSnackBar('No hay suficientes acciones para vender');
        }
      },
      child: CardBody(
        maxWidth: null,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Portfolio',
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    if (isLoading)
                      const SizedBox(
                        height: 15,
                        width: 15,
                        child: CircularProgressIndicator(),
                      ),
                  ],
                ),
                const Spacer(),
                const TransactionButton(
                  isToBuy: true,
                ),
                const SizedBox(
                  width: 20,
                ),
                const TransactionButton(
                  isToBuy: false,
                ),
              ],
            ),
            const SizedBox(height: 30),
            PlayerValue(
              isLoading: isLoading,
              value: r'U$S ' +
                  formatter.format(
                    blocState.moneyAvailable,
                  ),
              label: 'Efectivo disponible: ',
            ),
            const SizedBox(height: 20),
            PlayerValue(
              isLoading: isLoading,
              label: 'Valor de tus acciones: ',
              value: r'U$S ' + formatter.format(blocState.totaStocklValue),
            ),
            const Divider(
              height: 20,
            ),
            PlayerValue(
              isLoading: isLoading,
              value: r'U$S ' +
                  formatter.format(
                    blocState.totalValue,
                  ),
              label: 'Valor Neto total: ',
            ),
            const SizedBox(height: 20),
            if (!blocState.status.isLoading && blocState.portfolio.isEmpty)
              const Expanded(
                child: Center(
                  child: Text(
                    'No tienes acciones aún',
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15),
                  ),
                ),
              )
            else
              PortfolioTable(
                portfolio: blocState.portfolio,
              ),
          ],
        ),
      ),
    );
  }
}
