import { registerEnumType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { unwrapResolverError } from '@apollo/server/errors';
import {
  AuthentificationException,
  ImageNotFoundException,
  PhoneCodeResendException,
  PhoneCodeVerificationException,
  PhoneTokenVerificationException,
  TranslateBadRequestException,
  TranslateNotFoundException,
  UserAlreadyExistException,
  UserDoNotExistException,
  WrongImageFileTypeException,
  UserHasNoAnyEnabledNotificationDevice,
  UserNotificationDeviceAlredyExist,
  UserNotificationDeviceNotFound,
  EventAlredyHasAcceptedEventOffer,
  UserEmailAlreadyExistException,
  EventOfferAlreadyHasBeenDeclined,
  UserNotFoundException,
  InvalidEmailOrPasswordFoundException,
} from '..';

export enum ServerErrorCode {
  // Default ApolloServerErrorCode
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  GRAPHQL_PARSE_FAILED = 'GRAPHQL_PARSE_FAILED',
  GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED',
  PERSISTED_QUERY_NOT_FOUND = 'PERSISTED_QUERY_NOT_FOUND',
  PERSISTED_QUERY_NOT_SUPPORTED = 'PERSISTED_QUERY_NOT_SUPPORTED',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  OPERATION_RESOLUTION_FAILURE = 'OPERATION_RESOLUTION_FAILURE',
  BAD_REQUEST = 'BAD_REQUEST',

  // Custom Server Erorrs
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  USER_DO_NOT_EXIST = 'USER_DO_NOT_EXIST',

  AUTH_FAILED = 'AUTH_FAILED',

  PHONE_TOKEN_VERIFICATION_FAILED = 'PHONE_TOKEN_VERIFICATION_FAILED',
  PHONE_CODE_VERIFICATION_FAILED = 'PHONE_CODE_VERIFICATION_FAILED',
  PHONE_CODE_RESEND_FAILED = 'PHONE_CODE_RESEND_FAILED',

  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',

  TRANSLATE_NOT_FOUND = 'TRANSLATE_NOT_FOUND',
  TRANSLATE_BAD_REQUEST = 'TRANSLATE_BAD_REQUEST',

  IMAGE_NOT_FOUND = 'IMAGE_NOT_FOUND',
  WRONG_IMAGE_FILE_TYPE = 'WRONG_IMAGE_FILE_TYPE',

  NO_ANY_ACTIVE_NOTIFICATION_DEVICES = 'NO_ANY_ACTIVE_NOTIFICATION_DEVICES',
  NOTIFICATION_DEVICE_ALREDY_EXIST = 'NOTIFICATION_DEVICE_ALREDY_EXIST',
  NOTIFICATION_DEVICE_NOT_FOUND = 'NOTIFICATION_DEVICE_NOT_FOUND',

  EVENT_ALREDY_HAS_ACCEPTED_EVENT_OFFER = 'EVENT_ALREDY_HAS_ACCEPTED_EVENT_OFFER',
  EVENT_OFFER_ALREDY_HAS_BEEN_DECLINED = 'EVENT_OFFER_ALREDY_HAS_BEEN_DECLINED',
}

registerEnumType(ServerErrorCode, {
  name: 'ServerErrorCode',
});

export const getGraphQLError = (formattedError, error) => {
  const unwrappedError = unwrapResolverError(error);
  switch (true) {
    case unwrappedError instanceof UserAlreadyExistException:
      return new GraphQLError('User with this phone already exist', {
        extensions: {
          code: ServerErrorCode.USER_ALREADY_EXIST,
        },
        originalError: error,
      });
    case unwrappedError instanceof InvalidEmailOrPasswordFoundException:
      return new GraphQLError('Invalid email or password', {
        extensions: {
          code: ServerErrorCode.INVALID_EMAIL_OR_PASSWORD,
        },
        originalError: error,
      });
    case unwrappedError instanceof UserEmailAlreadyExistException:
      return new GraphQLError('User with this email already exist', {
        extensions: {
          code: ServerErrorCode.USER_ALREADY_EXIST,
        },
        originalError: error,
      });
    case unwrappedError instanceof UserDoNotExistException:
      return new GraphQLError('User with this phone do not exist', {
        extensions: {
          code: ServerErrorCode.USER_DO_NOT_EXIST,
        },
        originalError: error,
      });
    case unwrappedError instanceof AuthentificationException:
      return new GraphQLError('Authentification failed', {
        extensions: {
          code: ServerErrorCode.AUTH_FAILED,
        },
        originalError: error,
      });
    case unwrappedError instanceof PhoneTokenVerificationException:
      return new GraphQLError('Token verification is failed', {
        extensions: {
          code: ServerErrorCode.PHONE_TOKEN_VERIFICATION_FAILED,
        },
        originalError: error,
      });
    case unwrappedError instanceof PhoneCodeVerificationException:
      return new GraphQLError('Code verification is failed', {
        extensions: {
          code: ServerErrorCode.PHONE_CODE_VERIFICATION_FAILED,
        },
        originalError: error,
      });
    case unwrappedError instanceof PhoneCodeResendException:
      return new GraphQLError(
        'Phone Code was not sent. Please, check resendAvailableAt.',
        {
          extensions: {
            code: ServerErrorCode.PHONE_CODE_RESEND_FAILED,
          },
          originalError: error,
        },
      );
    case unwrappedError instanceof UserNotFoundException:
      return new GraphQLError('User not found', {
        extensions: {
          code: ServerErrorCode.USER_NOT_FOUND,
        },
        originalError: error,
      });

    case unwrappedError instanceof TranslateNotFoundException:
      return new GraphQLError("Translate doesn't found", {
        extensions: {
          code: ServerErrorCode.TRANSLATE_NOT_FOUND,
        },
        originalError: error,
      });
    case unwrappedError instanceof TranslateBadRequestException:
      return new GraphQLError('Translate Bad Request', {
        extensions: {
          code: ServerErrorCode.TRANSLATE_BAD_REQUEST,
        },
        originalError: error,
      });
    case unwrappedError instanceof ImageNotFoundException:
      return new GraphQLError("Image doesn't found", {
        extensions: {
          code: ServerErrorCode.IMAGE_NOT_FOUND,
        },
        originalError: error,
      });
    case unwrappedError instanceof WrongImageFileTypeException:
      return new GraphQLError('Wrong image file type', {
        extensions: {
          code: ServerErrorCode.WRONG_IMAGE_FILE_TYPE,
        },
        originalError: error,
      });
    case unwrappedError instanceof UserHasNoAnyEnabledNotificationDevice:
      return new GraphQLError(
        'User does not have any of notification enabled devices',
        {
          extensions: {
            code: ServerErrorCode.NO_ANY_ACTIVE_NOTIFICATION_DEVICES,
          },
        },
      );
    case unwrappedError instanceof UserNotificationDeviceAlredyExist:
      return new GraphQLError('Notification user device alredy exist', {
        extensions: {
          code: ServerErrorCode.NOTIFICATION_DEVICE_ALREDY_EXIST,
        },
      });
    case unwrappedError instanceof UserNotificationDeviceNotFound:
      return new GraphQLError('User notification device not found', {
        extensions: {
          code: ServerErrorCode.NOTIFICATION_DEVICE_NOT_FOUND,
        },
      });
    case unwrappedError instanceof EventAlredyHasAcceptedEventOffer:
      return new GraphQLError('Event alredy has accepted event offer', {
        extensions: {
          code: ServerErrorCode.EVENT_ALREDY_HAS_ACCEPTED_EVENT_OFFER,
        },
      });
    case unwrappedError instanceof EventOfferAlreadyHasBeenDeclined:
      return new GraphQLError('Event alredy has accepted event offer', {
        extensions: {
          code: ServerErrorCode.EVENT_OFFER_ALREDY_HAS_BEEN_DECLINED,
        },
      });
  }
  return formattedError;
};
