import 'package:flutter/material.dart';

class CardBody extends StatelessWidget {
  const CardBody({required this.child, super.key, this.maxWidth = 500});
  final Widget child;
  final double? maxWidth;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Card(
          child: SizedBox(
            width: maxWidth,
            child: Padding(
              padding: const EdgeInsets.all(30),
              child: child,
            ),
          ),
        ),
      ),
    );
  }
}
