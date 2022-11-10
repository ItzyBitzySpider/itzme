import 'package:flutter/material.dart';
import 'package:itzme/screens/documents.dart';
import 'package:itzme/screens/home.dart';
import 'package:itzme/screens/scan.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Itz Me',
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
  BottomNavigationBarItem(
    icon: Icon(Icons.folder, size: 35.0),
    label: 'Documents',
  ),
];

const List<Widget> _screens = [HomeScreen(), ScanScreen(), DocumentsScreen()];

class Main extends StatefulWidget {
  const Main({super.key});

  @override
  State<Main> createState() => _MainState();
}

class _MainState extends State<Main> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: _navigationBarItems,
        currentIndex: _selectedIndex,
        onTap: (int i) => setState(() => _selectedIndex = i),
      ),
    );
  }
}
