import 'package:flutter/material.dart';
import 'package:stock_simulation_game/widgets/table_value.dart';

class TableHeader extends StatelessWidget {
  const TableHeader({
    required this.text,
    super.key,
    this.columnOption = ColumnPosition.other,
  });
  final String text;
  final ColumnPosition columnOption;
  @override
  Widget build(BuildContext context) {
    return TableCell(
      child: Container(
        decoration: BoxDecoration(
          borderRadius: columnOption.isLeftColumn
              ? const BorderRadius.only(topLeft: Radius.circular(10))
              : columnOption.isRigthColumn
                  ? const BorderRadius.only(topRight: Radius.circular(10))
                  : null,
          color: const Color(0xFF13B9FF),
        ),
        padding: const EdgeInsets.all(15),
        child: Text(
          text,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 14,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
