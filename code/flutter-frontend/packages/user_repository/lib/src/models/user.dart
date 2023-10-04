import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User extends Equatable {
  const User({
    required this.email,
    required this.password,
    this.name = '',
    this.gameName = '',
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  final String email;
  final String password;
  final String name;
  final String gameName;

  String toJson() => _$UserToJson(this);

  @override
  List<Object> get props => [email, password, name];
}
