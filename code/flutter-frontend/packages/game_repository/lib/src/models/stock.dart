import 'package:equatable/equatable.dart';
import 'package:game_repository/src/models/historical_value.dart';
import 'package:json_annotation/json_annotation.dart';

part 'stock.g.dart';

@JsonSerializable()
class Stock extends Equatable {
  const Stock({
    required this.code,
    required this.name,
    required this.description,
    required this.totalStocksOnMarket,
    required this.historicalValues,
    required this.gameId,
  });

  factory Stock.fromJson(Map<String, dynamic> json) => _$StockFromJson(json);

  Map<String, dynamic> toJson() => _$StockToJson(this);

  final String code;
  final String name;
  final String description;
  double get unitValue =>
      historicalValues.isNotEmpty ? historicalValues.last.value : 0;

  final int totalStocksOnMarket;
  final List<HistoricalValue> historicalValues;
  final String gameId;

  Stock copyWith({
    String? code,
    String? name,
    String? description,
    int? totalSharesOnMarket,
    List<HistoricalValue>? historicalValues,
    String? gameId,
  }) {
    return Stock(
      code: code ?? this.code,
      name: name ?? this.name,
      description: description ?? this.description,
      totalStocksOnMarket: totalSharesOnMarket ?? totalStocksOnMarket,
      historicalValues: historicalValues ?? this.historicalValues,
      gameId: gameId ?? this.gameId,
    );
  }

  double get capMerc => unitValue * totalStocksOnMarket;
  double get variation {
    return unitValue - lastValuation.value;
  }

  HistoricalValue get lastValuation {
    if (historicalValues.isEmpty) {
      return HistoricalValue(value: 0, date: DateTime.now());
    }
    if (historicalValues.length == 1) return historicalValues.first;
    return historicalValues[historicalValues.length - 2];
  }

  double get percentVariation => (variation / lastValuation.value) * 100;

  @override
  List<Object?> get props => [
        code,
        name,
        description,
        unitValue,
        totalStocksOnMarket,
        historicalValues,
        gameId,
      ];
}
