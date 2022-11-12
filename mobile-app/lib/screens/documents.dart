import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:itzme/models/document.dart';
import 'package:itzme/models/organization.dart';

class DocumentsScreen extends StatefulWidget {
  const DocumentsScreen({super.key});

  @override
  State<DocumentsScreen> createState() => _DocumentsScreenState();
}

class _DocumentsScreenState extends State<DocumentsScreen> {
  List<Document> documents = List.filled(
    8,
    Document(
      name: 'Vaccination Certificate',
      organization: Organization(name: 'Ministry of Health'),
      dateOfIssue: DateTime(2022, 1, 25),
      jsonData: '',
    ),
  );

  final DateFormat formatter = DateFormat('dd MMM yy');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(children: [
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                ' Documents',
                style: TextStyle(fontSize: 25.0, fontWeight: FontWeight.w600),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 10.0),
                child: ListView.builder(
                  itemCount: documents.length,
                  itemBuilder: ((context, index) {
                    Document document = documents[index];

                    return Card(
                      child: ListTile(
                        onTap: () {},
                        minLeadingWidth: 20.0,
                        leading: SizedBox(
                          height: double.infinity,
                          child: document.organization.iconPath == null
                              ? const Icon(Icons.description)
                              : ImageIcon(
                                  AssetImage(document.organization.iconPath!),
                                ),
                        ),
                        title: Text(document.name),
                        subtitle: Text(document.organization.name),
                        trailing: Text(
                          formatter.format(document.dateOfIssue),
                          style: TextStyle(color: Colors.grey.shade600),
                        ),
                        // trailing: const Icon(Icons.chevron_right),
                      ),
                    );
                  }),
                ),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}
