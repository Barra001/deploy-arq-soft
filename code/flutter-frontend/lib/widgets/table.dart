import 'package:flutter/material.dart';

class SimulatorTable extends StatelessWidget {
  const SimulatorTable({
    required this.rows,
    super.key,
  });

  final List<TableRow> rows;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: SingleChildScrollView(
        child: Table(
          border: TableBorder.all(
            borderRadius: BorderRadius.circular(10),
            width: 0.5,
            color: Colors.blue.shade300,
          ),
          children: rows,
        ),
      ),
    );
  }
}
