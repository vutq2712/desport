import {SchemaOf, Yup} from '@app/dekits/form';
import dayjs from "dayjs";
import {MyProfile} from "@app/api/user/my-profile";

export interface ChangePasswordFormValues {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}

export function getInitialValues() {
  const initialValues: ChangePasswordFormValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  return initialValues;
}

export function getValidationSchema() {
  const validationSchema: SchemaOf<ChangePasswordFormValues> = Yup.object({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmNewPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  return validationSchema;
}

export const countryDropdown = [
  // { value: '', label: 'All' },
  {value: "VN", label: "VietNam"},
  {value: "US", label: "US"},
  {value: "UK", label: "UK"},
  {value: "China", label: "China"},
  {value: "Singapore", label: "Singapore"}
]


