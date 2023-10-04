import 'package:flutter/material.dart';
import 'package:game_repository/game_repository.dart';
import 'package:stock_simulation_game/consts.dart';
import 'package:stock_simulation_game/extensions/extensions.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';
import 'package:stock_simulation_game/widgets/widgets.dart';

class PortfolioTable extends StatelessWidget {
  const PortfolioTable({
    required this.portfolio,
    super.key,
  });
  final List<({int quantity, Stock stock})> portfolio;

  @override
  Widget build(BuildContext context) {
    return SimulatorTable(
      rows: [
        const TableRow(
          children: [
            TableHeader(
              text: 'Stock',
              columnOption: ColumnPosition.leftColumn,
            ),
            TableHeader(text: 'V. U'),
            TableHeader(text: 'Var'),
            TableHeader(text: 'Var. Por.'),
            TableHeader(text: 'Cap. Merc'),
            TableHeader(text: 'Cant'),
            TableHeader(
              text: 'Valor',
              columnOption: ColumnPosition.rigthColumn,
            ),
          ],
        ),
        ...portfolio.map(
          (element) {
            final stock = element.stock;
            final isEven = portfolio.indexOf(element).isEven;
            final isLast = portfolio.indexOf(element) == portfolio.length - 1;
            return TableRow(
              children: [
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: stock.code,
                  isEven: isEven,
                  isLast: isLast,
                  columnOption: ColumnPosition.leftColumn,
                ),
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: formatter.format(stock.unitValue),
                  isEven: isEven,
                  isLast: isLast,
                ),
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: stock.variation.toStringAsFixed(2),
                  isEven: isEven,
                  isLast: isLast,
                ),
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: '${stock.percentVariation.toStringAsFixed(2)} %',
                  isEven: isEven,
                  isLast: isLast,
                ),
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: stock.capMerc.numberFormat,
                  isEven: isEven,
                  isLast: isLast,
                ),
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: element.quantity.toString(),
                  isEven: isEven,
                  isLast: isLast,
                ),
                TableValue(
                  onTap: () => context
                      .push(StockDetailsRoute.route(stock: element.stock)),
                  text: formatter.format(
                    element.quantity * stock.unitValue,
                  ),
                  columnOption: ColumnPosition.rigthColumn,
                  isEven: isEven,
                  isLast: isLast,
                ),
              ],
            );
          },
        ),
      ],
    );
  }
}
