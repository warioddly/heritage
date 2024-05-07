import 'dart:convert';
import 'dart:io';
import 'package:parser/generate_json.dart';
import 'package:parser/scrapy.dart';


void main(List<String> arguments) async {

  final scrapy = Scrapy();

  // catch CTRL+C signal
  ProcessSignal.sigint.watch().listen((event) {
    writeToFile(scrapy.people);
    print('\n[+] Exiting...');
    exit(0);
  });

  print('[+] Sanjyra Parser');

  await scrapy.parse('', 'https://www.sanjyra.net/man/1');

  print('\n[+] Done! Parsed ${scrapy.people.length} people.');

  writeToFile(scrapy.people);

}

void writeToFile(List<People> people) {

  final List<Map<String, dynamic>> _people = [];
  final List<Map<String, dynamic>> _peopleToSite = [];

  for (final person in people) {
    _people.add(person.toJson());
    _peopleToSite.add(person.toSiteJson());
  }


  JsonFileGenerator()
    ..generateJson(jsonEncode(_people), 'all_data.json')
    ..generateJson(jsonEncode(_peopleToSite), 'all_data_site.json');

}
