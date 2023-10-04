// Copyright (c) 2021, Very Good Ventures
// https://verygood.ventures

import 'package:form_inputs/form_inputs.dart';

/// OTP Form Input Validation Error
enum OtpValidationError {
  /// OTP is invalid (generic validation error)
  codeNotLengthEight,
  codeNotAlphanumeric,

  /// OTP is empty
  empty;

  bool get isCodeNotLengthEight =>
      this == OtpValidationError.codeNotLengthEight;
  bool get isCodeNotAlphanumeric =>
      this == OtpValidationError.codeNotAlphanumeric;
  bool get isEmpty => this == OtpValidationError.empty;
}

/// {@template otp}
/// Reusable OTP form input that is valid only for 6 digits.
/// Extends FormzInput and provides the input type and error type.
/// {@endtemplate}
class Otp extends FormzInput<String, OtpValidationError> {
  /// {@macro otp}
  /// Call super.pure to represent an unmodified form input.
  const Otp.pure() : super.pure('');

  /// {@macro otp}
  /// Call super.dirty to represent a modified form input.
  const Otp.dirty([super.value = '']) : super.dirty();

  bool get codeIsAlphanumeric {
    return RegExp(r'^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$').hasMatch(value);
  }

  /// Override validator to handle validating a given input value.
  @override
  OtpValidationError? validator(String? value) {
    if (value == null) return OtpValidationError.empty;
    return value.length != 8
        ? OtpValidationError.codeNotLengthEight
        : codeIsAlphanumeric
            ? null
            : OtpValidationError.codeNotAlphanumeric;
  }
}
