part of 'register_bloc.dart';

class RegisterState extends Equatable {
  const RegisterState({
    required this.email,
    required this.password,
    required this.status,
    required this.obscurePassword,
    required this.codeGame,
    required this.secondPassword,
    required this.name,
    required this.errorMessage,
  });

  const RegisterState.initial()
      : this(
          email: const Email.pure(),
          password: const Password.pure(),
          status: FormzSubmissionStatus.initial,
          obscurePassword: true,
          codeGame: const Otp.pure(),
          name: const Name.pure(),
          secondPassword: '',
          errorMessage: '',
        );

  final Email email;
  final Name name;
  final Password password;
  final String secondPassword;
  final FormzSubmissionStatus status;
  final bool obscurePassword;
  final Otp codeGame;
  final String errorMessage;

  RegisterState copyWith({
    Email? email,
    Password? password,
    String? secondPassword,
    FormzSubmissionStatus? status,
    bool? obscurePassword,
    Otp? codeGame,
    Name? name,
    String? errorMessage,
  }) {
    return RegisterState(
      email: email ?? this.email,
      password: password ?? this.password,
      secondPassword: secondPassword ?? this.secondPassword,
      status: status ?? this.status,
      obscurePassword: obscurePassword ?? this.obscurePassword,
      codeGame: codeGame ?? this.codeGame,
      name: name ?? this.name,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object> get props => [
        email,
        password,
        status,
        obscurePassword,
        codeGame,
        secondPassword,
        name,
        errorMessage,
      ];
}
