import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:parser/bundler.dart';
import 'package:parser/formatter.dart';
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

  void bundler() {
    Bundler()
      ..generate(jsonEncode(scrapy.people.map((e) => e.toJson()).toList()), 'all_data.json')
      ..generate(jsonEncode(scrapy.people.map((e) => e.toCytoscapeJson()).toList()), 'all_data_site.json');
  }


  ProcessSignal.sigint.watch().listen((event) {
    bundler();
    print('\n[+] Exiting...');
    exit(0);
  });

  scrapy.visited.addAll({
  'https://www.sanjyra.net/man/1',
  'https://www.sanjyra.net/man/32252',
  'https://www.sanjyra.net/man/44275'
  });

  await scrapy.parse(['1', 'https://www.sanjyra.net/man/2']);

  print('\n[+] Done! Parsed ${scrapy.people.length} people.');

  bundler();

  print('[+] Scrapy finished.');
  exit(0);

}


void _formatter(String path) {

  print('[+] Formatter started.');

  final bundler = Bundler();
  final formatter = Formatter();

  final data = List<Map<String, dynamic>>.from(jsonDecode(File(path).readAsStringSync()));

  final normalData = formatter.fromCytoscapeToNormal(data);
  final cytoscapeData = formatter.fromNormalToCytoscape(normalData);

  bundler
    ..generate(jsonEncode(normalData), 'data_normal.json')
    ..generate(jsonEncode(cytoscapeData), 'data_cytoscape.json');

  print('[+] Formatter finished.');

}