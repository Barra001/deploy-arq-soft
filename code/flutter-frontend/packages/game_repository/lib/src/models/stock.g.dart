// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stock.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Stock _$StockFromJson(Map<String, dynamic> json) => Stock(
      code: json['code'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      totalStocksOnMarket: json['totalStocksOnMarket'] as int,
      historicalValues: (json['historicalValues'] as List<dynamic>)
          .map((e) => HistoricalValue.fromJson(e as Map<String, dynamic>))
          .toList(),
      gameId: json['gameId'] as String,
    );

Map<String, dynamic> _$StockToJson(Stock instance) => <String, dynamic>{
      'code': instance.code,
      'name': instance.name,
      'description': instance.description,
      'totalStocksOnMarket': instance.totalStocksOnMarket,
      'historicalValues': instance.historicalValues,
      'gameId': instance.gameId,
    };
