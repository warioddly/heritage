import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:isolate';
import 'package:parser/bundler.dart';
import 'package:parser/formatter.dart';
import 'package:parser/people_model.dart';
import 'package:parser/scrapy.dart';


void main(List<String> arguments) async {

  if (arguments.isEmpty) {
    print('Usage: parser <command>');
    return;
  }

  if (arguments[0] == 'help') {
    print('Usage: parser <command>');
    print('Commands:');
    print('  scrapy: Scrapes the website and generates the data.');
    print('  format <path>: Formats the data from the given path.');
    print('  all <path>: Scrapes the website and formats the data from the given path.');
    return;
  }

  switch (arguments[0]) {
    case 'scrapy':
      await _scrapy();
      break;
    case 'format':
      if (arguments.length < 2) {
        print('Usage: parser format <path>');
        return;
      }
      _formatter(arguments[1]);
      break;
    case 'all':
      if (arguments.length < 2) {
        print('Usage: parser format <path>');
        return;
      }
      await _scrapy();
      _formatter(arguments[1]);
      break;
    default:
      print('Invalid command.');
  }

}


Future<void> _scrapy() async {
  print('[+] Scrapy started.');

  final scrapy = Scrapy();

  await scrapy.parse(['', 'https://www.sanjyra.net/man/1']);

  print('\n[+] Done! Parsed ${scrapy.people.length} people.');

  Bundler()
    ..generate(jsonEncode(scrapy.people.map((e) => e.toJson())), 'all_data.json')
    ..generate(jsonEncode(scrapy.people.map((e) => e.toCytoscapeJson())), 'all_data_site.json');

  print('[+] Scrapy finished.');
}


void _formatter(String path) {

  print('[+] Formatter started.');

  final bundler = Bundler();
  final formatter = Formatter();

  final data = jsonDecode(File(path).readAsStringSync());

  final normalData = formatter.fromCytoscapeToNormal(data);
  final cytoscapeData = formatter.fromNormalToCytoscape(normalData);

  bundler
    ..generate(jsonEncode(normalData), 'data_normal.json')
    ..generate(jsonEncode(cytoscapeData), 'data_cytoscape.json');

  print('[+] Formatter finished.');

}