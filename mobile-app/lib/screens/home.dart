import 'package:flutter/material.dart';
import 'package:itzme/models/identity.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Identity user = Identity(
    name: 'Jeff John',
    nric: 'S12345678E',
    dateOfBirth: DateTime(2002, 1, 19),
    gender: Gender.male,
    nationality: 'Singaporean',
    address: 'Geylang Street 32',
  );
  bool _profileCardOpened = false;

  Widget _profileCard() {
    List<Widget> details = [];
    user.details.forEach((label, value) {});

    Widget bottomPanel = ExpansionTile(
      title: Text('${_profileCardOpened ? 'Hide' : 'Show'} Details'),
      onExpansionChanged: (opened) => setState(() {
        _profileCardOpened = opened;
      }),
    );

    return Card(
        child: Column(
      children: [bottomPanel],
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(children: [
            Text('Welcome back'),
            _profileCard(),
          ]),
        ),
      ),
    );
  }
}
