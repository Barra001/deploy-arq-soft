import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:stock_simulation_game/transaction_history/transaction_history.dart';

class StartDatePicker extends StatefulWidget {
  const StartDatePicker({
    super.key,
  });

  @override
  State<StartDatePicker> createState() => _StartDatePickerState();
}

class _StartDatePickerState extends State<StartDatePicker> {
  late TextEditingController _startDateController;

  @override
  void initState() {
    _startDateController = TextEditingController();

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final endDate = context.select(
      (TransacionHistoryBloc bloc) => bloc.state.endDate,
    );
    return BlocListener<TransacionHistoryBloc, TransacionHistoryState>(
      listenWhen: (previous, current) =>
          previous.startDate != current.startDate,
      listener: (context, state) {
        if (state.startDate != null) {
          _startDateController.text = DateFormat('dd-MM-yyyy').format(
            state.startDate!,
          );
        } else {
          _startDateController.text = '';
        }
      },
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _startDateController,
              decoration: const InputDecoration(
                icon: Icon(Icons.calendar_today),
                labelText: 'Desde',
              ),
              readOnly: true,
              onTap: () async {
                final pickedDate = await showDatePicker(
                  context: context,
                  initialDate: endDate ?? DateTime.now(),
                  firstDate: DateTime(
                    2000,
                  ),
                  lastDate: endDate ?? DateTime(2101),
                );
                if (pickedDate != null) {
                  // ignore: use_build_context_synchronously
                  context
                      .read<TransacionHistoryBloc>()
                      .add(SelectedStartDate(pickedDate));
                }
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 10),
            child: IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () {
                context
                    .read<TransacionHistoryBloc>()
                    .add(const RemoveStartDate());
              },
            ),
          ),
        ],
      ),
    );
  }
}
