import 'package:equatable/equatable.dart';
import 'package:game_repository/src/models/models.dart';
import 'package:json_annotation/json_annotation.dart';

part 'player.g.dart';

@JsonSerializable()
class Player extends Equatable {
  const Player({
    required this.balance,
    required this.email,
    required this.name,
    required this.password,
    required this.portfolio,
    required this.gameId,
  });

  factory Player.fromJson(Map<String, dynamic> json) => _$PlayerFromJson(json);

  Map<String, dynamic> toJson() => _$PlayerToJson(this);

  final double balance;
  final String email;
  final String name;
  final String password;
  final List<StockQuantity> portfolio;
  final String gameId;

  Player copyWith({
    double? money,
    String? email,
    String? name,
    String? password,
    List<StockQuantity>? portfolio,
    String? gameId,
  }) {
    return Player(
      balance: money ?? balance,
      email: email ?? this.email,
      name: name ?? this.name,
      password: password ?? this.password,
      portfolio: portfolio ?? this.portfolio,
      gameId: gameId ?? this.gameId,
    );
  }

  @override
  List<Object?> get props => [email, name, password, portfolio, gameId];
}
