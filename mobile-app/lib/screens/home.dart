import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:itzme/models/credentials.dart';
import 'package:itzme/services/blockchain.dart';
import 'package:itzme/services/hive.dart';

class HomeScreen extends StatefulWidget {
  final Credentials? credentials;
  final Function refreshCredentials;

  const HomeScreen({
    super.key,
    required this.credentials,
    required this.refreshCredentials,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Map<Credentials, String> accountDetails = {};

  late Future<String> _getCredentialsData;

  Future<String> getCredentialsData(Credentials? c) async {
    if (c != null) return (await getData(c));
    return 'No credentials added.';
  }

  @override
  void initState() {
    super.initState();
    _getCredentialsData = getCredentialsData(widget.credentials);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Center(
            child: FutureBuilder<String>(
              future: _getCredentialsData,
              builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
                switch (snapshot.connectionState) {
                  case ConnectionState.none:
                  case ConnectionState.waiting:
                    return const SizedBox(
                      width: 60,
                      height: 60,
                      child: CircularProgressIndicator(),
                    );
                  default:
                    if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else {
                      return Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              '   Current credentials:',
                              style: TextStyle(
                                fontSize: 20.0,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          Card(
                            child: ListTile(
                              minLeadingWidth: 20.0,
                              leading: const SizedBox(
                                height: double.infinity,
                                child: Icon(Icons.person),
                              ),
                              title: Text(snapshot.data!),
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () async {
                              FilePickerResult? result =
                                  await FilePicker.platform.pickFiles();

                              if (result != null) {
                                File file = File(result.files.first.path!);
                                String data = await file.readAsString();

                                var jsonData = jsonDecode(data);

                                if (widget.credentials != null) {
                                  deleteCredentials(widget.credentials!);
                                }

                                Credentials c = Credentials(
                                  privateKey: jsonData['privateKey'],
                                  blockNo: jsonData['blockNo'],
                                );
                                saveCredentials(c);

                                widget.refreshCredentials();
                                setState(() {
                                  _getCredentialsData = getCredentialsData(c);
                                });
                              }
                            },
                            style: TextButton.styleFrom(elevation: 0.0),
                            child: const Text('Add Credentials with JSON'),
                          ),
                        ],
                      );
                    }
                }
              },
            ),
          ),
        ),
      ),
    );
  }
}
