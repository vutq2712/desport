import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { listGames } from '@app/api/game/list-game';
import { createTeam } from '@app/api/user-team/create-team';
import { FormWrapper, Select, SelectOptions, Input, ErrorMessage, Yup } from '@app/dekits/form';
import { FormikProps } from 'formik';
import { countries } from '@app/dekits/utils';
import { useRouter } from 'next/router';
import { useSubscription } from '@app/hooks/subscription';

export interface TeamFormValues {
  name: string;
  tag: string;
  country: string;
  game: string;
  logo?: File;
  banner?: File;
}

function CreateTeamModal(props: any) {
  const { modalRef } = props;
  const router = useRouter();
  const formRef = useRef<FormikProps<TeamFormValues>>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    tag: Yup.string().required('Required').max(7, 'Max 7 characters').matches(/^(?!\.)(?!.*\.$)(?!.*?\.\.)[a-zA-Z0-9.]+$/, 'Team Tag must contain letters (a-z), numbers (0-9), and periods (.)'),
    country: Yup.string().required('Required'),
    game: Yup.string().required('Required'),
  });
  const [gamesOptions, setGames] = useState<SelectOptions>([]);
  const subscription = useSubscription();

  useEffect(() => {
    const myGamesSub = listGames().subscribe(
      res => {
        setGames(res.data.map(game => ({
          label: game.display_name,
          value: game._id,
        })));
      },
      err => { }
    );
    subscription.add(myGamesSub);
  }, [subscription]);

  const onChangeLogoFile = (e) => {
    if (!e.target || !e.target.files) return;
    formRef.current?.setFieldValue("logo", e.target.files[0]);
  }

  const onChangeBannerFile = (e) => {
    if (!e.target || !e.target.files) return;
    formRef.current?.setFieldValue("banner", e.target.files[0]);
  }

  const handleCreate = useCallback(values => {
    console.log(values)
    //upload Logo
    createTeam({
      game: values.game,
      name: values.name,
      tag: values.tag,
      country: values.country,
      logo: values.logo,
      banner: values.banner
    }).subscribe((res) => {
      router.push(`/team/team-detail/${res.data._id}`);
      modalRef.close()
    }, (error) => {
      alert(error?.msg || 'Error');
    })
  }, []);

  return (
    <FormWrapper<TeamFormValues>
      innerRef={formRef}
      initialValues={{ name: '', tag: '', country: '', game: '' }}
      onSubmit={handleCreate}
      validationSchema={validationSchema}
    >
      <div className='modal-body'>
        <div className='modal-title de-mb-4'>Create a team</div>
        <div className='modal-inner'>
          <div className='de-form-group form-group'>
            <div className='de-form-control-with-icon'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g opacity='0.8'>
                  <path d='M11.8 22.345C3.10004 22.345 3.00004 13.675 3.00004 13.595V5.53502C2.99849 5.39228 3.03826 5.25213 3.11456 5.13148C3.19085 5.01082 3.30042 4.91481 3.43004 4.85502L11.43 1.07502C11.5295 1.02568 11.639 1 11.75 1C11.8611 1 11.9706 1.02568 12.07 1.07502L20.12 4.85502C20.2497 4.91481 20.3592 5.01082 20.4355 5.13148C20.5118 5.25213 20.5516 5.39228 20.55 5.53502V13.625C20.62 13.675 20.52 22.345 11.8 22.345ZM4.52004 5.97502V13.595C4.52004 13.885 4.63004 20.845 11.82 20.845C19.01 20.845 19.12 13.845 19.12 13.585V5.97502L11.8 2.53502L4.52004 5.97502Z' fill='currentColor' />
                  <path d='M4.22004 16.5351C4.07187 16.5323 3.92775 16.4862 3.80544 16.4025C3.68313 16.3188 3.58795 16.2011 3.53163 16.0641C3.47531 15.927 3.46029 15.7764 3.48844 15.6309C3.51659 15.4854 3.58666 15.3513 3.69004 15.2451L15.69 3.2451C15.8333 3.0979 16.0291 3.01363 16.2344 3.01081C16.4398 3.008 16.6378 3.08688 16.785 3.2301C16.9322 3.37331 17.0165 3.56914 17.0193 3.77449C17.0221 3.97984 16.9433 4.1779 16.8 4.3251L4.80004 16.3251C4.72239 16.3972 4.63103 16.453 4.53139 16.489C4.43174 16.5251 4.32586 16.5408 4.22004 16.5351Z' fill='currentColor' />
                  <path d='M6.93 20.955C6.73201 20.9507 6.54285 20.8722 6.4 20.735C6.25955 20.5944 6.18066 20.4038 6.18066 20.205C6.18066 20.0063 6.25955 19.8156 6.4 19.675L19.32 6.755C19.4622 6.62252 19.6502 6.5504 19.8445 6.55383C20.0388 6.55726 20.2242 6.63597 20.3616 6.77338C20.499 6.91079 20.5778 7.09618 20.5812 7.29048C20.5846 7.48478 20.5125 7.67283 20.38 7.815L7.46 20.735C7.31828 20.8739 7.12842 20.9527 6.93 20.955Z' fill='currentColor' />
                </g>
              </svg>
              <Input placeholder='Team name' name='name' />
              <ErrorMessage name='name' />
            </div>
          </div>

          <div className='de-form-group form-group'>
            <div className='de-form-control-with-icon'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g opacity='0.8'>
                  <path d='M4.75004 22C4.63838 22.0275 4.5217 22.0275 4.41004 22C4.2857 21.9381 4.18131 21.8424 4.1088 21.7239C4.0363 21.6054 3.99861 21.4689 4.00004 21.33V5.59C4.01055 4.63594 4.39626 3.72438 5.07372 3.05253C5.75119 2.38068 6.66593 2.00257 7.62004 2H16.74C17.6993 2.00264 18.6185 2.38488 19.2969 3.06319C19.9752 3.7415 20.3574 4.66073 20.36 5.62V21.28C20.3583 21.4186 20.3186 21.5541 20.2454 21.6719C20.1721 21.7896 20.0681 21.885 19.9445 21.9479C19.8209 22.0107 19.6825 22.0385 19.5442 22.0283C19.4059 22.0181 19.2731 21.9703 19.16 21.89L12.16 16.73L5.18004 21.89C5.04995 21.9665 4.90088 22.0046 4.75004 22ZM7.62004 3.47C7.05778 3.47 6.51855 3.69336 6.12097 4.09093C5.7234 4.48851 5.50004 5.02774 5.50004 5.59V19.8L11.74 15.19C11.8683 15.0935 12.0245 15.0412 12.185 15.0412C12.3456 15.0412 12.5018 15.0935 12.63 15.19L18.86 19.8V5.59C18.8574 5.02855 18.6332 4.49085 18.2362 4.09384C17.8392 3.69683 17.3015 3.47263 16.74 3.47H7.62004Z' fill='currentColor' />
                </g>
              </svg>
              <Input placeholder='Team tag' name='tag' />
              <ErrorMessage name='tag' />
              {/* <input className="de-form-control form-control" placeholder="Team tag" /> */}
            </div>
          </div>

          <div className='de-form-group form-group'>
            <Select name='country' options={countries} hasIcon />
            <ErrorMessage name='country' />
          </div>


          <div className='de-form-group form-group'>
            <Select name='game' options={gamesOptions} />
            <ErrorMessage name='game' />
          </div>

          <div className='de-form-group form-group'>
            <label className='de-form-label'>Team logo</label>
            <div>
              <input id='logo' name='logo' type='file' onChange={onChangeLogoFile} className='' accept='image/*' />
            </div>
          </div>

          <div className='de-form-group form-group'>
            <label className='de-form-label'>Team banner</label>
            <div>
              <input id='banner' name='banner' type='file' onChange={onChangeBannerFile} className='' accept='image/*' />
            </div>
          </div>
        </div>
        <div className='modal-actions'>
          <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
          <button type='submit' className='de-btn de-btn-primary' >Create</button>
        </div>
      </div>
    </FormWrapper>
  )
}

export function CreateTeam() {
  const handleCreateClick = useCallback(() => {
    openModal(CreateTeamModal);
  }, []);

  return (
    <button type='button' className='de-btn de-btn-outline-primary' onClick={handleCreateClick}>
      <span>Create</span>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12 16.4902C11.8011 16.4902 11.6103 16.4112 11.4697 16.2706C11.329 16.1299 11.25 15.9391 11.25 15.7402V7.74023C11.25 7.54132 11.329 7.35056 11.4697 7.2099C11.6103 7.06925 11.8011 6.99023 12 6.99023C12.1989 6.99023 12.3897 7.06925 12.5303 7.2099C12.671 7.35056 12.75 7.54132 12.75 7.74023V15.7402C12.75 15.9391 12.671 16.1299 12.5303 16.2706C12.3897 16.4112 12.1989 16.4902 12 16.4902Z' fill='currentColor' />
        <path d='M16 12.49H7.99997C7.81725 12.4688 7.6487 12.3812 7.52636 12.2438C7.40402 12.1065 7.33643 11.9289 7.33643 11.745C7.33643 11.5611 7.40402 11.3835 7.52636 11.2462C7.6487 11.1088 7.81725 11.0212 7.99997 11H16C16.1989 11 16.3896 11.079 16.5303 11.2197C16.671 11.3603 16.75 11.5511 16.75 11.75C16.75 11.9489 16.671 12.1397 16.5303 12.2803C16.3896 12.421 16.1989 12.5 16 12.5V12.49Z' fill='currentColor' />
        <path d='M12.0001 21.4405C11.8668 21.4415 11.7356 21.407 11.6201 21.3405L3.87006 16.8705C3.75823 16.8025 3.66557 16.7071 3.60083 16.5934C3.5361 16.4797 3.50141 16.3513 3.50006 16.2205V7.27045C3.49844 7.13901 3.53186 7.00951 3.59689 6.89527C3.66192 6.78103 3.75621 6.68617 3.87006 6.62045L11.6201 2.14046C11.7347 2.07653 11.8638 2.04297 11.9951 2.04297C12.1263 2.04297 12.2554 2.07653 12.3701 2.14046L20.1201 6.62045C20.2365 6.68405 20.3334 6.77816 20.4003 6.89268C20.4673 7.00721 20.5018 7.13781 20.5001 7.27045V16.2705C20.4986 16.4025 20.4628 16.5318 20.3962 16.6458C20.3296 16.7598 20.2344 16.8545 20.1201 16.9205L12.3701 21.3905C12.2537 21.4408 12.1256 21.4581 12.0001 21.4405ZM5.00006 15.7805L12.0001 19.7805L19.0001 15.7805V7.70045L12.0001 3.70045L5.00006 7.70045V15.7805Z' fill='currentColor' />
      </svg>
    </button>
  )
}
