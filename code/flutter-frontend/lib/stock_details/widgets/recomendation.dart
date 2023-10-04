import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';

class Recomendation extends StatelessWidget {
  const Recomendation({super.key});

  @override
  Widget build(BuildContext context) {
    final recomendation =
        context.select((StockDetailsBloc bloc) => bloc.state.recomendation);
    final isLoading = recomendation == null;
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: Colors.blue,
        ),
      ),
      padding: const EdgeInsets.all(25),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Recomendación: ',
            style: TextStyle(fontWeight: FontWeight.w600, fontSize: 17),
          ),
          Text(
            isLoading ? '-' : recomendation,
            style: const TextStyle(fontSize: 17),
          ),
        ],
      ),
    );
  }
}
