import 'dart:io';

import 'package:flutter/material.dart';
import 'package:itzme/models/document.dart';
import 'package:itzme/models/organization.dart';
import 'package:itzme/screens/request_popup.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

// THIS DOESN'T WORK

class ScanScreen extends StatefulWidget {
  const ScanScreen({super.key});

  @override
  State<ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  Barcode? result;
  QRViewController? controller;

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        result = scanData;
      });
    });
  }

  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      controller!.pauseCamera();
    } else if (Platform.isIOS) {
      controller!.resumeCamera();
    }
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            child: QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
            ),
          ),
          ElevatedButton(
            onPressed: () async {
              bool result = await showRequestPopup(
                context,
                purpose: 'Visitor Registration',
                requestingOrganization: Organization(
                  name: 'Punggol Polyclinic',
                  iconPath: 'assets/images/moh_icon.png',
                ),
                documents: [
                  Document(
                    name: 'Vaccination Certificate',
                    organization: Organization(name: 'Ministry of Health'),
                    date: DateTime(2022, 1, 25),
                  ),
                  Document(
                    name: 'Vaccination Certificate',
                    organization: Organization(name: 'Ministry of Health'),
                    date: DateTime(2022, 1, 25),
                  ),
                ],
              );

              print(result);
            },
            child: Text('popup'),
          ),
        ],
      ),
    );
  }
}
