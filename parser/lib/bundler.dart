import 'dart:io';

class Bundler {

  Bundler() {

    if (!outputDirectory.existsSync()) {
      outputDirectory.createSync();
    }

  }

  static final currentDirectory = Directory.current.path;
  static final outputDirectory = Directory('$currentDirectory/output');

  void generate(dynamic data, [String filename = 'data.json', FileMode mode = FileMode.write]) async  {

    final file = File('${outputDirectory.path}/$filename');

    file.writeAsStringSync(data, mode: mode);

    if (file.existsSync()) {
      print('[+] $filename ${mode == FileMode.write ? 'created' : 'updated'} successfully.');
    }
    else {
      print('[+] Error ${mode == FileMode.write ? 'creating' : 'updating'} $filename file.');
    }

  }

}