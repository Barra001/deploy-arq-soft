import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:user_repository/user_repository.dart';

part 'player_home_event.dart';
part 'player_home_state.dart';

class PlayerHomeBloc extends Bloc<PlayerHomeEvent, PlayerHomeState> {
  PlayerHomeBloc({required UserRepository userRepository})
      : _userRepository = userRepository,
        super(const PlayerHomeState.initial()) {
    on<LogOutRequested>(_onLogOutRequested);
  }

  final UserRepository _userRepository;

  Future<void> _onLogOutRequested(
    LogOutRequested event,
    Emitter<PlayerHomeState> emit,
  ) async {
    emit(const PlayerHomeState(status: PlayerHomeStatus.logingOut));
    await _userRepository.logOut();
    emit(const PlayerHomeState(status: PlayerHomeStatus.logOut));
  }
}
