import { Yup } from '@app/dekits/form';
import { TFunction } from 'next-i18next';

export interface FormValues {
  tournament: string,
  game: string,
  team_master: string,
  captain_profile: string,
  members: string[],
  members_profile: string[],
  email_contact: string,
  name_contact: string,
}

export function getValidationSchema() {
  const validationSchema = Yup.object({
    tournament: Yup.string().required(t('form.required')),
    game: Yup.string().required(t('form.required')),
    team_master: Yup.string().required(t('form.required')),
    captain_profile: Yup.string().required(t('form.required')),
    members: Yup.array().test('members', 'Members required', value => value?.length === 1),
    members_profile: Yup.array().test('members_profile', 'Members profile required', value => value?.length === 1),
    email_contact: Yup.string().email('Invalid email address').required('Required'),
    name_contact: Yup.string().required(t('form.required')),
  });

  return validationSchema;
}

export function getInitialValues(initValues) {
  const initialValues: FormValues = {
    tournament: initValues.tournament,
    game: initValues.game,
    team_master: '',
    captain_profile: '',
    members: [],
    members_profile: [],
    email_contact: '',
    name_contact: '',
  };

  return initialValues;
}
