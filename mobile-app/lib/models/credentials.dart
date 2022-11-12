import 'package:hive/hive.dart';

part 'credentials.g.dart';

@HiveType(typeId: 1)
class Credentials {
  @HiveField(0)
  final String privateKey;

  @HiveField(1)
  final int blockNo;

  const Credentials({required this.privateKey, required this.blockNo});

  factory Credentials.fromJson(Map<String, dynamic> json) {
    return Credentials(
      privateKey: json['privateKey'],
      blockNo: int.parse(json['blockNo']),
    );
  }
}
