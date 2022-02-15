import {useCallback, useMemo} from 'react';
import {ErrorMessage, FormWrapper, InputPassword} from '@app/dekits/form';
import {useSubscription} from '@app/hooks/subscription';
import {changePassword} from '@app/api/user/change-password';
import {openModal} from '@app/dekits/modal';
import {ChangePasswordFormValues, getInitialValues, getValidationSchema} from '@app/modules/profile-setting/components/settings/change-password/form-config';

export function ChangePassword() {
  const handleChangePasswordClick = useCallback(() => {
    openModal(ChangePasswordModal);
  }, []);

  return (
    <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary' onClick={handleChangePasswordClick}>Change password</button>
  )
}

function ChangePasswordModal(props: any) {
  const {modalRef} = props;
  const subscription = useSubscription();

  const initialValues = useMemo<ChangePasswordFormValues>(() => (getInitialValues()), []);
  const validationSchema = getValidationSchema();

  const handleChangePassword = useCallback((values: ChangePasswordFormValues) => {
    const changePasswordSub = changePassword(values).subscribe(res => {
      window.alert('Change password success');
    }, (error) => {
      window.alert(error?.msg || 'Error');
    });

    subscription.add(changePasswordSub);
  }, [subscription]);

  return (
    <div className='modal-body'>
      <div className='modal-title'>Change Password</div>
      <div className='modal-description'>Enter your current and new password</div>
      <FormWrapper<ChangePasswordFormValues>
        initialValues={initialValues}
        onSubmit={handleChangePassword}
        validationSchema={validationSchema}
      >
        <div className='modal-inner'>
          <div className='de-form-group form-group'>
            <InputPassword name='oldPassword' placeholder='Old password'/>
            <div className='de-form-error'>
              <ErrorMessage name='oldPassword'/>
            </div>
          </div>

          <div className='de-form-group form-group'>
            <InputPassword name='newPassword' placeholder='New password'/>
            <div className='de-form-error'>
              <ErrorMessage name='newPassword'/>
            </div>
          </div>

          <div className='de-form-group form-group'>
            <InputPassword name='confirmNewPassword' placeholder='Confirm password'/>
            <div className='de-form-error'>
              <ErrorMessage name='confirmNewPassword'/>
            </div>
          </div>
        </div>
        <div className='modal-actions'>
          <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
          <button type='submit' className='de-btn de-btn-primary'>Change password</button>
        </div>
      </FormWrapper>
    </div>
  )
}
