import 'dart:convert';

import 'package:game_repository/src/models/models.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

/// {@template game_repository}
/// Contacts node backend
/// {@endtemplate}
class GameRepository {
  /// {@macro game_repository}
  GameRepository({
    required SharedPreferences storage,
    required this.manageExternalApiErrors,
    required this.rootUrl,
  }) : _storage = storage;

  final SharedPreferences _storage;
  final void Function(http.Response response) manageExternalApiErrors;
  final String rootUrl;

  String get token {
    final token = _storage.getString('token');
    if (token == null) {
      throw Exception('Logged out');
    }
    return token;
  }

  Future<List<News>> getNews({required String stockCode}) async {
    final url = Uri.http(rootUrl, 'news', {'stockCode': stockCode});

    final response = await http.get(
      url,
      headers: {
        'authorization': token,
      },
    );

    manageExternalApiErrors.call(response);

    final responseList = jsonDecode(response.body) as List<dynamic>;
    return responseList
        .map((e) => News.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<Player> getPlayer() async {
    final url = Uri.http(rootUrl, 'players');

    final response = await http.get(
      url,
      headers: {
        'authorization': token,
      },
    );

    manageExternalApiErrors.call(response);

    return Player.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  }

  Future<List<Stock>> getGameStocks({
    int? skip,
    int limit = 10,
    String? query,
  }) async {
    final queryParams = <String, String>{}..addAll({
        'limit': limit.toString(),
        if (query != null) 'query': query,
        if (skip != null) 'skip': skip.toString(),
      });
    final url = Uri.http(rootUrl, 'stocks', queryParams);

    final response = await http.get(
      url,
      headers: {
        'authorization': token,
      },
    );

    manageExternalApiErrors.call(response);
    final responseList = jsonDecode(response.body) as List<dynamic>;
    return responseList
        .map(
          (e) => Stock.fromJson(e as Map<String, dynamic>)
            ..historicalValues.sort((a, b) => a.date.compareTo(b.date)),
        )
        .toList();
  }

  Future<String> getStockRecomendation({required String stockCode}) async {
    final url = Uri.http(rootUrl, 'stocks/$stockCode');

    final response = await http.get(
      url,
      headers: {
        'authorization': token,
      },
    );

    manageExternalApiErrors.call(response);
    final recomendation = response.body;

    return recomendation == 'sell' ? 'Vender' : 'Comprar';
  }

  Future<List<Transaction>> getPlayerTransactions({
    String? stockCode,
    DateTime? from,
    DateTime? until,
    int? skip,
    int limit = 10,
  }) async {
    await Future<void>.delayed(const Duration(milliseconds: 200));
    final queryParams = <String, String>{}..addAll({
        'limit': limit.toString(),
        if (stockCode != null) 'stockCode': stockCode,
        if (from != null) 'startDate': '${from.month}/${from.day}/${from.year}',
        if (until != null)
          'endDate': '${until.month}/${until.day}/${until.year}',
        if (skip != null) 'skip': skip.toString(),
      });
    final url = Uri.http(rootUrl, 'transactions', queryParams);

    final response = await http.get(
      url,
      headers: {
        'authorization': token,
      },
    );

    manageExternalApiErrors.call(response);

    final responseList = jsonDecode(response.body) as List<dynamic>;
    return responseList
        .map((e) => Transaction.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<void> buyStock({
    required String stockCode,
    required int quantity,
  }) async {
    final url = Uri.http(
      rootUrl,
      'transactions/buy',
    );
    final transaction =
        StockTransaction(stockCode: stockCode, quantity: quantity);
    final transactionJson = jsonEncode(transaction.toJson());
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: transactionJson,
    );

    manageExternalApiErrors.call(response);
  }

  Future<void> sellStock({
    required String stockCode,
    required int quantity,
  }) async {
    final url = Uri.http(
      rootUrl,
      'transactions/sell',
    );
    final transaction =
        StockTransaction(stockCode: stockCode, quantity: quantity);
    final transactionJson = jsonEncode(transaction.toJson());
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: transactionJson,
    );

    manageExternalApiErrors.call(response);
  }

  Future<int> getStockVolume({required String stockCode}) async {
    final url = Uri.http(rootUrl, 'transactions/volumes/$stockCode');

    final response = await http.get(
      url,
      headers: {
        'authorization': token,
      },
    );

    manageExternalApiErrors.call(response);
    final volume = response.body;

    return int.parse(volume);
  }
}
