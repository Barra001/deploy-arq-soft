import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';
import 'package:stock_simulation_game/widgets/widgets.dart';

class StockTransactionsTable extends StatelessWidget {
  const StockTransactionsTable({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final transactions =
        context.select((StockDetailsBloc bloc) => bloc.state.stockTransactions);
    final isLoading = transactions == null;
    return isLoading
        ? const Center(
            child: CircularProgressIndicator(),
          )
        : transactions.isEmpty
            ? const Center(
                key: Key('stockDetailsLoading'),
                child: Text(
                  'No hay transacciones para este stock',
                ),
              )
            : SimulatorTable(
                rows: [
                  const TableRow(
                    children: [
                      TableHeader(
                        text: 'Fecha',
                        columnOption: ColumnPosition.leftColumn,
                      ),
                      TableHeader(text: 'Tipo'),
                      TableHeader(text: 'Cantidad'),
                      TableHeader(
                        text: 'Valor',
                        columnOption: ColumnPosition.rigthColumn,
                      ),
                    ],
                  ),
                  ...transactions.map((transaction) {
                    final isEven = transactions.indexOf(transaction).isEven;
                    final isLast = transactions.indexOf(transaction) ==
                        transactions.length - 1;
                    return TableRow(
                      children: [
                        TableValue(
                          text:
                              DateFormat('dd/MM/yyyy').format(transaction.date),
                          isEven: isEven,
                          isLast: isLast,
                          columnOption: ColumnPosition.leftColumn,
                        ),
                        TableValue(
                          text: transaction.type.name,
                          isEven: isEven,
                          isLast: isLast,
                        ),
                        TableValue(
                          text: transaction.quantity.toString(),
                          isEven: isEven,
                          isLast: isLast,
                        ),
                        TableValue(
                          text: formatter.format(
                            transaction.stockValueOnTransaction,
                          ),
                          isEven: isEven,
                          isLast: isLast,
                          columnOption: ColumnPosition.rigthColumn,
                        ),
                      ],
                    );
                  }),
                ],
              );
  }
}
