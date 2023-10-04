// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stock_quantity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StockQuantity _$StockQuantityFromJson(Map<String, dynamic> json) =>
    StockQuantity(
      quantity: json['quantity'] as int,
      stockCode: json['stockCode'] as String,
    );

Map<String, dynamic> _$StockQuantityToJson(StockQuantity instance) =>
    <String, dynamic>{
      'quantity': instance.quantity,
      'stockCode': instance.stockCode,
    };
