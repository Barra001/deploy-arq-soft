import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/context.dart';
import 'package:stock_simulation_game/search/bloc/search_bloc.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';

class SearchView extends StatefulWidget {
  const SearchView({super.key});

  @override
  State<SearchView> createState() => _SearchViewState();
}

class _SearchViewState extends State<SearchView> {
  late final ScrollController scrollController;

  @override
  void initState() {
    scrollController = ScrollController();
    scrollController.addListener(() {
      if (scrollController.position.pixels >=
          scrollController.position.maxScrollExtent - 100) {
        context.read<SearchBloc>().add(const StocksRequestedDroppable());
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final stocks = context.select((SearchBloc bloc) => bloc.state.stocks);
    final status = context.select((SearchBloc bloc) => bloc.state.status);
    final hasReachedMax =
        context.select((SearchBloc bloc) => bloc.state.hasReachedMax);
    return Padding(
      padding: const EdgeInsets.only(left: 15, right: 15, top: 20),
      child: Column(
        children: [
          SizedBox(
            width: 700,
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Buscar',
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (value) {
                context
                    .read<SearchBloc>()
                    .add(StocksRequestSearch(query: value));
              },
            ),
          ),
          if (stocks.isEmpty && !status.isLoading)
            const Center(
              child: Text('No hay stocks', style: TextStyle(fontSize: 24)),
            )
          else
            Expanded(
              child: ListView.builder(
                controller: scrollController,
                itemCount: stocks.length + 1,
                itemBuilder: (context, index) {
                  if (index == stocks.length) {
                    if (hasReachedMax) {
                      return const SizedBox();
                    }
                    return const Padding(
                      padding: EdgeInsets.all(20),
                      child: Center(
                        child: CircularProgressIndicator(),
                      ),
                    );
                  }
                  final stock = stocks[index];
                  return Column(
                    children: [
                      const Divider(),
                      ListTile(
                        leading: CircleAvatar(
                          backgroundColor: Colors.blue,
                          child: Center(
                            child: FittedBox(
                              child: Padding(
                                padding: const EdgeInsets.all(5),
                                child: Text(
                                  stock.code,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        title: Text(stock.name),
                        subtitle: Text(stock.description),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            if (stock.variation >= 0)
                              const Icon(
                                Icons.arrow_drop_up,
                                color: Colors.green,
                              )
                            else
                              const Icon(
                                Icons.arrow_drop_down,
                                color: Colors.red,
                              ),
                            const SizedBox(
                              width: 5,
                            ),
                            Text(
                              r'U$S ' + formatter.format(stock.unitValue),
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: stock.variation >= 0
                                    ? Colors.green
                                    : Colors.red,
                              ),
                            ),
                          ],
                        ),
                        onTap: () {
                          context.push(
                            StockDetailsRoute.route(
                              stock: stock,
                              isForSearch: true,
                            ),
                          );
                        },
                      ),
                    ],
                  );
                },
              ),
            ),
        ],
      ),
    );
  }
}
