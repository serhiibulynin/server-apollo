import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// User
export class UserAlreadyExistException extends BadRequestException {}
export class UserEmailAlreadyExistException extends BadRequestException {}
export class UserDoNotExistException extends BadRequestException {}

// Auth
export class AuthentificationException extends UnauthorizedException {}
export class UserNotFoundException extends NotFoundException {}
export class InvalidEmailOrPasswordFoundException extends BadRequestException {}

// Phone Confiramtion code
export class PhoneTokenVerificationException extends UnauthorizedException {}
export class PhoneCodeVerificationException extends UnauthorizedException {}
export class PhoneCodeResendException extends ForbiddenException {}

// Not Found orphans
export class BrandNotFoundException extends NotFoundException {}
export class CityNotFoundException extends NotFoundException {}
//
export class CuisineNotFoundException extends NotFoundException {}
export class DishCategoryNotFoundException extends NotFoundException {}
export class DishNotFoundException extends NotFoundException {}
export class EventNotFoundException extends NotFoundException {}
export class EventOfferNotFoundException extends NotFoundException {}
export class EventThemeNotFoundException extends NotFoundException {}
export class ManagerNotFoundException extends NotFoundException {}
export class OfferNotFoundException extends NotFoundException {}
export class RegistrationApplicationNotFoundException extends NotFoundException {}
export class RestaurantReviewNotFoundException extends NotFoundException {}
export class RestaurantNotFoundException extends NotFoundException {}
export class LocaleNotFoundException extends NotFoundException {}

export class TranslateNotFoundException extends NotFoundException {}
export class TranslateBadRequestException extends BadRequestException {}

// Image
export class ImageNotFoundException extends NotFoundException {}
export class WrongImageFileTypeException extends BadRequestException {}

//Notification
export class UserHasNoAnyEnabledNotificationDevice extends BadRequestException {}
export class UserNotificationDeviceAlredyExist extends BadRequestException {}
export class UserNotificationDeviceNotFound extends NotFoundException {}

//EventOffers
export class EventAlredyHasAcceptedEventOffer extends BadRequestException {}
export class EventOfferAlreadyHasBeenDeclined extends BadRequestException {}
