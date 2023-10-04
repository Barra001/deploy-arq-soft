// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      email: json['email'] as String,
      password: json['password'] as String,
      name: json['name'] as String,
      gameName: json['gameName'] as String,
    );

String _$UserToJson(User instance) => jsonEncode({
      'email': instance.email,
      'password': instance.password,
      'name': instance.name,
      'gameName': instance.gameName,
    });
