// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'credentials.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class CredentialsAdapter extends TypeAdapter<Credentials> {
  @override
  final int typeId = 1;

  @override
  Credentials read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Credentials(
      privateKey: fields[0] as String,
      blockNo: fields[1] as int,
    );
  }

  @override
  void write(BinaryWriter writer, Credentials obj) {
    writer
      ..writeByte(2)
      ..writeByte(0)
      ..write(obj.privateKey)
      ..writeByte(1)
      ..write(obj.blockNo);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CredentialsAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
