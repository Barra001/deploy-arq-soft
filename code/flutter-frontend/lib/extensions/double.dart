extension DoubleX on double {
  String get numberFormat {
    if (this >= 1000000000) {
      return '${(this / 1000000000).toStringAsFixed(2)}B';
    } else if (this >= 1000000) {
      return '${(this / 1000000).toStringAsFixed(2)}M';
    } else if (this >= 1000) {
      return '${(this / 1000).toStringAsFixed(2)}K';
    } else {
      return toString();
    }
  }
}
