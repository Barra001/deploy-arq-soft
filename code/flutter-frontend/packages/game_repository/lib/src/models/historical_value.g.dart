// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'historical_value.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HistoricalValue _$HistoricalValueFromJson(Map<String, dynamic> json) =>
    HistoricalValue(
      value: (json['value'] as num).toDouble(),
      date: DateTime.parse(json['date'] as String),
    );

Map<String, dynamic> _$HistoricalValueToJson(HistoricalValue instance) =>
    <String, dynamic>{
      'value': instance.value,
      'date': instance.date.toIso8601String(),
    };
