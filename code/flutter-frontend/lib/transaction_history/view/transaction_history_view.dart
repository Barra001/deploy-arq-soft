import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/transaction_history/transaction_history.dart';

class TransactionHistoryView extends StatefulWidget {
  const TransactionHistoryView({super.key});

  @override
  State<TransactionHistoryView> createState() => _TransactionHistoryViewState();
}

class _TransactionHistoryViewState extends State<TransactionHistoryView> {
  late int _selectedPrefixIndex;

  @override
  void initState() {
    _selectedPrefixIndex = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final gameStocks = [
      const Stock(
        code: 'no-filter',
        name: '[Todos]',
        description: 'description',
        totalStocksOnMarket: 1,
        historicalValues: [],
        gameId: 'gameId',
      ),
      ...context.select(
        (TransacionHistoryBloc bloc) => bloc.state.gameStocks,
      ),
    ];
    final stocksStatus = context.select(
      (TransacionHistoryBloc bloc) => bloc.state.stocksStatus,
    );
    return BlocListener<TransacionHistoryBloc, TransacionHistoryState>(
      listenWhen: (previous, current) =>
          current.transactionsStatus.isFailure ||
          current.stocksStatus.isFailure,
      listener: (context, state) {
        context.errorSnackBar('Error al cargar los datos');
      },
      child: Column(
        children: [
          const SizedBox(
            height: 20,
          ),
          SizedBox(
            width: 700,
            child: SizedBox(
              height: 110,
              child: Row(
                children: [
                  const Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        StartDatePicker(),
                        EndDatePicker(),
                      ],
                    ),
                  ),
                  const SizedBox(
                    width: 15,
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        if (stocksStatus.isLoading)
                          const CircularProgressIndicator()
                        else if (gameStocks.isEmpty)
                          const Text('No hay stocks')
                        else
                          DropdownButton<Stock>(
                            value: gameStocks[_selectedPrefixIndex],
                            icon: const Icon(Icons.expand_more),
                            items: gameStocks
                                .map(
                                  (e) => DropdownMenuItem<Stock>(
                                    value: e,
                                    child: SizedBox(
                                      width: 200,
                                      child: Text(
                                        // ignore: lines_longer_than_80_chars
                                        '${e.name}  ${e.unitValue == 0 ? '' : '\$${formatter.format(e.unitValue)}'}',
                                      ),
                                    ),
                                  ),
                                )
                                .toList(),
                            onChanged: (value) {
                              setState(() {
                                if (value != null) {
                                  _selectedPrefixIndex = gameStocks.indexOf(
                                    value,
                                  );
                                }
                              });
                              context.read<TransacionHistoryBloc>().add(
                                    SelectedStock(
                                      gameStocks[_selectedPrefixIndex].code,
                                    ),
                                  );
                            },
                          ),
                        ElevatedButton(
                          onPressed: () {
                            context.read<TransacionHistoryBloc>().add(
                                  const TransactionRequestedSearch(),
                                );
                          },
                          child: const Text('Buscar'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const Expanded(
            child: Padding(
              padding: EdgeInsets.only(top: 20, left: 20, right: 20),
              child: TransactionList(),
            ),
          ),
        ],
      ),
    );
  }
}
