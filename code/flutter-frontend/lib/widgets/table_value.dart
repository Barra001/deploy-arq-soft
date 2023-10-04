import 'package:flutter/material.dart';

enum ColumnPosition {
  leftColumn,
  other,
  rigthColumn;

  bool get isLeftColumn => this == ColumnPosition.leftColumn;
  bool get isRigthColumn => this == ColumnPosition.rigthColumn;
}

class TableValue extends StatelessWidget {
  const TableValue({
    required this.text,
    required this.isEven,
    required this.isLast,
    this.columnOption = ColumnPosition.other,
    super.key,
    this.onTap,
  });
  final String text;
  final bool isEven;
  final bool isLast;
  final ColumnPosition columnOption;
  final void Function()? onTap;
  @override
  Widget build(BuildContext context) {
    return TableCell(
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: isEven ? Colors.white : Colors.blue.shade100,
            borderRadius: BorderRadius.only(
              bottomLeft: columnOption.isLeftColumn && isLast
                  ? const Radius.circular(10)
                  : Radius.zero,
              bottomRight: columnOption.isRigthColumn && isLast
                  ? const Radius.circular(10)
                  : Radius.zero,
            ),
          ),
          child: Text(
            text,
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
