import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/transaction_history/transaction_history.dart';

class TransactionList extends StatefulWidget {
  const TransactionList({super.key});

  @override
  State<TransactionList> createState() => _TransactionListState();
}

class _TransactionListState extends State<TransactionList> {
  late final ScrollController scrollController;

  @override
  void initState() {
    scrollController = ScrollController();
    scrollController.addListener(() {
      if (scrollController.position.pixels >=
          scrollController.position.maxScrollExtent - 100) {
        context
            .read<TransacionHistoryBloc>()
            .add(const TransactionRequestedDroppable());
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final transactions =
        context.select((TransacionHistoryBloc bloc) => bloc.state.transactions);
    final transactionsStatus = context
        .select((TransacionHistoryBloc bloc) => bloc.state.transactionsStatus);
    final hasReachedMax = context
        .select((TransacionHistoryBloc bloc) => bloc.state.hasReachedMax);
    return Column(
      children: [
        if (transactions.isEmpty && !transactionsStatus.isLoading)
          const Center(
            child: Padding(
              padding: EdgeInsets.only(top: 20),
              child:
                  Text('No hay transacciones', style: TextStyle(fontSize: 24)),
            ),
          )
        else
          Expanded(
            child: Column(
              children: [
                const SizedBox(
                  height: 10,
                ),
                const ListHeader(),
                const Divider(
                  height: 10,
                ),
                Expanded(
                  child: ListView.builder(
                    controller: scrollController,
                    itemCount: transactions.length + 1,
                    itemBuilder: (context, index) {
                      if (index == transactions.length) {
                        if (hasReachedMax) {
                          return const SizedBox();
                        } else {
                          return const Padding(
                            padding: EdgeInsets.all(20),
                            child: Center(
                              child: CircularProgressIndicator(),
                            ),
                          );
                        }
                      }
                      final transaction = transactions[index];
                      return Column(
                        children: [
                          ColoredBox(
                            color: index.isOdd
                                ? Colors.transparent
                                : Colors.blue.shade100,
                            child: Padding(
                              padding: const EdgeInsets.all(30),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      DateFormat('dd/MM/yyyy')
                                          .format(transaction.date),
                                      textAlign: TextAlign.left,
                                    ),
                                  ),
                                  Expanded(
                                    child: Text(
                                      transaction.stockCode,
                                      textAlign: TextAlign.left,
                                    ),
                                  ),
                                  Expanded(
                                    child: Text(
                                      transaction.type.name,
                                      textAlign: TextAlign.left,
                                    ),
                                  ),
                                  Expanded(
                                    child: Text(
                                      transaction.quantity.toString(),
                                      textAlign: TextAlign.left,
                                    ),
                                  ),
                                  Expanded(
                                    child: Text(
                                      formatter.format(
                                        transaction.stockValueOnTransaction,
                                      ),
                                      textAlign: TextAlign.left,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const Divider(
                            height: 0,
                          ),
                        ],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}
