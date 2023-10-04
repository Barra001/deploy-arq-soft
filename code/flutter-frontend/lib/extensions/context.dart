import 'package:flutter/material.dart';

extension ContextX on BuildContext {
  ThemeData get theme => Theme.of(this);

  void pop() => Navigator.pop(this);
  Future<void> push(Route<void> route) => Navigator.push(this, route);
  Future<void> pushWidget(Widget widget) =>
      Navigator.push(this, MaterialPageRoute(builder: (_) => widget));
  void pushReplacement(Route<void> route) => Navigator.pushReplacement(
        this,
        route,
      );
  Future<bool> maybePop<T extends Object?>([T? result]) =>
      Navigator.maybePop<T>(this, result);
  void popUntil(bool Function(Route<dynamic>) predicate) =>
      Navigator.popUntil(this, predicate);

  void succesSnackBar(String message) =>
      ScaffoldMessenger.of(this).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              const Icon(
                Icons.check,
                color: Colors.green,
              ),
              const SizedBox(
                width: 30,
              ),
              Text(message),
            ],
          ),
        ),
      );

  void errorSnackBar(String message) => ScaffoldMessenger.of(this).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              const Icon(
                Icons.error,
                color: Colors.red,
              ),
              const SizedBox(
                width: 30,
              ),
              Text(message),
            ],
          ),
        ),
      );
}
