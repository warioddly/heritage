import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:html/parser.dart' as parser;
import 'package:html/dom.dart';
import 'package:parser/bundler.dart';
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