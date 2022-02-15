import { Yup } from '@app/dekits/form';
import dayjs from 'dayjs';
import { SettingRegistrationData } from '@app/api/tournament/get-setting';
// eslint-disable-next-line import/no-cycle
import { currencyOptions } from './index';
import { OperatingFormValues } from '../operating/form-config';

export interface RegistrationFormValues {
  tournament: string;
  is_require: Array<any>;
  quantity: number;
  currency: string;
  roster_size: number;
  start_time: any;
  end_time: any;
}

export function getValidationSchema(operatingValues: OperatingFormValues) {
  const validationSchema = Yup.object({
    tournament: Yup.string().required(t('form.required')),
    quantity: Yup.number().required(t('form.required')),
    currency: Yup.string().required(t('form.required')),
    roster_size: Yup.number().required(t('form.required')),
    start_time: Yup.string().required(t('form.required')).test({
      name: 'start_time',
      test(value) {
        if (!dayjs(value).isValid()) {
          return this.createError({path: 'start_time', message: 'Invalid date time'})
        }

        if (
          dayjs(value).isBefore(dayjs(operatingValues?.start_time)) ||
          dayjs(value).isAfter(dayjs(operatingValues?.end_time))
        ) {
          return this.createError({path: 'start_time', message: 'Start time can not be sooner than operating start time'})
        }

        return true;
      },
    }),
    end_time: Yup.string().required(t('form.required')).test({
      name: 'end_time',
      test(value) {
        if (!dayjs(value).isValid()) {
          return this.createError({path: 'end_time', message: 'Invalid date time'})
        }

        if (dayjs(value).isBefore(dayjs(this.parent.start_time))) {
          return this.createError({path: 'end_time', message: 'End time can not be sooner than start time'})
        }

        if (
          dayjs(value).isBefore(dayjs(operatingValues?.start_time)) ||
          dayjs(value).isAfter(dayjs(operatingValues?.end_time))
        ) {
          return this.createError({path: 'end_time', message: 'End time can not be sooner than operating end time'})
        }

        return true;
      },
    }),
  });

  return validationSchema;
}

export function getInitialValues(tournamentId: string, initValues: SettingRegistrationData) {
  const initialValues: RegistrationFormValues = {
    tournament: tournamentId,
    is_require: initValues.fee?.is_require ? ['1'] : [],
    quantity: initValues.fee?.quantity ?? 10,
    currency: initValues.fee?.currency ? initValues.fee?.currency : currencyOptions[0].value,
    roster_size: initValues.roster_size ?? 10,
    start_time: initValues.start_time ? dayjs(initValues.start_time).toDate() : '',
    end_time: initValues.end_time ? dayjs(initValues.end_time).toDate() : '',
  };

  return initialValues;
}
