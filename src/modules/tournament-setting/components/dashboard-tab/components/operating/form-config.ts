import { SettingOperatingData } from '@app/api/tournament/get-setting';
import { Yup } from '@app/dekits/form';
import dayjs from 'dayjs';

export interface OperatingFormValues {
  tournament: string;
  start_time: any;
  end_time: any;
}

export function getValidationSchema() {
  const validationSchema = Yup.object({
    tournament: Yup.string().required(t('form.required')),
    start_time: Yup.string().required(t('form.required')).test({
      name: 'start_time',
      test(value) {
        if (!dayjs(value).isValid()) {
          return this.createError({path: 'start_time', message: 'Invalid date time'})
        }

        if (dayjs(value).isBefore(dayjs())) {
          return this.createError({path: 'start_time', message: 'Start time can not be sooner than current time'})
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

        return true;
      },
    }),
  });

  return validationSchema;
}

export function getInitialValues(tournamentId: string, initValues: SettingOperatingData) {
  const initialValues: OperatingFormValues = {
    tournament: tournamentId,
    start_time: initValues.start_time ? dayjs(initValues.start_time).toDate() : '',
    end_time: initValues.end_time ? dayjs(initValues.end_time).toDate() : '',
  };

  return initialValues;
}
