import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:game_repository/game_repository.dart';
import 'package:intl/intl.dart';
import 'package:stock_simulation_game/stock_details/stock_details.dart';

class NewsList extends StatelessWidget {
  const NewsList({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final newsList = context.select((StockDetailsBloc bloc) => bloc.state.news);
    final isLoading = newsList == null;
    return isLoading
        ? const Center(
            child: CircularProgressIndicator(),
          )
        : newsList.isEmpty
            ? const Center(
                child: Text('No hay noticias publicadas para este stock'),
              )
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Noticias Relacionadas',
                    style: TextStyle(fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 10),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.blue),
                      ),
                      child: ListView.separated(
                        separatorBuilder: (context, index) => Divider(
                          color: Colors.blue.shade100,
                        ),
                        shrinkWrap: true,
                        itemCount: newsList.length,
                        itemBuilder: (context, index) {
                          final news = newsList[index];
                          return NewsCard(news: news);
                        },
                      ),
                    ),
                  ),
                ],
              );
  }
}

class NewsCard extends StatelessWidget {
  const NewsCard({required this.news, super.key});
  final News news;
  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Text(DateFormat('dd/MM/yyyy').format(news.date)),
      title: Text(news.title),
      subtitle: Text(news.content),
    );
  }
}
