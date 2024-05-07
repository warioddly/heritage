import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:html/parser.dart' as parser;
import 'package:html/dom.dart';
import 'package:parser/generate_json.dart';

class Scrapy {

  final Set<String> _visited = <String>{};
  final List<People> people = <People>[];
  int _counter = 1;
  final JsonFileGenerator jsonFileGenerator = JsonFileGenerator();

  Future<void> parse(String parent, String url) async {

    if (!_crawl(url)) {
      return;
    }

    final response = await http.get(Uri.parse(url));

    if (response.statusCode != 200) {
      throw Exception('Failed to load page');
    }

    final document = parser.parse(response.body);
    List<String> children = _getChildren(document);

    final person = _getPeople(parent, url, document);

    people.add(person);

    jsonFileGenerator.generateJson('${jsonEncode(person.toJson())},', 'dynamic_all_data.json', FileMode.append);
    jsonFileGenerator.generateJson('${jsonEncode(person.toSiteJson())},', 'dynamic_all_data_site.json', FileMode.append);

    if (children.isNotEmpty) {
      final id = _getId(url);

      for (int i = 0; i < children.length; i++) {
        await parse(id, children[i]);
      }

    }


  }


  List<String> _getChildren(Document document) {

    final urls = <String>[];

    final elements = document.querySelector('#app > main > div > div.container.mx-auto.w-full > div.p-3.flex.flex-nowrap.items-start.text-center.mx-auto.w-max.max-w-full.overflow-x-auto > table > tbody');

    if (elements == null) {
      return urls;
    }

    for (final element in elements.children) {

      for (int i = 0; i < element.children.length; i++) {

        var child = element.children[i];

        if (child.children.isNotEmpty) {

          var url = child.children.first.attributes['href'];

          if (url != null && !_visited.contains(url)) {
            urls.add(url);
          }

        }

      }
    }

    return urls;
  }


  bool _crawl(String url) {
    if (_visited.contains(url)) {
      print('[-] Already crawled: $url');
      return false;
    }
    _visited.add(url);
    print('[${++_counter}] Crawling $url');
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

class People {

  People({
    required this.id,
    required this.parent,
    required this.name,
    required this.fullName,
    required this.url,
    this.children = const [],
    this.bio,
  });

  final String id;
  final String parent;
  final String name;
  final String fullName;
  final String? bio;
  final String url;
  final List<People> children;

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'source': parent,
      'name': name,
      'fullName': fullName,
      'bio': bio,
      'url': url,
      'children': children.map((e) => e.toJson()).toList(),
    };
  }


  Map<String, dynamic> toSiteJson() {
    return {
      "data": toJson(),
    };
  }

}
