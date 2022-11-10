import 'package:flutter/material.dart';
import 'package:itzme/models/document.dart';
import 'package:itzme/models/organization.dart';
import 'package:itzme/services/auth.dart';

// Haven't tested on android, need to add android permissions

Future<bool> showRequestPopup(
  BuildContext context, {
  required Organization requestingOrganization,
  required List<Document> documents,
  required String purpose,
}) async {
  bool? result = await Navigator.of(context).push(MaterialPageRoute<bool>(
    builder: (BuildContext context) {
      return RequestPopup(
        requestingOrganization: requestingOrganization,
        documents: documents,
        purpose: purpose,
      );
    },
    fullscreenDialog: true,
  ));

  return result ?? false;
}

class RequestPopup extends StatefulWidget {
  final Organization requestingOrganization;
  final List<Document> documents;
  final String purpose;

  const RequestPopup({
    super.key,
    required this.requestingOrganization,
    required this.documents,
    required this.purpose,
  });

  @override
  State<RequestPopup> createState() => _RequestPopupState();
}

class _RequestPopupState extends State<RequestPopup> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                flex: 2,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                      child: Container(
                        padding: const EdgeInsets.all(5.0),
                        height: 100.0,
                        width: 100.0,
                        child: widget.requestingOrganization.iconPath == null
                            ? const Icon(Icons.school)
                            : Image.asset(
                                widget.requestingOrganization.iconPath!),
                      ),
                    ),
                    const SizedBox(height: 10.0),
                    Text(
                      widget.requestingOrganization.name,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 25.0,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 10.0),
                    Text('for ${widget.purpose}', textAlign: TextAlign.center),
                  ],
                ),
              ),
              Expanded(
                flex: 3,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    SizedBox(
                      width: double.infinity,
                      child: Card(
                        color: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            vertical: 20.0,
                            horizontal: 20.0,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Details required:',
                                style: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 15.0,
                                ),
                              ),
                              const SizedBox(height: 5.0),
                              ListView.builder(
                                shrinkWrap: true,
                                itemCount: widget.documents.length,
                                itemBuilder: ((context, index) {
                                  Document document = widget.documents[index];
                                  return Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 1.0),
                                    child: Text('• ${document.name}'),
                                  );
                                }),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () => Navigator.of(context).pop(false),
                            style: TextButton.styleFrom(
                              elevation: 0.0,
                              backgroundColor: Colors.grey.shade300,
                            ),
                            child: const Text(
                              'Cancel',
                              style: TextStyle(color: Colors.black),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10.0),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () async {
                              Navigator.of(context)
                                  .pop(await AuthService.authenticateUser());
                            },
                            style: TextButton.styleFrom(elevation: 0.0),
                            child: const Text('Send'),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
