import 'package:equatable/equatable.dart';
import 'package:game_repository/game_repository.dart';
import 'package:json_annotation/json_annotation.dart';

part 'transaction.g.dart';

@JsonSerializable()
class Transaction extends Equatable {
  const Transaction({
    required this.stockCode,
    required this.quantity,
    required this.date,
    required this.type,
    required this.stockValueOnTransaction,
  });

  factory Transaction.fromJson(Map<String, dynamic> json) =>
      _$TransactionFromJson(json);

  Map<String, dynamic> toJson() => _$TransactionToJson(this);

  final String stockCode;
  final int quantity;
  final DateTime date;
  final ShareInteraction type;
  final double stockValueOnTransaction;

  Transaction copyWith({
    String? stockCode,
    int? quantity,
    DateTime? date,
    ShareInteraction? type,
    double? stockValueOnTransaction,
  }) {
    return Transaction(
      stockCode: stockCode ?? this.stockCode,
      quantity: quantity ?? this.quantity,
      date: date ?? this.date,
      type: type ?? this.type,
      stockValueOnTransaction:
          stockValueOnTransaction ?? this.stockValueOnTransaction,
    );
  }

  @override
  List<Object?> get props =>
      [stockCode, quantity, date, type, stockValueOnTransaction];
}
