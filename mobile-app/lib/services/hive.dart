import 'package:hive/hive.dart';
import 'package:itzme/models/credentials.dart';

const String credentialsBoxName = 'credentials';

List<Credentials> getCredentials() {
  // Fetch credentials from hive box
  final box = Hive.box(credentialsBoxName);
  List<Credentials> credentials = List<Credentials>.from(box.values.toList());

  return credentials;
}

// Save item to database
Future<void> saveCredentials(Credentials credentials) async {
  final box = Hive.box(credentialsBoxName);
  await box.put(credentials.blockNo, credentials);
}

// Delete item from database
Future<void> deleteCredentials(Credentials credentials) async {
  final box = Hive.box(credentialsBoxName);
  await box.delete(credentials.blockNo);
}
