import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:game_repository/game_repository.dart';

class HistoricalLineChart extends StatelessWidget {
  const HistoricalLineChart({required this.data, super.key});
  final List<HistoricalValue> data;

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        gridData: const FlGridData(show: false),
        titlesData: const FlTitlesData(
          leftTitles: AxisTitles(axisNameWidget: Text('Cotización')),
          bottomTitles: AxisTitles(axisNameWidget: Text('Fecha')),
          topTitles: AxisTitles(axisNameWidget: Text('')),
          rightTitles: AxisTitles(axisNameWidget: Text('')),
        ),
        clipData: const FlClipData.all(),
        borderData: FlBorderData(
          show: true,
          border: const Border.fromBorderSide(
            BorderSide(
              color: Color(0xFF13B9FF),
            ),
          ),
        ),
        minX: data.first.date.millisecondsSinceEpoch.toDouble(),
        maxX: data.last.date.millisecondsSinceEpoch.toDouble(),
        minY: data.map((e) => e.value).reduce((a, b) => a < b ? a : b),
        maxY: data.map((e) => e.value).reduce((a, b) => a > b ? a : b),
        lineBarsData: [
          LineChartBarData(
            spots: data
                .map(
                  (e) => FlSpot(
                    e.date.millisecondsSinceEpoch.toDouble(),
                    e.value,
                  ),
                )
                .toList(),
            color: Colors.blue.shade800,
            belowBarData:
                BarAreaData(color: Colors.blue.withOpacity(0.2), show: true),
          ),
        ],
      ),
    );
  }
}
