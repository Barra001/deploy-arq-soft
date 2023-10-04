import 'dart:async';

import 'package:flutter/material.dart';
import 'package:game_repository/game_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:stock_simulation_game/app/view/app.dart';
import 'package:stock_simulation_game/external_api/external_api_response.dart';
import 'package:user_repository/user_repository.dart';

Future<App> mainCommon() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  // read from enviroment variables the rootUrl
  const rootUrl = 'localhost:3000';
  final userRepository = UserRepository(
    storage: prefs,
    manageExternalApiErrors: manageExternalApiErrors,
    rootUrl: rootUrl,
  );
  final gameRepository = GameRepository(
    storage: prefs,
    manageExternalApiErrors: manageExternalApiErrors,
    rootUrl: rootUrl,
  );

  return App(
    userRepository: userRepository,
    storage: prefs,
    gameRepository: gameRepository,
  );
}
