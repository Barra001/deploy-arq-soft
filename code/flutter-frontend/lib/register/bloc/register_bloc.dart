import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:form_inputs/form_inputs.dart';
import 'package:stock_simulation_game/external_api/external_api_response.dart';
import 'package:user_repository/user_repository.dart';

part 'register_event.dart';
part 'register_state.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  RegisterBloc({required UserRepository userRepository})
      : _userRepository = userRepository,
        super(const RegisterState.initial()) {
    on<RegisterEmailChanged>(_onEmailChanged);
    on<RegisterPasswordChanged>(_onPasswordChanged);
    on<RegisterSecondPasswordChanged>(_onRegisterSecondPasswordChanged);
    on<RegisterPasswordVisibilityChanged>(_onPasswordVisibilityChanged);
    on<GameCodeChanged>(_onGameCodeChanged);
    on<RegisterRequested>(
      _onRegisterRequested,
    );
    on<RegisterNameChanged>(_onNameChanged);
  }
  final UserRepository _userRepository;

  bool get valid =>
      Formz.validate(
        [state.email, state.password, state.codeGame, state.name],
      ) &&
      state.password.value == state.secondPassword;
  void _onEmailChanged(
    RegisterEmailChanged event,
    Emitter<RegisterState> emit,
  ) {
    emit(state.copyWith(email: Email.dirty(event.email)));
  }

  void _onNameChanged(
    RegisterNameChanged event,
    Emitter<RegisterState> emit,
  ) {
    emit(state.copyWith(name: Name.dirty(event.name)));
  }

  void _onPasswordChanged(
    RegisterPasswordChanged event,
    Emitter<RegisterState> emit,
  ) {
    emit(state.copyWith(password: Password.dirty(event.password)));
  }

  void _onRegisterSecondPasswordChanged(
    RegisterSecondPasswordChanged event,
    Emitter<RegisterState> emit,
  ) {
    emit(state.copyWith(secondPassword: event.password));
  }

  void _onPasswordVisibilityChanged(
    RegisterPasswordVisibilityChanged event,
    Emitter<RegisterState> emit,
  ) {
    emit(state.copyWith(obscurePassword: event.obscure));
  }

  Future<void> _onRegisterRequested(
    RegisterRequested event,
    Emitter<RegisterState> emit,
  ) async {
    if (!valid) {
      emit(
        state.copyWith(
          email: Email.dirty(state.email.value),
          password: Password.dirty(state.password.value),
          codeGame: Otp.dirty(state.codeGame.value),
          name: Name.dirty(state.name.value),
        ),
      );

      return;
    }
    emit(state.copyWith(status: FormzSubmissionStatus.inProgress));
    try {
      await _userRepository.register(
        email: state.email.value,
        password: state.password.value,
        codeGame: state.codeGame.value,
        userName: state.name.value,
      );
      emit(state.copyWith(status: FormzSubmissionStatus.success));
    } on ExternalApiError catch (e) {
      emit(
        state.copyWith(
          status: FormzSubmissionStatus.failure,
          errorMessage: e.message,
        ),
      );
    } on Exception {
      emit(
        state.copyWith(
          status: FormzSubmissionStatus.failure,
          errorMessage: 'Falló el registro de usuario',
        ),
      );
    }
  }

  void _onGameCodeChanged(
    GameCodeChanged event,
    Emitter<RegisterState> emit,
  ) {
    emit(state.copyWith(codeGame: Otp.dirty(event.gameCode)));
  }
}
