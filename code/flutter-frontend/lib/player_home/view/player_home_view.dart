import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stock_simulation_game/extensions/context.dart';
import 'package:stock_simulation_game/log_in/view/log_in_route.dart';
import 'package:stock_simulation_game/player_home/player_home.dart';
import 'package:stock_simulation_game/portfolio/view/portfolio_route.dart';
import 'package:stock_simulation_game/search/view/search_route.dart';
import 'package:stock_simulation_game/transaction_history/view/transaction_history_route.dart';

class PlayerHomeView extends StatefulWidget {
  const PlayerHomeView({super.key});

  @override
  State<PlayerHomeView> createState() => _PlayerHomeViewState();
}

class _PlayerHomeViewState extends State<PlayerHomeView>
    with TickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    final status = context.select((PlayerHomeBloc bloc) => bloc.state.status);
    return BlocListener<PlayerHomeBloc, PlayerHomeState>(
      listenWhen: (previous, current) =>
          previous.status != current.status && current.status.isLogOut,
      listener: (context, state) {
        context.pushReplacement(LogInRoute.route());
      },
      child: Scaffold(
        appBar: AppBar(
          actions: [
            if (status.isLogingOut)
              const Padding(
                padding: EdgeInsets.all(10),
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            else
              IconButton(
                icon: const Icon(
                  Icons.logout,
                ),
                onPressed: () {
                  context.read<PlayerHomeBloc>().add(const LogOutRequested());
                },
              ),
          ],
          title: const Text('Simulador de Bolsa'),
          bottom: TabBar(
            controller: _tabController,
            tabs: const <Widget>[
              Tab(
                icon: Icon(Icons.work),
                text: 'Portfolio',
              ),
              Tab(
                icon: Icon(Icons.search),
                text: 'Buscar',
              ),
              Tab(
                text: 'Transacciones',
                icon: Icon(Icons.attach_money),
              ),
            ],
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: const <Widget>[
            PortfolioRoute(),
            SearchRoute(),
            TransactionHistoryRoute(),
          ],
        ),
      ),
    );
  }
}
