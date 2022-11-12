import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:itzme/models/credentials.dart';
import 'package:itzme/screens/request_popup.dart';
import 'package:itzme/services/blockchain.dart';
import 'package:itzme/widgets.dart/qr_overlay.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScanScreen extends StatefulWidget {
  final Credentials? credentials;
  const ScanScreen({super.key, required this.credentials});

  @override
  State<ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  bool authenticated = false;

  Widget _noCredentialsPopup() {
    return AlertDialog(
      title: const Text('No Credentials'),
      content: const Text('Please add credentials to authenticate.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('BACK'),
        ),
      ],
    );
  }

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

                    String field = decoded['option'];

                    bool authenticated = false;
                    if (widget.credentials != null) {
                      authenticated =
                          await showRequestPopup(context, field: field);
                    } else {
                      showDialog(
                        context: context,
                        builder: (ctx) => _noCredentialsPopup(),
                      );
                    }

                    if (authenticated) {
                      authorizeDetails(
                        widget.credentials!,
                        decoded['callbackURL'],
                      );
                    }
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
