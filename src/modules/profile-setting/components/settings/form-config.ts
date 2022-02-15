import {SchemaOf, Yup} from '@app/dekits/form';
import dayjs from "dayjs";
import {MyProfile} from "@app/api/user/my-profile";

export interface UpdateProfileFormValues {
  notification_tournament: boolean,
  notification_nextmatch: boolean,
  notification_news: boolean,
  name: string,
  country?: string,
  birthday: string,
}

export function getInitialValues(initValues: MyProfile) {
  const initialValues: UpdateProfileFormValues = {
    notification_tournament: initValues.notification_tournament ?? false,
    notification_nextmatch: initValues.notification_nextmatch ?? false,
    notification_news: initValues.notification_news ?? false,
    name: initValues.name ?? '',
    country: initValues.country ?? '',
    birthday: initValues.birthday ?? '',
  }

  return initialValues;
}

export function getValidationSchema() {
  const validationSchema: SchemaOf<UpdateProfileFormValues> = Yup.object({
    notification_tournament: Yup.boolean().required(),
    notification_nextmatch: Yup.boolean().required(),
    notification_news: Yup.boolean().required(),
    name: Yup.string().required('Required'),
    country: Yup.string().optional(),
    birthday: Yup.string().required('Required').test({
      name: 'birthday',
      test(value) {
        const customParseFormat = require('dayjs/plugin/customParseFormat');
        dayjs.extend(customParseFormat);

        if (!dayjs(value, "DD/MM/YYYY").isValid()) {
          return this.createError({path: 'birthday', message: 'Invalid date time'})
        }

        console.log(dayjs(value, "DD/MM/YYYY").year() + 18);
        console.log(dayjs().year());
        if ((dayjs(value, "DD/MM/YYYY").year() + 18) > dayjs().year()) {
          return this.createError({path: 'birthday', message: 'Must be older than 18 age'})
        }
        return true;
      },
    }),
  });

  return validationSchema;
}

