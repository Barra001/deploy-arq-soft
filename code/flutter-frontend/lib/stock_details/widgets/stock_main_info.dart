import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';
import 'package:stock_simulation_game/widgets/widgets.dart';

class StockMainInfo extends StatelessWidget {
  const StockMainInfo({
    required this.isForSearch,
    super.key,
  });
  final bool isForSearch;
  @override
  Widget build(BuildContext context) {
    final blocState = context.watch<StockDetailsBloc>().state;
    final status = blocState.status;
    final stock = blocState.stock;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Text(
              'Stock',
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
            ),
            const SizedBox(
              width: 20,
            ),
            if (status.isLoading)
              const SizedBox(
                height: 15,
                width: 15,
                child: CircularProgressIndicator(),
              ),
          ],
        ),
        const SizedBox(
          height: 20,
        ),
        PlayerValue(
          isLoading: false,
          label: 'Nombre: ',
          value: stock.name,
        ),
        const SizedBox(
          height: 20,
        ),
        Row(
          children: [
            PlayerValue(
              isLoading: false,
              label: 'Precio actual: ',
              value: r'U$S ' + formatter.format(stock.unitValue),
            ),
            const SizedBox(
              width: 20,
            ),
            if (isForSearch) //.capMerc.numberFormat
              PlayerValue(
                isLoading: blocState.stockVolume == null,
                label: 'Volúmen: ',
                value: blocState.stockVolume.toString(),
              )
            else
              PlayerValue(
                isLoading: blocState.quantity == null,
                label: 'Cantidad actual: ',
                value: blocState.quantity.toString(),
              ),
            const SizedBox(
              width: 20,
            ),
            if (isForSearch)
              PlayerValue(
                isLoading: false,
                label: 'Cap. Mercado: ',
                value: stock.capMerc.numberFormat,
              )
            else
              PlayerValue(
                isLoading: blocState.quantity == null,
                label: 'Valor actual: ',
                value: r'U$S ' + formatter.format(blocState.totalValue),
              ),
          ],
        ),
      ],
    );
  }
}
