// a class with String stockCode, int quantity,
class StockTransaction {
  const StockTransaction({
    required this.stockCode,
    required this.quantity,
  });

  factory StockTransaction.fromJson(Map<String, dynamic> json) =>
      StockTransaction(
        stockCode: json['stockCode'] as String,
        quantity: json['quantity'] as int,
      );

  final String stockCode;
  final int quantity;

  Map<String, dynamic> toJson() => {
        'stockCode': stockCode,
        'quantity': quantity,
      };
}
