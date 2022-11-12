import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as socket;
import 'package:itzme/models/credentials.dart';

// IMPLEMENT SENDING OF PRIVATE KEY AND TXNO/BLOCKNO WITH SOCKETS

socket.Socket? client;
const String baseUrl = "http://143.198.209.169:3000";

Future<Credentials> issueIdentity(Map<String, String> fields) async {
  var url = Uri.http(baseUrl, 'admin/issueIdentity', fields);
  var response = await http.get(url);

  if (response.statusCode == 200) {
    return Credentials.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to issue identity.');
  }
}

Future<String> getData(Credentials credentials) async {
  var url = Uri.http('143.198.88.232:3000', 'api/decryptIdentity', {
    'privateKey': credentials.privateKey,
    'blockNo': credentials.blockNo.toString(),
  });
  var response = await http.get(url);

  if (response.statusCode == 200) {
    return jsonDecode(jsonDecode(response.body))['value'];
  }

  print(response.body);

  return ' ';
}

void authorizeDetails(
  Credentials credentials,
  String socketUrl,
) {
  // Dart client
  if (client == null) {
    socket.Socket client = socket.io(socketUrl);
    client.onConnect((_) {
      client.emit('msg', 'test');
    });
  }

  client!.emit('keys', {
    'privateKey': credentials.privateKey,
    'txNo': credentials.blockNo.toString(),
  });
}
