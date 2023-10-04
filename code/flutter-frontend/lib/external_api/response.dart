class Response {
  Response({
    required this.message,
    required this.statusCode,
    required this.path,
  });

  factory Response.fromJson(Map<String, dynamic> json) => Response(
        message: json['message'] as String,
        statusCode: json['statusCode'] as int,
        path: json['path'] as String,
      );

  final String message;
  final int statusCode;
  final String path;

  Map<String, dynamic> toJson() => {
        'message': message,
        'statusCode': statusCode,
        'path': path,
      };
}
