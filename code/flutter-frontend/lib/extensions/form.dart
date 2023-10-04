import 'package:form_inputs/form_inputs.dart';

extension EmailZ on Email {
  String? getErrorString() {
    if (error == null || isPure) {
      return null;
    }
    if (error!.isEmpty) {
      return 'Ingrese un correo electrónico válido';
    }
    if (error!.isInvalid) {
      return 'Por favor ingrese un correo electrónico';
    }
    return '';
  }
}

extension NameZ on Name {
  String? getErrorString() {
    if (error == null || isPure) {
      return null;
    }
    if (error!.isEmpty) {
      return 'Por favor ingrese su nombre';
    }
    if (error!.isInvalid) {
      return 'Por favor ingrese un nombre válido';
    }
    return '';
  }
}

extension OtpZ on Otp {
  String? getErrorString() {
    if (error == null || isPure) {
      return null;
    }
    if (error!.isEmpty) {
      return 'Por favor ingrese el código del juego';
    }
    if (error!.isCodeNotAlphanumeric) {
      return 'El código del juego solo puede contener letras y números';
    }
    if (error!.isCodeNotLengthEight) {
      return 'El código del juego debe tener 8 caracteres';
    }
    return '';
  }
}

extension PasswordZ on Password {
  String? getErrorString() {
    if (error == null || isPure) {
      return null;
    }
    if (error!.isEmpty) {
      return 'Por favor ingrese una contraseña';
    }
    if (error!.isNotLongEnough) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (error!.isDoesNotCointainNumberAndLetter) {
      return 'La contraseña debe contener al menos un número y una letra';
    }
    return '';
  }
}

extension FormzSubmissionStatusX on FormzSubmissionStatus {
  bool get isInitial => this == FormzSubmissionStatus.initial;
  bool get isInProgress => this == FormzSubmissionStatus.inProgress;
  bool get isSuccess => this == FormzSubmissionStatus.success;
  bool get isFailure => this == FormzSubmissionStatus.failure;
  bool get isCanceled => this == FormzSubmissionStatus.canceled;
}
