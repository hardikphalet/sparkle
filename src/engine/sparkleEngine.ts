import { Operation } from './consts.js';
import { SparkleObject } from './interfaces.js';

export function convert(objects: SparkleObject[]): string {
  let resultString: string = '';
  objects.filter((x) => x.values.length > 0).forEach((object) => {
    resultString = resultString.concat(getFuncFromOperation(object.operator)(object)).concat(';');
  });
  return resultString;
}

function equalsOperation(object: SparkleObject): string {
  if (object.values.length !== 1) {
    throw Error('Equal operation strictly requires 1 value');
  }
  const resultString: string = object.bind.concat('.eq:').concat(object.values[0]);
  return resultString;
}

function greaterThanOperation(object: SparkleObject): string {
  if (object.values.length !== 1) {
    throw Error('Operation strictly requires 1 value');
  }
  const resultString: string = object.bind.concat('.gt:').concat(object.values[0]);
  return resultString;
}

function lesserThanOperation(object: SparkleObject): string {
  if (object.values.length !== 1) {
    throw Error('Operation strictly requires 1 value');
  }
  const resultString: string = object.bind.concat('.lt:').concat(object.values[0]);
  return resultString;
}

function lesserThanOrEqualsOperation(object: SparkleObject): string {
  if (object.values.length !== 1) {
    throw Error('Operation strictly requires 1 value');
  }
  const resultString: string = object.bind.concat('.le:').concat(object.values[0]);
  return resultString;
}

function greaterThanOrEqualsOperation(object: SparkleObject): string {
  if (object.values.length !== 1) {
    throw Error('Operation strictly requires 1 value');
  }
  const resultString: string = object.bind.concat('.ge:').concat(object.values[0]);
  return resultString;
}

function inOperation(object: SparkleObject): string {
  if (object.values.length < 1) {
    throw Error('Operation requires atleast one value');
  }
  let resultString: string = object.bind.concat('.in:');
  object.values.forEach((value) => {
    resultString = resultString.concat(value).concat(',');
  });

  // removing the comma after the last value
  resultString = resultString.slice(0, -1);
  return resultString;
}

function notInOperation(object: SparkleObject): string {
  if (object.values.length < 1) {
    throw Error('Operation requires atleast one value');
  }
  let resultString: string = object.bind.concat('.nin:');
  object.values.forEach((value) => {
    resultString = resultString.concat(value).concat(',');
  });

  // removing the comma after the last value
  resultString = resultString.slice(0, -1);
  return resultString;
}

function getFuncFromOperation(operation: Operation): (arg0: SparkleObject) => string {
  switch (operation) {
    case '==':
      return equalsOperation;
    case '>':
      return greaterThanOperation;
    case '<':
      return lesserThanOperation;
    case '>=':
      return greaterThanOrEqualsOperation;
    case '<=':
      return lesserThanOrEqualsOperation;
    case 'in':
      return inOperation;
    case '!in':
      return notInOperation;
  }
}
