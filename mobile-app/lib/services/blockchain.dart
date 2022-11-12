import 'package:socket_io_client/socket_io_client.dart';

// IMPLEMENT SENDING OF PRIVATE KEY AND TXNO/BLOCKNO

void authorizeDetails(List<String> fields) {
  // Dart client
  Socket socket = io('ws://143.198.209.169:3000');
  socket.onConnect((_) {
    socket.emit('msg', 'test');
  });

  List<Map> d = [
    for (String f in fields) {'field': f, 'privateKey': 'p', 'txNo': 'b'}
  ];

  socket.emit('keys', {d});
}
