import { useCallback, useMemo } from 'react';
import { API_END_POINT } from '@app/const/common.const'
import { FormWrapper, Input, ErrorMessage, SchemaOf, Yup } from '@app/dekits/form';
import { Http } from '@app/services/http';
import { useSubscription } from '@app/hooks/subscription';

interface AddAccountProps {
  gameId: string;
  onSuccess?: () => void;
  onFail?: () => void;
}

interface AddAccountFormValues {
  game: string,
  profile_name: string,
}

const validationSchema: SchemaOf<AddAccountFormValues> = Yup.object({
  game: Yup.string().required('Required'),
  profile_name: Yup.string().required('Required'),
});

export function AddAccount(props: AddAccountProps) {
  const { gameId, onSuccess } = props;
  const subscription = useSubscription();
  const initialValues = useMemo<AddAccountFormValues>(() => ({
    game: gameId,
    profile_name: '',
  }), []);

  const handleAddAccount = useCallback((values) => {
    const changePwdSub = Http.request({
      url: `${API_END_POINT}/user-game-profile/create-profile`,
      body: values,
      method: 'POST'
    }).subscribe(() => {
      onSuccess && onSuccess();
    });

    subscription.add(changePwdSub);
  }, [subscription]);

  return (
    <FormWrapper<AddAccountFormValues>
      initialValues={initialValues}
      onSubmit={handleAddAccount}
      validationSchema={validationSchema}
    >
      <div className='modal-body'>
        <div className='form-group'>
          <label>Profile name</label>
          <Input name='profile_name' />
          <ErrorMessage name='profile_name' />
        </div>
      </div>

      <div className='modal-footer'>
        <button type='submit' className='btn btn-primary'>save</button>
      </div>
    </FormWrapper>
  )
}
