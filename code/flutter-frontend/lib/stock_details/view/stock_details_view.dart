import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';
import 'package:stock_simulation_game/widgets/widgets.dart';

class StockDetailsView extends StatelessWidget {
  const StockDetailsView({required this.isForSearch, super.key});
  final bool isForSearch;
  @override
  Widget build(BuildContext context) {
    final stock = context.select((StockDetailsBloc bloc) => bloc.state.stock);

    return BlocListener<StockDetailsBloc, StockDetailsState>(
      listenWhen: (previous, current) => current.status.isFailure,
      listener: (context, state) {
        context.errorSnackBar('Error al cargar los datos');
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Detalle de Stock'),
        ),
        body: CardBody(
          maxWidth: null,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              StockMainInfo(isForSearch: isForSearch),
              const SizedBox(
                height: 20,
              ),
              Expanded(
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        children: [
                          if (stock.historicalValues.length > 1)
                            Expanded(
                              child: HistoricalLineChart(
                                data: stock.historicalValues,
                              ),
                            )
                          else
                            const Expanded(
                              child: Center(
                                child:
                                    Text('No hay suficientes datos historicos'),
                              ),
                            ),
                          const SizedBox(
                            height: 20,
                          ),
                          if (!isForSearch) const Expanded(child: NewsList()),
                        ],
                      ),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    Expanded(
                      child: Column(
                        children: [
                          if (!isForSearch)
                            const Expanded(child: StockTransactionsTable())
                          else
                            const Expanded(
                              child: Padding(
                                padding: EdgeInsets.only(bottom: 15),
                                child: NewsList(),
                              ),
                            ),
                          const SizedBox(
                            height: 20,
                          ),
                          const Recomendation(),
                        ],
                      ),
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
