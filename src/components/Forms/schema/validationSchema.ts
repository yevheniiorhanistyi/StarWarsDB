import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required('First name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),

  age: Yup.number()
    .required('Age is required')
    .typeError('Age is required')
    .positive('Age should be a positive number'),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Enter a valid email (e.g., user@example.com)')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name'),

  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 characters length')
    .test(
      'uppercase',
      'Password must include one uppercase letter (A-Z)',
      (value) => value !== undefined && /[A-Z]/.test(value),
    )
    .test(
      'lowercase',
      'Password must include one lowercase letter (a-z)',
      (value) => value !== undefined && /[a-z]/.test(value),
    )
    .test('digit', 'Password must include one digit (0-9)', (value) => value !== undefined && /[0-9]/.test(value))
    .test(
      'specialCharacters',
      'Password must include special character (!@#$%^&*)',
      (value) => value !== undefined && /[!@#$%^&*]/.test(value),
    ),

  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),

  conditions: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),

  pictureFile: Yup.mixed<File>()
    .required('Picture is required')
    .test('fileSize', 'File size is too large', (value) => !value || (value && value.size <= 1048576))
    .test(
      'fileFormat',
      'Invalid file format. Only PNG and JPEG are allowed.',
      (value) => !value || (value && ['image/png', 'image/jpeg'].includes(value.type)),
    ),

  country: Yup.string().required('Country is required'),
});

export default validationSchema;
