import 'package:itzme/models/organization.dart';

class Document {
  String name;
  DateTime dateOfIssue;
  Organization organization;
  String jsonData;

  Document({
    required this.name,
    required this.dateOfIssue,
    required this.organization,
    required this.jsonData,
  });
}
