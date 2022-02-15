import {AccountDetails} from "./account-detail";
import {AvatarSetting} from "./avatar";
import {NotificationSetting} from "./notification";
import {PersonalDetails} from "./personal-details";
import {useSubscription} from "@app/hooks/subscription";
import {useCallback, useEffect, useMemo, useState} from "react";
import {updateProfile} from "@app/api/user/update-profile";
import {FormWrapper} from "@app/dekits/form";
import {PageWrapper} from "@app/dekits/layout";
import {myProfile, MyProfile} from "@app/api/user/my-profile";
import {getInitialValues, getValidationSchema, UpdateProfileFormValues} from "./form-config";

const metadata = {
  title: 'Profile Setting',
  description: 'Profile Setting',
  url: '/',
  canonical: '/',
  image: '/favicon.ico',
};

export function ProfileSettings() {

  const [myCurrentProfile, setMyCurrentProfile] = useState<MyProfile>({} as MyProfile);
  const subscription = useSubscription();

  const initialValues = useMemo<UpdateProfileFormValues>(() => getInitialValues(myCurrentProfile), [myCurrentProfile]);
  const validationSchema = getValidationSchema();

  useEffect(() => {
    const myProfileSub = myProfile().subscribe(res => {
      if (res.data) {
        console.log(res.data);
        setMyCurrentProfile(res.data);
      }
    }, (error) => {
      window.alert(error?.msg || 'Error');
    });

    subscription.add(myProfileSub);
  }, [subscription])

  const handleUpdateProfile = useCallback((values: UpdateProfileFormValues) => {
    const updateProfileSub = updateProfile(values).subscribe((res) => {
      console.log(res);
      window.alert('Update profile success');
    });

    subscription.add(updateProfileSub);
  }, [subscription]);

  return (
    <PageWrapper metadata={metadata}>
      <FormWrapper<UpdateProfileFormValues>
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleUpdateProfile}
        validationSchema={validationSchema}
      >
        <div className='de-profile-block mb-5'>
          <div className='de-px-xl-8 de-px-4'>
            <div className='row'>
              <div className='col-lg-3 col-md-6'>
                <AvatarSetting myProfile={myCurrentProfile}/>
              </div>
              <div className='col-lg-9 col-md-6'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <AccountDetails myProfile={myCurrentProfile}/>
                  </div>
                  <div className='col-lg-6'>
                    <PersonalDetails/>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-8'>
                    <NotificationSetting/>
                  </div>
                  {/*<div className='col-lg-4'>
                    <LinkedGameAccounts/>
                  </div>*/}
                </div>
                <div className='mb-5'>
                  <button type='submit' className='de-btn de-btn-outline-primary de-px-9'>
                    <span>Save changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormWrapper>
    </PageWrapper>
  )
}
