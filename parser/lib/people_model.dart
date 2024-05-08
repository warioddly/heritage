
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


  factory People.fromCytoscape(Map<String, dynamic> data) {
    return People.fromJson(data);
  }

  factory People.fromJson(Map<String, dynamic> data) {
    return People(
      id: data['id'],
      parent: data['source'],
      name: data['name'],
      fullName: data['fullName'],
      bio: data['bio'],
      url: data['url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'source': parent,
      'name': name,
      'fullName': fullName,
      'bio': bio,
      'url': url,
    };
  }

  Map<String, dynamic> toCytoscapeJson() {
    return {
      "data": toJson(),
    };
  }

}
