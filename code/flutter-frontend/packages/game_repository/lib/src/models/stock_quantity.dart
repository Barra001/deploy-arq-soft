import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'stock_quantity.g.dart';

@JsonSerializable()
class StockQuantity extends Equatable {
  const StockQuantity({required this.quantity, required this.stockCode});

  factory StockQuantity.fromJson(Map<String, dynamic> json) =>
      _$StockQuantityFromJson(json);

  Map<String, dynamic> toJson() => _$StockQuantityToJson(this);

  final int quantity;
  final String stockCode;

  StockQuantity copyWith({
    int? quantity,
    String? stockCode,
  }) {
    return StockQuantity(
      quantity: quantity ?? this.quantity,
      stockCode: stockCode ?? this.stockCode,
    );
  }

  @override
  List<Object?> get props => [stockCode];
}
