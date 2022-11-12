import 'package:flutter/material.dart';
import 'package:itzme/services/auth.dart';

// BUG: If you authenticate successfully, then cancel authentication a second time
//      and press cancel, the app black screens

Future<bool> showRequestPopup(
  BuildContext context, {
  required String field,
  String? purpose,
}) async {
  bool? result = await Navigator.of(context).push(MaterialPageRoute<bool>(
    builder: (BuildContext context) {
      return RequestPopup(
        field: field,
      );
    },
    fullscreenDialog: true,
  ));

  return result ?? false;
}

class RequestPopup extends StatefulWidget {
  final String field;

  const RequestPopup({
    super.key,
    required this.field,
  });

  @override
  State<RequestPopup> createState() => _RequestPopupState();
}

class _RequestPopupState extends State<RequestPopup> {
  Widget _userIcon(String? iconPath) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
      child: Container(
        padding: const EdgeInsets.all(5.0),
        height: 100.0,
        width: 100.0,
        child: iconPath == null
            ? const FittedBox(
                fit: BoxFit.fill,
                child: Icon(Icons.account_circle),
              )
            : Image.asset(iconPath),
      ),
    );
  }

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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _userIcon(null),
                        const Icon(Icons.arrow_right_alt,
                            size: 40.0, color: Colors.grey),
                        _userIcon(null),
                      ],
                    ),
                    const SizedBox(height: 10.0),
                    // Text(
                    //   'An organization',
                    //   textAlign: TextAlign.center,
                    //   style: const TextStyle(
                    //     fontSize: 25.0,
                    //     fontWeight: FontWeight.w600,
                    //   ),
                    // ),
                    // const SizedBox(height: 10.0),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20.0),
                      child: Text(
                        'An organization requests your credentials.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20.0,
                        ),
                      ),
                    ),
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
                                itemCount: 1,
                                itemBuilder: ((context, index) {
                                  return Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 1.0),
                                    child: Text('• ${widget.field}'),
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
