import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'news.g.dart';

@JsonSerializable()
class News extends Equatable {
  const News({
    required this.date,
    required this.title,
    required this.content,
    required this.gameId,
    required this.stockAssociated,
  });

  factory News.fromJson(Map<String, dynamic> json) => _$NewsFromJson(json);

  Map<String, dynamic> toJson() => _$NewsToJson(this);

  final DateTime date;
  final String title;
  final String content;
  final String gameId;
  final List<String> stockAssociated;

  News copyWith({
    DateTime? date,
    String? title,
    String? content,
    String? gameId,
    List<String>? stocksAsociated,
  }) {
    return News(
      date: date ?? this.date,
      title: title ?? this.title,
      content: content ?? this.content,
      gameId: gameId ?? this.gameId,
      stockAssociated: stocksAsociated ?? this.stockAssociated,
    );
  }

  @override
  List<Object?> get props => [date, title, content, gameId, stockAssociated];
}
