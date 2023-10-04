part of 'player_home_bloc.dart';

enum PlayerHomeStatus {
  initial,
  success,
  failure,
  logingOut,
  logOut;

  bool get isLogOut => this == PlayerHomeStatus.logOut;
  bool get isLogingOut => this == PlayerHomeStatus.logingOut;
}

class PlayerHomeState extends Equatable {
  const PlayerHomeState({required this.status});
  const PlayerHomeState.initial()
      : this(
          status: PlayerHomeStatus.initial,
        );
  final PlayerHomeStatus status;
  @override
  List<Object> get props => [status];
}
