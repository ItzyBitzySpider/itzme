enum Gender { male, female }

class Identity {
  String name;
  String nric;
  DateTime dateOfBirth;
  Gender gender;
  String nationality;
  String address;

  String? iconPath;

  Identity({
    required this.name,
    required this.nric,
    required this.dateOfBirth,
    required this.gender,
    required this.nationality,
    required this.address,
    this.iconPath,
  });

  Map<String, dynamic> get details {
    return {
      'name': name,
      'nric': nric,
      'dateOfBirth': dateOfBirth,
      'gender': gender,
      'nationality': nationality,
      'address': address,
    };
  }
}
