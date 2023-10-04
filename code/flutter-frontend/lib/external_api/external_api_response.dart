import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:stock_simulation_game/external_api/response.dart';

typedef ManageExternalApiErrors = void Function(http.Response response);

class ExternalApiError implements Exception {
  const ExternalApiError(this.message);
  final String message;
}

void manageExternalApiErrors(http.Response response) {
  if (response.statusCode.toString()[0] == '4') {
    throw ExternalApiError(
      Response.fromJson(jsonDecode(response.body) as Map<String, dynamic>)
          .message,
    );
  } else if (response.statusCode.toString()[0] == '5') {
    throw Exception('Unknown Error');
  }
}
