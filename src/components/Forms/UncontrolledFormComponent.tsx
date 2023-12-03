import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from 'yup';

import validationSchema from './schema/validationSchema';
import { FormData } from '../../types/types';
import {
  checkPasswordStrength,
  convertToBase64,
  generateUniqueId,
  getPasswordHelperClass,
  getPasswordStrengthLabel,
} from '../../utils';

import { selectFormData } from '../../redux/selectors';
import { setUsers } from '../../redux/formDataSlice';

import styles from './Forms.module.scss';

const UncontrolledFormComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries } = useSelector(selectFormData);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<number>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(checkPasswordStrength(e.currentTarget.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = {
      firstName: e.currentTarget['first-name'].value,
      age: e.currentTarget.age.value,
      pictureFile: e.currentTarget['picture-file'].files?.[0],
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget['confirm-password'].value,
      conditions: e.currentTarget.conditions.checked,
      country: e.currentTarget.country.value,
    };

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async (validData) => {
        const id = generateUniqueId();
        const { firstName, age, pictureFile, email, password, conditions } = validData;
        const picture = await convertToBase64(pictureFile);
        const validConditions: boolean = conditions ?? false;
        dispatch(setUsers({ id, firstName, age, picture, email, password, conditions: validConditions }));
        formRef.current?.reset();
        setPasswordStrength(undefined);
        navigate('/');
      })
      .catch((validationErrors: ValidationError) => {
        const newErrors = validationErrors.inner.reduce(
          (acc: Record<string, string>, error: ValidationError) => ({
            ...acc,
            [error.path || '']: error.message,
          }),
          {},
        );
        setErrors(() => ({
          ...newErrors,
        }));
      });
  };

  const passwordHelperClass = getPasswordHelperClass(passwordStrength);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit}>
      <div className={styles.section}>
        <div className={styles.paper}>
          <h3 className={styles.title}>Create your account</h3>
          <div className={styles.info}>
            <span>Personal information</span>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="first-name" id="first-name-label">
              First name
              <input required className={styles.input} id="first-name" type="text" />
            </label>
            <p className={styles.formHelper}>{errors?.firstName && errors.firstName}</p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="age" id="age-label">
              Age
              <input required className={styles.input} id="age" type="number" />
            </label>
            <p className={styles.formHelper}>{errors?.age && errors.age}</p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="gender" id="gender-label">
              Gender
              <select defaultValue="male" className={styles.input} name="gender" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="country" id="country-label">
              Country
              <input list="countries" required className={styles.input} id="country" type="text" />
              <datalist id="countries">
                {countries.map((element) => (
                  <option key={element} value={element} />
                ))}
              </datalist>
            </label>
            <p className={styles.formHelper}>{errors?.country && errors.country}</p>
          </div>
          <div className={styles.info}>
            <span>Credentials Information</span>
          </div>
          <div className={`${styles.formControl} ${styles.formControl_fullWidth}`}>
            <label className={styles.label} htmlFor="email" id="email-label">
              Email
              <input required className={styles.input} id="email" type="text" />
            </label>
            <p className={styles.formHelper}>{errors?.email && errors.email}</p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="password" id="password-label">
              Password
              <input onChange={handleChange} required className={styles.input} id="password" type="password" />
            </label>
            <p className={styles.formHelper}>{errors.password && errors.password}</p>
            <p className={passwordHelperClass}>
              {passwordStrength !== undefined && getPasswordStrengthLabel(passwordStrength)}
            </p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="confirm-password" id="confirm-password-label">
              Confirm Password
              <input required className={styles.input} id="confirm-password" type="password" />
            </label>
            <p className={styles.formHelper}>{errors?.confirmPassword && errors.confirmPassword}</p>
          </div>
          <div className={`${styles.formControl} ${styles.formControl_fullWidth}`}>
            <label className={styles.label} htmlFor="picture-file" id="picture-file-label">
              Upload picture
              <input required className={styles.input} id="picture-file" type="file" />
            </label>
            <p className={styles.formHelper}>{errors?.pictureFile && errors.pictureFile}</p>
          </div>
          <div className={`${styles.formControl} ${styles.formControl_fullWidth}`}>
            <label className={`${styles.label} ${styles.label_conditions}`} htmlFor="conditions" id="conditions-label">
              <span>I accept the Terms and Conditions.</span>
              <input required id="conditions" type="checkbox" />
            </label>
            <p className={styles.formHelper}>{errors?.conditions && errors.conditions}</p>
          </div>
          <button className={styles.submit} type="submit">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default UncontrolledFormComponent;
