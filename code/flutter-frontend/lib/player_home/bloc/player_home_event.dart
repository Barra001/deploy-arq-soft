part of 'player_home_bloc.dart';

abstract class PlayerHomeEvent extends Equatable {
  const PlayerHomeEvent();

  @override
  List<Object> get props => [];
}

class LogOutRequested extends PlayerHomeEvent {
  const LogOutRequested();
}
