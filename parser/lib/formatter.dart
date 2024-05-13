import 'package:parser/people_model.dart';

class Formatter {

  List<Map<String, dynamic>> fromCytoscapeToNormal(List<Map<String, dynamic>> data) {

    final people = <People>[];

    for (final item in data) {
      people.add(People.fromCytoscape(item));
    }

    return people.map((e) => e.toJson()).toList();
  }

  List<Map<String, dynamic>> fromNormalToCytoscape(List<Map<String, dynamic>> data) {

    final people = <People>[];

    for (final item in data) {
      people.add(People.fromJson(item));
    }

    return people.map((e) => e.toCytoscapeJson()).toList();
  }

}