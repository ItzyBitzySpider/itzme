import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:itzme/screens/request_popup.dart';
import 'package:itzme/services/blockchain.dart';
import 'package:itzme/widgets.dart/qr_overlay.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScanScreen extends StatefulWidget {
  const ScanScreen({super.key});

  @override
  State<ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  bool authenticated = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            child: Stack(
              children: [
                MobileScanner(
                  allowDuplicates: false,
                  onDetect: (barcode, args) async {
                    if (barcode.rawValue == null) return;

                    Map<String, dynamic> decoded =
                        json.decode(barcode.rawValue!);

                    List<String> fields = [];
                    decoded.forEach((key, value) {
                      if (value is bool && value) fields.add(key);
                    });

                    bool authenticated =
                        await showRequestPopup(context, documents: fields);

                    if (authenticated) authorizeDetails(fields);
                  },
                ),
                QRScannerOverlay(overlayColour: Colors.black.withOpacity(0.5)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
