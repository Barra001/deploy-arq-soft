part of 'log_in_bloc.dart';

@immutable
abstract class LogInEvent extends Equatable {
  const LogInEvent();
}

class LoginEmailChanged extends LogInEvent {
  const LoginEmailChanged(this.email);

  final String email;

  @override
  List<Object?> get props => [email];
}

class GameNameChanged extends LogInEvent {
  const GameNameChanged(this.gameName);

  final String gameName;

  @override
  List<Object?> get props => [gameName];
}

class LoginPasswordChanged extends LogInEvent {
  const LoginPasswordChanged(this.password);

  final String password;

  @override
  List<Object?> get props => [password];
}

class LoginWithEmailAndPasswordRequested extends LogInEvent {
  const LoginWithEmailAndPasswordRequested();

  @override
  List<Object?> get props => [];
}

class LoginPasswordVisibilityChanged extends LogInEvent {
  const LoginPasswordVisibilityChanged({required this.obscure});

  final bool obscure;

  @override
  List<Object?> get props => [obscure];
}

class SelectedPlayerRole extends LogInEvent {
  const SelectedPlayerRole();

  @override
  List<Object?> get props => [];
}

class SelectedAdminRole extends LogInEvent {
  const SelectedAdminRole();

  @override
  List<Object?> get props => [];
}
