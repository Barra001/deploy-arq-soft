// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'transaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Transaction _$TransactionFromJson(Map<String, dynamic> json) => Transaction(
      stockCode: json['stockCode'] as String,
      quantity: json['quantity'] as int,
      date: DateTime.parse(json['date'] as String),
      type: $enumDecode(_$ShareInteractionEnumMap, json['type']),
      stockValueOnTransaction:
          (json['stockValueOnTransaction'] as num).toDouble(),
    );

Map<String, dynamic> _$TransactionToJson(Transaction instance) =>
    <String, dynamic>{
      'stockCode': instance.stockCode,
      'quantity': instance.quantity,
      'date': instance.date.toIso8601String(),
      'type': _$ShareInteractionEnumMap[instance.type],
      'stockValueOnTransaction': instance.stockValueOnTransaction,
    };

const _$ShareInteractionEnumMap = {
  ShareInteraction.purchase: 'purchase',
  ShareInteraction.sell: 'sell',
};
