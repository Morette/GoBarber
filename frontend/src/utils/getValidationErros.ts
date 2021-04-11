import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getValidationErrors = (err: ValidationError): Errors => {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path ? error.path : error.name] = error.message;
  });

  return validationErrors;
};

export default getValidationErrors;
