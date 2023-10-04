import 'package:flutter/material.dart';

class PlayerValue extends StatelessWidget {
  const PlayerValue({
    required this.isLoading,
    required this.label,
    required this.value,
    super.key,
  });

  final bool isLoading;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: label,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
        children: <TextSpan>[
          TextSpan(
            text: isLoading ? '-' : value,
            style: const TextStyle(
              fontWeight: FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
}
