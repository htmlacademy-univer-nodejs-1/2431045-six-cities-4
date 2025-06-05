import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorField, ApplicationError} from '../libs/rest/index.js';
import { CityType } from '../types/index.js';
import { COORDINATES_BY_CITY } from '../types/offer/coordinates.constant.js';


export function generateRandomValue(min:number, max:number, numAfterDigit = 0){
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getCoordinatesByTown(city: CityType) {
  return COORDINATES_BY_CITY[city];
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

export function getEnumKeyByValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined {
  return (Object.keys(enumObj) as Array<keyof T>).find(
    (key) => enumObj[key] === value
  );
}