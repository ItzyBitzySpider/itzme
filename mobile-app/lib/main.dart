import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:itzme/models/credentials.dart';
import 'package:itzme/screens/home.dart';
import 'package:itzme/screens/scan.dart';
import 'package:itzme/services/hive.dart';

void main() async {
  // Initialize Hive for local storage
  Hive.registerAdapter(CredentialsAdapter());

  await Hive.initFlutter();

  // Open boxes
  await Hive.openBox('credentials');

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Itz Me',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const Main(),
    );
  }
}

const List<BottomNavigationBarItem> _navigationBarItems = [
  BottomNavigationBarItem(
    icon: Icon(Icons.home, size: 35.0),
    label: 'Home',
  ),
  BottomNavigationBarItem(
    icon: Icon(Icons.qr_code_scanner, size: 35.0),
    label: 'Scan',
  ),
  // BottomNavigationBarItem(
  //   icon: Icon(Icons.folder, size: 35.0),
  //   label: 'Documents',
  // ),
];

class Main extends StatefulWidget {
  const Main({super.key});

  @override
  State<Main> createState() => _MainState();
}

class _MainState extends State<Main> {
  int _selectedIndex = 0;

  Credentials? credential;
  late List<Widget> _screens;

  void refreshCredentials() {
    List<Credentials> creds = getCredentials();
    setState(() {
      if (creds.isNotEmpty) {
        credential = creds[0];
      } else {
        credential = null;
      }
    });
  }

  Widget _screen(int index) {
    _screens = [
      HomeScreen(
        credentials: credential,
        refreshCredentials: refreshCredentials,
      ),
      ScanScreen(credentials: credential),
    ];

    return _screens[index];
  }

  @override
  void initState() {
    super.initState();

    refreshCredentials();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screen(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: _navigationBarItems,
        currentIndex: _selectedIndex,
        onTap: (int i) => setState(() => _selectedIndex = i),
      ),
    );
  }
}
