import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:html/parser.dart' as parser;
import 'package:html/dom.dart';
import 'package:parser/bundler.dart';
import 'package:parser/people_model.dart';

class Scrapy {

  final visited = <String>{};
  final queue = <String>{};
  final people = <People>[];
  final bundler = Bundler();


  Future<void> parse(List<String> args) async {

    final parent = args[0];
    final url = args[1];

    if (!_crawl(url)) {
      return;
    }

    final response = await http.get(Uri.parse(url));

    if (response.statusCode != 200) {
      throw Exception('Failed to load page');
    }

    final document = parser.parse(response.body);
    final children = _getChildren(document);

    final person = _getPeople(parent, url, document);

    people.add(person);
    bundler.generate('${jsonEncode(person.toJson())},', 'dynamic_all_data.json', FileMode.append);

    if (children.isNotEmpty) {
      final id = _getId(url);

      queue.addAll(children);

      for (final child in children) {
        await parse([id, child]);
      }

      queue.removeWhere((element) => children.contains(element));

    }


  }


  Set<String> _getChildren(Document document) {

    final urls = <String>{};

    final elements = document.querySelector('#app > main > div > div.container.mx-auto.w-full > div.p-3.flex.flex-nowrap.items-start.text-center.mx-auto.w-max.max-w-full.overflow-x-auto > table > tbody');

    if (elements == null) {
      return urls;
    }

    for (final element in elements.children) {

      for (int i = 0; i < element.children.length; i++) {

        var child = element.children[i];

        if (child.children.isNotEmpty) {

          var url = child.children.first.attributes['href'];

          if (url != null && !visited.contains(url) && !queue.contains(url)) {
            urls.add(url);
          }

        }

      }
    }

    return urls;
  }


  bool _crawl(String url) {
    if (visited.contains(url)) {
      print('[-] Already crawled: $url');
      return false;
    }
    visited.add(url);
    print('[+] Crawling $url');
    return true;
  }


  People _getPeople(String parent, String url, Document document) {

    final name = document.querySelector('#app > main > div > div.container.mx-auto.w-full > div.border.rounded-md.border-yellow-400.my-1.bg-gray-100.p-2')?.children.last.children.last.text;
    final fullName = document.querySelector('#app > main > div > div.container.mx-auto.w-full > div.container.mx-auto.bg-gray-100.rounded-2xl.border.border-red-500.w-full > div.bg-white.w-full.p-2.md\\:p-4.rounded-t-2xl.font-bold.border-b.border-red-400')?.text;
    final bio = document.querySelector('#app > main > div > div.container.mx-auto.w-full > div.container.mx-auto.bg-gray-100.rounded-2xl.border.border-red-500.w-full > div:nth-child(2)')?.text;

    return People(
      id: _getId(url),
      parent: parent,
      name: (name ?? 'Unknown').trim(),
      fullName: (fullName ?? '-').trim(),
      bio: (bio ?? '-').trim(),
      url: url,
    );

  }

  String _getId(String? url) {
    if (url == null) {
      return '';
    }
    return url.split('/').last;
  }

}