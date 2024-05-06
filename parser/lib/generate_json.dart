import 'dart:convert';
import 'dart:io';

class JsonFileGenerator {

  JsonFileGenerator() {

    if (!outputDirectory.existsSync()) {
      outputDirectory.createSync();
    }

  }

  static final currentDirectory = Directory.current.path;
  static final outputDirectory = Directory('$currentDirectory/output');

  void generateJson(List<Map<String, dynamic>> data, [String filename = 'data.json']) async  {

    final file = File('${outputDirectory.path}/$filename');

    file.writeAsStringSync(json.encode(data));

    if (file.existsSync()) {
      print('\n[+] $filename file created successfully.');
    }
    else {
      print('\n[+] Error creating data.json file.');
    }

  }

}