// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'news.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

News _$NewsFromJson(Map<String, dynamic> json) => News(
      date: DateTime.parse(json['date'] as String),
      title: json['title'] as String,
      content: json['content'] as String,
      gameId: json['gameId'] as String,
      stockAssociated: (json['stockAssociated'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$NewsToJson(News instance) => <String, dynamic>{
      'date': instance.date.toIso8601String(),
      'title': instance.title,
      'content': instance.content,
      'gameId': instance.gameId,
      'stockAssociated': instance.stockAssociated,
    };
