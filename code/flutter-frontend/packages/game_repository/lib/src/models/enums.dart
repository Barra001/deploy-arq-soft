enum ShareInteraction {
  purchase,
  sell;

  String get name => this == ShareInteraction.purchase ? 'Compra' : 'Venta';
}
