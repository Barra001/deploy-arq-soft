part of 'log_in_bloc.dart';

enum UserRole {
  admin,
  player;

  bool get isAdmin => this == UserRole.admin;
  bool get isPlayer => this == UserRole.player;
}

@immutable
class LogInState extends Equatable {
  const LogInState({
    required this.email,
    required this.password,
    required this.status,
    required this.obscurePassword,
    required this.selectedRole,
    required this.gameName,
    required this.errorMessage,
  });

  const LogInState.initial()
      : this(
          email: const Email.pure(),
          password: const Password.pure(),
          status: FormzSubmissionStatus.initial,
          obscurePassword: true,
          selectedRole: UserRole.player,
          gameName: const Name.pure(),
          errorMessage: '',
        );

  final Email email;
  final Password password;
  final FormzSubmissionStatus status;
  final bool obscurePassword;
  final UserRole selectedRole;
  final Name gameName;
  final String errorMessage;

  LogInState copyWith({
    Email? email,
    Password? password,
    FormzSubmissionStatus? status,
    bool? obscurePassword,
    UserRole? selectedRole,
    Name? gameName,
    String? errorMessage,
  }) {
    return LogInState(
      email: email ?? this.email,
      password: password ?? this.password,
      status: status ?? this.status,
      obscurePassword: obscurePassword ?? this.obscurePassword,
      selectedRole: selectedRole ?? this.selectedRole,
      gameName: gameName ?? this.gameName,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
        email,
        password,
        status,
        obscurePassword,
        selectedRole,
        gameName,
        errorMessage,
      ];
}
