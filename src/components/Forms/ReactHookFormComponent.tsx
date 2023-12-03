import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

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

const ReactHookFormComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries } = useSelector(selectFormData);
  const [passwordStrength, setPasswordStrength] = useState<number>();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange', resolver: yupResolver<FormData>(validationSchema) });

  const newPassword = watch('password');

  useEffect(() => {
    if (newPassword) setPasswordStrength(checkPasswordStrength(newPassword));
  }, [newPassword]);

  const onSubmit: SubmitHandler<FormData> = async (validData) => {
    const id = generateUniqueId();
    const { firstName, age, pictureFile, password, email, conditions } = validData;
    const picture = await convertToBase64(pictureFile);
    const validConditions: boolean = conditions ?? false;
    dispatch(setUsers({ id, firstName, age, picture, email, password, conditions: validConditions }));
    setPasswordStrength(undefined);
    reset();
    navigate('/');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const file = event.target.files[0];
      setValue('pictureFile', file);
      trigger('pictureFile');
    }
  };

  const passwordHelperClass = getPasswordHelperClass(passwordStrength);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.section}>
        <div className={styles.paper}>
          <h3 className={styles.title}>Create your account</h3>
          <div className={styles.info}>
            <span>Personal information</span>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="firstName" id="first-name-label">
              First name
              <input id="firstName" required className={styles.input} {...register('firstName')} />
            </label>
            <p className={styles.formHelper}>{errors?.firstName && errors.firstName.message}</p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="age" id="age-label">
              Age
              <input id="age" required className={styles.input} {...register('age')} type="number" />
            </label>
            <p className={styles.formHelper}>{errors?.age && errors.age.message}</p>
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
              <input
                list="countries"
                id="country"
                required
                className={styles.input}
                {...register('country')}
                type="text"
              />
              <datalist id="countries">
                {countries.map((element) => (
                  <option key={element} value={element} />
                ))}
              </datalist>
            </label>
            <p className={styles.formHelper}>{errors?.country && errors.country.message}</p>
          </div>
          <div className={styles.info}>
            <span>Credentials Information</span>
          </div>
          <div className={`${styles.formControl} ${styles.formControl_fullWidth}`}>
            <label className={styles.label} htmlFor="email" id="email-label">
              Email
              <input id="email" required className={styles.input} {...register('email')} />
            </label>
            <p className={styles.formHelper}>{errors?.email && errors.email.message}</p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="password" id="password-label">
              Password
              <input id="password" className={styles.input} {...register('password')} type="password" />
            </label>
            <p className={styles.formHelper}>{errors.password && errors.password.message}</p>
            <p className={passwordHelperClass}>
              {passwordStrength !== undefined && getPasswordStrengthLabel(passwordStrength)}
            </p>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="confirm-password" id="confirm-password-label">
              Confirm Password
              <input id="confirm-password" required className={styles.input} {...register('confirmPassword')} />
            </label>
            <p className={styles.formHelper}>{errors?.confirmPassword && errors.confirmPassword.message}</p>
          </div>
          <div className={`${styles.formControl} ${styles.formControl_fullWidth}`}>
            <label className={styles.label} htmlFor="picture-file" id="picture-file-label">
              Upload picture
              <input
                id="picture-file"
                className={styles.input}
                onChange={(e) => {
                  handleFileChange(e);
                }}
                type="file"
              />
            </label>
            <p className={styles.formHelper}>{errors?.pictureFile && errors.pictureFile.message}</p>
          </div>
          <div className={`${styles.formControl} ${styles.formControl_fullWidth}`}>
            <label className={`${styles.label} ${styles.label_conditions}`} htmlFor="conditions" id="conditions-label">
              <span>I accept the Terms and Conditions.</span>
              <input id="conditions" required {...register('conditions')} type="checkbox" />
            </label>
            <p className={styles.formHelper}>{errors?.conditions && errors.conditions.message}</p>
          </div>
          <button disabled={!isValid} className={styles.submit} type="submit">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReactHookFormComponent;
