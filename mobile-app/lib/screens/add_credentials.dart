import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'package:itzme/models/credentials.dart';
import 'package:itzme/services/hive.dart';

class AddCredentialsScreen extends StatelessWidget {
  const AddCredentialsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          actions: [
            IconButton(
              icon: const Icon(Icons.done),
              onPressed: () {
                // saveCredentials(Credentials.fromJson(jsonDecode(data)));
              },
            ),
          ],
        ),
        body: Column(
          children: [
            ElevatedButton(
              onPressed: () async {
                FilePickerResult? result =
                    await FilePicker.platform.pickFiles();

                if (result != null) {
                  File file = File(result.files.first.path!);
                  String data = await file.readAsString();

                  saveCredentials(Credentials.fromJson(jsonDecode(data)));
                }
              },
              style: TextButton.styleFrom(elevation: 0.0),
              child: const Text('Upload JSON'),
            ),
          ],
        ));
  }
}
