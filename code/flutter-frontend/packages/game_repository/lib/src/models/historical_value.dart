//class that has value double, and date
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'historical_value.g.dart';

@JsonSerializable()
class HistoricalValue extends Equatable {
  const HistoricalValue({required this.value, required this.date});

  factory HistoricalValue.fromJson(Map<String, dynamic> json) =>
      _$HistoricalValueFromJson(json);

  Map<String, dynamic> toJson() => _$HistoricalValueToJson(this);

  final double value;
  final DateTime date;

  HistoricalValue copyWith({
    double? value,
    DateTime? date,
  }) {
    return HistoricalValue(
      value: value ?? this.value,
      date: date ?? this.date,
    );
  }

  @override
  List<Object?> get props => [value, date];
}
