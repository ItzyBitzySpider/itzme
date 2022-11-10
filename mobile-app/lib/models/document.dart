import 'package:flutter/material.dart';
import 'package:itzme/models/organization.dart';

class Document {
  String name;
  DateTime date;
  Organization organization;

  Document({
    required this.name,
    required this.date,
    required this.organization,
  });
}
