// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'player.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Player _$PlayerFromJson(Map<String, dynamic> json) => Player(
      balance: (json['balance'] as num).toDouble(),
      email: json['email'] as String,
      name: json['name'] as String,
      password: json['password'] as String,
      portfolio: (json['portfolio'] as List<dynamic>)
          .map((e) => StockQuantity.fromJson(e as Map<String, dynamic>))
          .toList(),
      gameId: json['gameId'] as String,
    );

Map<String, dynamic> _$PlayerToJson(Player instance) => <String, dynamic>{
      'balance': instance.balance,
      'email': instance.email,
      'name': instance.name,
      'password': instance.password,
      'portfolio': instance.portfolio,
      'gameId': instance.gameId,
    };
