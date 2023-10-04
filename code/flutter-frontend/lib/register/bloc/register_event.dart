part of 'register_bloc.dart';

abstract class RegisterEvent extends Equatable {
  const RegisterEvent();
}

class RegisterEmailChanged extends RegisterEvent {
  const RegisterEmailChanged(this.email);

  final String email;

  @override
  List<Object?> get props => [email];
}

class GameCodeChanged extends RegisterEvent {
  const GameCodeChanged(this.gameCode);

  final String gameCode;

  @override
  List<Object?> get props => [gameCode];
}

class RegisterPasswordChanged extends RegisterEvent {
  const RegisterPasswordChanged(this.password);

  final String password;

  @override
  List<Object?> get props => [password];
}

class RegisterNameChanged extends RegisterEvent {
  const RegisterNameChanged(this.name);

  final String name;

  @override
  List<Object?> get props => [name];
}

class RegisterSecondPasswordChanged extends RegisterEvent {
  const RegisterSecondPasswordChanged(this.password);

  final String password;

  @override
  List<Object?> get props => [password];
}

class RegisterRequested extends RegisterEvent {
  const RegisterRequested();

  @override
  List<Object?> get props => [];
}

class RegisterPasswordVisibilityChanged extends RegisterEvent {
  const RegisterPasswordVisibilityChanged({required this.obscure});

  final bool obscure;

  @override
  List<Object?> get props => [obscure];
}
