import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:stock_simulation_game/transaction_history/transaction_history.dart';

class EndDatePicker extends StatefulWidget {
  const EndDatePicker({
    super.key,
  });

  @override
  State<EndDatePicker> createState() => _EndDatePickerState();
}

class _EndDatePickerState extends State<EndDatePicker> {
  late TextEditingController _endDateController;
  @override
  void initState() {
    _endDateController = TextEditingController();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final startDate = context.select(
      (TransacionHistoryBloc bloc) => bloc.state.startDate,
    );
    return BlocListener<TransacionHistoryBloc, TransacionHistoryState>(
      listenWhen: (previous, current) => previous.endDate != current.endDate,
      listener: (context, state) {
        if (state.endDate != null) {
          _endDateController.text = DateFormat('dd-MM-yyyy').format(
            state.endDate!,
          );
        } else {
          _endDateController.text = '';
        }
      },
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _endDateController,
              decoration: const InputDecoration(
                icon: Icon(Icons.calendar_today),
                labelText: 'Hasta',
              ),
              readOnly: true,
              onTap: () async {
                final pickedDate = await showDatePicker(
                  context: context,
                  initialDate: startDate ?? DateTime.now(),
                  firstDate: startDate ?? DateTime(2000),
                  lastDate: DateTime(2101),
                );
                if (pickedDate != null) {
                  // ignore: use_build_context_synchronously
                  context
                      .read<TransacionHistoryBloc>()
                      .add(SelectedEndDate(pickedDate));
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
                    .add(const RemoveEndDate());
              },
            ),
          ),
        ],
      ),
    );
  }
}
