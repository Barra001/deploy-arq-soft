import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:form_inputs/form_inputs.dart';
import 'package:stock_simulation_game/external_api/external_api_response.dart';
import 'package:user_repository/user_repository.dart';

part 'log_in_event.dart';
part 'log_in_state.dart';

class LogInBloc extends Bloc<LogInEvent, LogInState> {
  LogInBloc({required UserRepository userRepository})
      : _userRepository = userRepository,
        super(const LogInState.initial()) {
    on<LoginEmailChanged>(_onEmailChanged);
    on<LoginPasswordChanged>(_onPasswordChanged);
    on<LoginPasswordVisibilityChanged>(_onPasswordVisibilityChanged);
    on<LoginWithEmailAndPasswordRequested>(
      _onLoginWithEmailAndPasswordRequested,
    );
    on<SelectedPlayerRole>(_onSelectedPlayerRole);
    on<SelectedAdminRole>(_onSelectedAdminRole);
    on<GameNameChanged>(_onGameNameChanged);
  }

  final UserRepository _userRepository;

  bool get valid =>
      Formz.validate([state.email, state.password, state.gameName]);

  bool get obscurePassowrd => state.obscurePassword;

  Future<void> _onLoginWithEmailAndPasswordRequested(
    LoginWithEmailAndPasswordRequested event,
    Emitter<LogInState> emit,
  ) async {
    if (!valid) {
      // if any input is pure turn it to dirty('')
      emit(
        state.copyWith(
          email: Email.dirty(state.email.value),
          password: Password.dirty(state.password.value),
          gameName: Name.dirty(state.gameName.value),
        ),
      );
      return;
    }
    emit(state.copyWith(status: FormzSubmissionStatus.inProgress));
    try {
      await _userRepository.logIn(
        email: state.email.value,
        password: state.password.value,
        gameName: state.gameName.value,
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
          errorMessage: 'Falló el log in',
        ),
      );
    }
  }

  void _onEmailChanged(
    LoginEmailChanged event,
    Emitter<LogInState> emit,
  ) {
    emit(state.copyWith(email: Email.dirty(event.email)));
  }

  void _onPasswordChanged(
    LoginPasswordChanged event,
    Emitter<LogInState> emit,
  ) {
    emit(state.copyWith(password: Password.dirty(event.password)));
  }

  void _onPasswordVisibilityChanged(
    LoginPasswordVisibilityChanged event,
    Emitter<LogInState> emit,
  ) {
    emit(state.copyWith(obscurePassword: event.obscure));
  }

  void _onSelectedPlayerRole(
    SelectedPlayerRole event,
    Emitter<LogInState> emit,
  ) {
    emit(state.copyWith(selectedRole: UserRole.player));
  }

  void _onSelectedAdminRole(
    SelectedAdminRole event,
    Emitter<LogInState> emit,
  ) {
    emit(state.copyWith(selectedRole: UserRole.admin));
  }

  void _onGameNameChanged(
    GameNameChanged event,
    Emitter<LogInState> emit,
  ) {
    emit(state.copyWith(gameName: Name.dirty(event.gameName)));
  }
}
