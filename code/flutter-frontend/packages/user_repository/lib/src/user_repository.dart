// ignore_for_file: prefer_single_quotes

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:user_repository/src/models/models.dart';

/// {@template user_repository}
/// Contacts node backend
/// {@endtemplate}
class UserRepository {
  /// {@macro user_repository}
  const UserRepository({
    required SharedPreferences storage,
    required this.manageExternalApiErrors,
    required this.rootUrl,
  }) : _storage = storage;

  final SharedPreferences _storage;
  final void Function(http.Response response) manageExternalApiErrors;
  final String rootUrl;

  Future<void> logIn({
    required String email,
    required String password,
    required String gameName,
  }) async {
    final url = Uri.http(rootUrl, 'players/login');
    final user = User(email: email, password: password, gameName: gameName);
    final userJson = user.toJson();
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: userJson,
    );
    manageExternalApiErrors.call(response);
    final token = response.headers['authorization']!;
    await _storage.setString('token', token);
  }

  Future<void> logOut() async {
    await _storage.remove('token');
  }

  Future<void> register({
    required String email,
    required String password,
    required String codeGame,
    required String userName,
  }) async {
    final url = Uri.http(rootUrl, 'players', {'gameCode': codeGame});

    final user = User(email: email, password: password, name: userName);
    final userJson = user.toJson();

    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: userJson,
    );

    manageExternalApiErrors.call(response);
  }
}
