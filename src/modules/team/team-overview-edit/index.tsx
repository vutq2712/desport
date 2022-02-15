import { GameSmallCard } from "@app/dekits/components/game-small-card";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, useMemo } from "react";
import { getTeamDetail, TeamData } from "@app/api/team/team-info";
import { changeBannerApi, changeLogoApi, uploadTeamLogoOrBanner } from '@app/api/team/update-logo-banner';
import { Subscription } from "rxjs";
import { editTeam } from "@app/api/team/team-edit";
import { FormWrapper, Select, Input, ErrorMessage, Yup } from '@app/dekits/form';
import { countries } from "@app/dekits/utils";
import { openModal } from "@app/dekits/modal";
import { DragDropFile } from "@app/dekits/d2d-file";
import { mergeMap } from 'rxjs';

interface TeamEditFormValues {
  team_id: string;
  tag: string;
  country: string;
}

export function TeamOverviewEdit() {
  const router = useRouter();
  const [teamInfo, setTeamInfo] = useState<TeamData>();
  const team_id = router.query.teamId as string;
  const subscription = useMemo(() => new Subscription(), []);

  const validationSchema = Yup.object({
    tag: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  });

  const changeLogoOnClick = () => {
    const handleUpdateLogo = (files: File[]) => {
      return uploadTeamLogoOrBanner({
        file: files[0],
        path: 'logo',
        title: teamInfo?.name as string, 
        fileName: 'logo', 
      }).pipe(mergeMap(res => {
        setTeamInfo({...teamInfo as TeamData, logo : res.data + '?t=' + new Date().getTime()});
        return changeLogoApi({team_id: team_id, logo: res.data})
      }));
    }

    openModal(DragDropFile, {
      dialogClassName: 'de-modal-md',
      closeButton: true,
      data: { onSaveFile: handleUpdateLogo },
    });
  };

  const changeBannerOnClick = () => {
    const handleUpdateBanner = (files: File[]) => {
      return uploadTeamLogoOrBanner({
        file: files[0],
        path: 'banner',
        title: teamInfo?.name as string, 
        fileName: 'banner', 
      }).pipe(mergeMap(res => {
        setTeamInfo({...teamInfo as TeamData, banner : res.data + '?t=' + new Date().getTime()});
        return changeBannerApi({team_id: team_id, banner: res.data})
      }));
    }

    openModal(DragDropFile, {
      dialogClassName: 'de-modal-md',
      closeButton: true,
      data: { onSaveFile: handleUpdateBanner },
    });
  };

  const getTeamInfo = () => {
    const getDetail = getTeamDetail(team_id).subscribe(res => {
      if (res.data) {
        setTeamInfo(res.data);
      }
    })
    subscription.add(getDetail);
  }
  const handleUpdate = useCallback(values => {
    editTeam(values).subscribe(res => {
      if (res.code == 200)
        alert("OK")
    })
  }, []);

  useEffect(() => {
    if (team_id)
      getTeamInfo();
    if (teamInfo) subscription.unsubscribe();
  }, [teamInfo])

  return (
    <FormWrapper<TeamEditFormValues>
      initialValues={teamInfo ? { team_id: teamInfo ? teamInfo._id : '' as string, tag: teamInfo.tag as string, country: teamInfo.country as string } : { team_id: '', tag: '', country: '' }}
      enableReinitialize
      onSubmit={handleUpdate}
      validationSchema={validationSchema}
    >
      <div className='de-team-detail mb-5'>
        <section className='de-team-banner' style={{backgroundImage: `url(${teamInfo?.banner})`}}>
          <div className='de-team-banner-inner'>
            <button onClick={() => { router.push(`/team/team-detail/${team_id}`) }} type='button' className='de-btn de-team-back'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z' fill='currentColor' />
              </svg>
              <span>back to team overview</span>
            </button>
            <button onClick={changeBannerOnClick} type='button' className='de-btn de-btn-sm de-btn-outline-secondary de-team-change-banner'>
              <span>Change banner</span>
            </button>
          </div>
        </section>
        <div className='de-px-xl-8 de-px-4'>
          <div className='row justify-content-center'>
            <div className='col-xl-5 col-lg-8'>
              <div className='de-team-form'>
                <div className='de-team-logo-wrap'>
                  <div className='de-team-logo'>
                    <img src={teamInfo?.logo} alt='' />
                  </div>
                  {teamInfo && <button onClick={changeLogoOnClick} type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>
                    <span>Change logo</span>
                  </button>}
                </div>
                <div className='de-card'>
                  <div className='de-card-body'>
                    <div className='de-mb-2'>
                      <GameSmallCard logo={teamInfo?.game[0].logo} name={teamInfo?.game[0].display_name} />
                    </div>
                    <div className='de-form-group disabled'>
                      <div className='de-form-control-with-icon'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <g opacity='0.8'>
                            <path d='M11.8 22.345C3.10004 22.345 3.00004 13.675 3.00004 13.595V5.53502C2.99849 5.39228 3.03826 5.25213 3.11456 5.13148C3.19085 5.01082 3.30042 4.91481 3.43004 4.85502L11.43 1.07502C11.5295 1.02568 11.639 1 11.75 1C11.8611 1 11.9706 1.02568 12.07 1.07502L20.12 4.85502C20.2497 4.91481 20.3592 5.01082 20.4355 5.13148C20.5118 5.25213 20.5516 5.39228 20.55 5.53502V13.625C20.62 13.675 20.52 22.345 11.8 22.345ZM4.52004 5.97502V13.595C4.52004 13.885 4.63004 20.845 11.82 20.845C19.01 20.845 19.12 13.845 19.12 13.585V5.97502L11.8 2.53502L4.52004 5.97502Z' fill='#5062E5' />
                            <path d='M4.22004 16.5351C4.07187 16.5323 3.92775 16.4862 3.80544 16.4025C3.68313 16.3188 3.58795 16.2011 3.53163 16.0641C3.47531 15.927 3.46029 15.7764 3.48844 15.6309C3.51659 15.4854 3.58666 15.3513 3.69004 15.2451L15.69 3.2451C15.8333 3.0979 16.0291 3.01363 16.2344 3.01081C16.4398 3.008 16.6378 3.08688 16.785 3.2301C16.9322 3.37331 17.0165 3.56914 17.0193 3.77449C17.0221 3.97984 16.9433 4.1779 16.8 4.3251L4.80004 16.3251C4.72239 16.3972 4.63103 16.453 4.53139 16.489C4.43174 16.5251 4.32586 16.5408 4.22004 16.5351Z' fill='#5062E5' />
                            <path d='M6.93 20.955C6.73201 20.9507 6.54285 20.8722 6.4 20.735C6.25955 20.5944 6.18066 20.4038 6.18066 20.205C6.18066 20.0063 6.25955 19.8156 6.4 19.675L19.32 6.755C19.4622 6.62252 19.6502 6.5504 19.8445 6.55383C20.0388 6.55726 20.2242 6.63597 20.3616 6.77338C20.499 6.91079 20.5778 7.09618 20.5812 7.29048C20.5846 7.48478 20.5125 7.67283 20.38 7.815L7.46 20.735C7.31828 20.8739 7.12842 20.9527 6.93 20.955Z' fill='#5062E5' />
                          </g>
                        </svg>
                        <span className='de-form-control form-control' >{teamInfo?.name}</span>
                      </div>
                    </div>
                    <div className='de-form-group'>
                      <div className='de-form-control-with-icon de-mb-2'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <g opacity='0.8'>
                            <path d='M4.75004 22C4.63838 22.0275 4.5217 22.0275 4.41004 22C4.2857 21.9381 4.18131 21.8424 4.1088 21.7239C4.0363 21.6054 3.99861 21.4689 4.00004 21.33V5.59C4.01055 4.63594 4.39626 3.72438 5.07372 3.05253C5.75119 2.38068 6.66593 2.00257 7.62004 2H16.74C17.6993 2.00264 18.6185 2.38488 19.2969 3.06319C19.9752 3.7415 20.3574 4.66073 20.36 5.62V21.28C20.3583 21.4186 20.3186 21.5541 20.2454 21.6719C20.1721 21.7896 20.0681 21.885 19.9445 21.9479C19.8209 22.0107 19.6825 22.0385 19.5442 22.0283C19.4059 22.0181 19.2731 21.9703 19.16 21.89L12.16 16.73L5.18004 21.89C5.04995 21.9665 4.90088 22.0046 4.75004 22ZM7.62004 3.47C7.05778 3.47 6.51855 3.69336 6.12097 4.09093C5.7234 4.48851 5.50004 5.02774 5.50004 5.59V19.8L11.74 15.19C11.8683 15.0935 12.0245 15.0412 12.185 15.0412C12.3456 15.0412 12.5018 15.0935 12.63 15.19L18.86 19.8V5.59C18.8574 5.02855 18.6332 4.49085 18.2362 4.09384C17.8392 3.69683 17.3015 3.47263 16.74 3.47H7.62004Z' fill='white' />
                          </g>
                        </svg>
                        <Input placeholder='Team tag' name='tag' />
                        <               ErrorMessage name='tag' />
                        {/* <input className="de-form-control form-control" placeholder="Team tag" /> */}
                      </div>
                    </div>
                    <div className='de-form-group form-group de-mb-7'>
                      <Select name='country' options={countries} hasIcon />
                      <ErrorMessage name='country' />
                    </div>
                    <div className='row'>
                      <div className='col-md-4 col-6'>
                        <a onClick={() => { router.push(`/team/team-detail/${team_id}`) }} className='de-btn w-100'>
                          <span>cancel</span>
                        </a>
                      </div>
                      <div className='col-md-8 col-6'>
                        <button type='submit' className='de-btn de-btn-primary w-100'>
                          <span>Update</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}