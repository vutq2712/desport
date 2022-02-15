import {getListTeam, TeamData} from "@app/api/tournament/register/get-list-team";
import {getMembersProfile, MemberProfileData} from "@app/api/tournament/register/get-members-profile";
import {register} from "@app/api/tournament/register/register";
import {AccountData, myProfiles} from "@app/api/user-game-profile/my-profiles";
import {SelectMember} from "@app/dekits/components/select-member";
import {SelectProfile} from "@app/dekits/components/select-profile";
import {SelectTeam} from "@app/dekits/components/select-team";
import {TournamentSmallCard} from "@app/dekits/components/tournament-small-card";
import {ErrorMessage, FormikProps, FormWrapper, Input} from "@app/dekits/form";
import {useSession} from "@app/hooks/session";
import {useSubscription} from "@app/hooks/subscription";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useMemo, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useTournamentContext} from "../../context/tournament-context";
import {TournamentTabKeys} from "../../services/sidebar";
import {FormValues, getInitialValues, getValidationSchema} from "./form-config";

export interface MembersSelected {
  _id: {
    _id: string,
    username: string,
    name: string,
    avatar: string,
  },
  profileInfo: Array<{
    _id: string,
    profile_name: string,
  }>,
  selected?: {
    _id: string,
    profile_name: string,
  },
}

export function RegisterTab() {
  const [profiles, changeProfiles] = useState<AccountData[]>([]);
  const [profileSelected, changeProfileSelected] = useState<AccountData | null>(null);
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const [teams, changeTeams] = useState<TeamData[]>([]);
  const [teamMembers, changeTeamMembers] = useState<MemberProfileData[]>([]);
  const [teamSelected, changeTeamSelected] = useState<TeamData | null>(null);
  const [membersSelected, changeMembersSelected] = useState<MembersSelected[]>([]);
  const subscription = useSubscription();
  const router = useRouter();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const tournamentCtx = useTournamentContext();
  const {userInfo} = useSession();

  const initialValues = useMemo<FormValues>(
    () => getInitialValues({
      tournament: tournamentCtx.detail._id,
      game: tournamentCtx.detail.game._id,
    }),
    [tournamentCtx],
  );

  const validationSchema = getValidationSchema();

  useEffect(() => {
    const sub = getListTeam(tournamentCtx.detail.game._id).subscribe({
      next: res => {
        changeTeams(res.data);

        if (res.data.length) {
          changeTeamSelected(res.data[0]);
          formRef.current?.setFieldValue('team_master', res.data[0]._id);
        }
      },
      error: error => alert(error?.response?.msg || 'Error'),
    })

    subscription.add(sub);

    const subProfile = myProfiles({game: tournamentCtx.detail.game._id}).subscribe({
      next: res => {
        changeProfiles(res.data);
        if (res.data.length) {
          changeProfileSelected(res.data[0]);
          formRef.current?.setFieldValue('captain_profile', res.data[0]._id);
        }
      },
      error: error => alert(error?.msg || error?.response?.msg || 'Error: '+error),
    })

    subscription.add(subProfile);
  }, [subscription, tournamentCtx.detail.game._id])

  useEffect(() => {
    if (!teamSelected?.members || !teamSelected?.members.length) return;

    const sub = getMembersProfile({
      game: tournamentCtx.detail.game._id,
      members: teamSelected?.members,
    }).subscribe({
      next: res => {
        changeTeamMembers(res.data);
      },
      error: error => alert(error?.msg || error?.response?.msg || 'Error: '+error),
    })

    subscription.add(sub);
  }, [subscription, teamSelected])

  const onSelectedMembers = (members: MembersSelected[]) => {
    changeMembersSelected(members);

    formRef.current?.setFieldValue('members', members.length ? members.map(item => item._id._id) : []);
    formRef.current?.setFieldValue('members_profile', members.length ? members.map(item => {
      if (item.selected) return item.selected._id;

      return item.profileInfo[0]._id;
    }) : []);
  }

  const onSelectedTeam = (team: TeamData) => {
    changeTeamSelected(team);

    changeMembersSelected([]);

    formRef.current?.setFieldValue('team_master', team._id);
    formRef.current?.setFieldValue('members', []);
    formRef.current?.setFieldValue('members_profile', []);
  }

  const onSelectedProfile = (profile: AccountData) => {
    changeProfileSelected(profile);

    formRef.current?.setFieldValue('captain_profile', profile._id);
  }

  const getSelectedMembersIndex = () => {
    return (teamMembers as any).reduce((acc, value, index) => {
      if (Array.isArray(membersSelected) && membersSelected.length  && membersSelected.findIndex(member => member._id._id === value._id._id) > -1) {
        return [...acc, index];
      }

      return acc;
    }, [])
  }

  const handleSubmit = (values: FormValues) => {
    const sub = register(values).subscribe({
      next: res => {
        alert('Success');
        router.push(`/tournament/${tournamentCtx.detail._id}?tab=${TournamentTabKeys.OVERVIEW}`);
      },
      error: error => alert(error?.response?.msg || 'Error'),
    })

    subscription.add(sub);
  }

  return (
    <FormWrapper<FormValues>
      initialValues={initialValues}
      innerRef={formRef}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className='de-register-tab'>
        <h4 className='de-team-name'>register for {tournamentCtx.detail.name}</h4>
        <div className='de-px-xl-8 de-px-4'>
          <Row className='de-gx-3'>
            <Col lg='9'>
              <div className='de-card'>
                <div className='de-card-body'>
                  <div className='de-tournament-profile'>
                    <div className='de-tournament-profile-logo'>
                      <img src={userInfo?.avatar || '/assets/images/team-logo-1.png'} alt=''/>
                    </div>
                    <div className='de-tournament-profile-info'>
                      <SelectProfile profiles={profiles} onSelectedProfile={onSelectedProfile}/>
                      <div className='de-tournament-profile-name'>{profileSelected?.profile_name}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='de-card'>
                <div className='de-card-header de-mb-3'>
                  <div className='de-card-title'>Configure Entry</div>
                </div>
                <div className='de-card-body de-mb-3'>
                  <div className='de-section-title'>Team Information</div>
                  <div className='de-section-description'>This is how your team will publicly appear in this
                    tournament
                  </div>

                  {!teams.length &&
                    <div className='de-section-note de-mb-3'>*No available team of this profile for the game of this
                      tournament. Please <Link href={`/my-teams`}><a>create a team</a></Link>.</div>}

                  {teamSelected && (
                    <div className='de-tournament-config'>
                      <div className='tournament-config-logo'>
                        <img src={teamSelected.logo} alt={teamSelected.name}/>
                      </div>
                      <div className='tournament-config-info'>
                        <SelectTeam teams={teams} teamSelected={teamSelected} onSelected={onSelectedTeam}/>
                        <div className='tournament-config-name'>{teamSelected.name}</div>
                        <div className='tournament-config-description'>Rosters: 2/3 Players</div>

                        <SelectMember
                          members={teamMembers}
                          selectedIndices={getSelectedMembersIndex()}
                          captain={teamSelected.captain}
                          onSelected={onSelectedMembers}
                          teamName={teamSelected.name}
                        />

                        {Array.isArray(membersSelected) && membersSelected.map(member => (
                          <div className={clsx('de-user-card', {
                            'checked': member._id._id === teamSelected.captain,
                          })} key={member._id._id}>
                            <div className='de-user-card-avatar'>
                              <img src={member._id.avatar || '/assets/images/users/user-1.png'} alt={member._id.name}/>
                            </div>
                            <div className='de-user-card-info'>
                              <div className='de-user-card-username d-flex align-items-center flex-wrap de-mb-1'>
                                <span>{member.selected ? member.selected.profile_name : (member.profileInfo[0]?.profile_name || 'N/A')}</span>
                                {member._id._id === teamSelected.captain &&
                                  <span className='de-tag gradient-solid de-mb-0 de-ms-1 de-tag-user'>Captain</span>}
                                {/* TODO check online */}
                                <svg className='de-ms-1' width='8' height='9' viewBox='0 0 8 9' fill='none'
                                  xmlns='http://www.w3.org/2000/svg'>
                                  <circle cx='4' cy='4.5' r='4' fill='#609A5B'/>
                                </svg>
                              </div>
                              <div className='de-user-card-title'>{member._id.name}</div>
                            </div>
                          </div>
                        ))}

                        <div><ErrorMessage name='members'/></div>
                      </div>
                    </div>
                  )}
                </div>

                <div><ErrorMessage name='team_master'/></div>

                <div className='de-card-header de-mb-3'>
                  <div className='de-card-title'>{profileSelected?.profile_name}</div>
                </div>
                <div className='de-card-body'>
                  <div className='de-section-title'>Contact Information</div>
                  <div className='de-section-description de-mb-3'>Contact information will be used by tournament
                    organizers for tournament-related issues.
                  </div>
                  <div className='de-ps-lg-12'>
                    <div className='de-form-group form-group'>
                      <div className='de-form-control-with-icon'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M12 14.3999C11.0617 14.4019 10.1439 14.1253 9.36286 13.6052C8.58184 13.0852 7.97276 12.345 7.61276 11.4785C7.25276 10.6119 7.15805 9.65805 7.34062 8.73765C7.5232 7.81725 7.97484 6.97174 8.63835 6.30824C9.30185 5.64474 10.1474 5.19309 11.0678 5.01052C11.9882 4.82794 12.942 4.92265 13.8086 5.28265C14.6751 5.64265 15.4153 6.25173 15.9354 7.03275C16.4554 7.81377 16.732 8.73158 16.73 9.66991C16.73 10.9244 16.2317 12.1275 15.3446 13.0145C14.4576 13.9016 13.2545 14.3999 12 14.3999ZM12 6.39991C11.3588 6.39793 10.7314 6.58627 10.1973 6.94108C9.66313 7.29589 9.24629 7.80122 8.99953 8.39307C8.75277 8.98493 8.68718 9.6367 8.81106 10.2659C8.93495 10.895 9.24274 11.4733 9.69546 11.9274C10.1482 12.3815 10.7255 12.6911 11.3542 12.8169C11.983 12.9427 12.635 12.8792 13.2276 12.6342C13.8202 12.3893 14.3268 11.974 14.6833 11.441C15.0397 10.908 15.23 10.2812 15.23 9.63991C15.2221 8.78755 14.8787 7.97263 14.2741 7.37177C13.6695 6.77091 12.8524 6.43251 12 6.42991V6.39991Z'
                            fill='currentColor'/>
                          <path
                            d='M19 19.2799C18.832 19.2794 18.6691 19.2216 18.5383 19.1162C18.4074 19.0108 18.3163 18.864 18.28 18.6999C17.9815 17.4722 17.2788 16.3806 16.2848 15.6007C15.2909 14.8208 14.0634 14.3978 12.8 14.3999H11.2C9.93828 14.4001 8.71317 14.824 7.72124 15.6038C6.72932 16.3836 6.02807 17.4739 5.73 18.6999C5.70636 18.7958 5.66408 18.8861 5.60555 18.9656C5.54703 19.0451 5.47341 19.1123 5.38891 19.1634C5.30441 19.2145 5.21068 19.2484 5.11306 19.2632C5.01545 19.2781 4.91587 19.2736 4.82 19.2499C4.72414 19.2263 4.63387 19.184 4.55435 19.1255C4.47482 19.0669 4.40761 18.9933 4.35654 18.9088C4.30546 18.8243 4.27154 18.7306 4.25669 18.633C4.24184 18.5354 4.24636 18.4358 4.27 18.3399C4.64867 16.7879 5.53761 15.408 6.79426 14.4215C8.0509 13.435 9.60243 12.8992 11.2 12.8999H12.79C14.3898 12.8962 15.9442 13.4322 17.2017 14.4211C18.4592 15.4101 19.3465 16.7943 19.72 18.3499C19.7655 18.5434 19.7334 18.747 19.6306 18.9171C19.5278 19.0872 19.3625 19.2103 19.17 19.2599L19 19.2799Z'
                            fill='currentColor'/>
                          <path
                            d='M12 22.3099C9.96088 22.3099 7.96755 21.7053 6.27208 20.5724C4.57661 19.4395 3.25515 17.8293 2.47481 15.9454C1.69447 14.0615 1.4903 11.9885 1.88811 9.98856C2.28592 7.98862 3.26786 6.15155 4.70974 4.70968C6.15162 3.2678 7.98868 2.28586 9.98863 1.88805C11.9886 1.49024 14.0616 1.69441 15.9455 2.47475C17.8294 3.25509 19.4396 4.57655 20.5725 6.27202C21.7053 7.96749 22.31 9.96082 22.31 11.9999C22.3074 14.7335 21.2203 17.3544 19.2874 19.2873C17.3544 21.2202 14.7336 22.3073 12 22.3099ZM12 3.18995C10.2576 3.18995 8.55423 3.70664 7.10543 4.6747C5.65664 5.64275 4.52744 7.01869 3.86063 8.62851C3.19382 10.2383 3.01935 12.0097 3.35929 13.7187C3.69922 15.4277 4.5383 16.9975 5.7704 18.2296C7.0025 19.4617 8.57229 20.3007 10.2813 20.6407C11.9902 20.9806 13.7616 20.8061 15.3714 20.1393C16.9813 19.4725 18.3572 18.3433 19.3253 16.8945C20.2933 15.4457 20.81 13.7424 20.81 11.9999C20.8074 9.6642 19.8783 7.42488 18.2267 5.77326C16.5751 4.12164 14.3358 3.19259 12 3.18995Z'
                            fill='currentColor'/>
                        </svg>
                        <Input name='name_contact' placeholder='Name'/>
                        {/* <input className='de-form-control form-control' type='text' name='name_contact' placeholder='Username' /> */}
                      </div>
                      <div><ErrorMessage name='name_contact'/></div>
                    </div>
                    <div className='de-form-group form-group de-mb-0'>
                      <div className='de-form-control-with-icon'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M18 19.75H6C5.00544 19.75 4.05161 19.3549 3.34835 18.6517C2.64509 17.9484 2.25 16.9946 2.25 16V8C2.25 7.00544 2.64509 6.05161 3.34835 5.34835C4.05161 4.64509 5.00544 4.25 6 4.25H18C18.9946 4.25 19.9484 4.64509 20.6517 5.34835C21.3549 6.05161 21.75 7.00544 21.75 8V16C21.75 16.9946 21.3549 17.9484 20.6517 18.6517C19.9484 19.3549 18.9946 19.75 18 19.75ZM6 5.75C5.40326 5.75 4.83097 5.98705 4.40901 6.40901C3.98705 6.83097 3.75 7.40326 3.75 8V16C3.75 16.5967 3.98705 17.169 4.40901 17.591C4.83097 18.0129 5.40326 18.25 6 18.25H18C18.5967 18.25 19.169 18.0129 19.591 17.591C20.0129 17.169 20.25 16.5967 20.25 16V8C20.25 7.40326 20.0129 6.83097 19.591 6.40901C19.169 5.98705 18.5967 5.75 18 5.75H6Z'
                            fill='currentColor'/>
                          <path
                            d='M12 14.8298C11.9207 14.8442 11.8393 14.8442 11.76 14.8298L2.76 11.7498C2.57868 11.6808 2.43115 11.5442 2.34841 11.3687C2.26567 11.1932 2.25416 10.9925 2.31629 10.8087C2.37842 10.6249 2.50936 10.4723 2.6816 10.383C2.85384 10.2937 3.05399 10.2746 3.24 10.3298L12.01 13.3298L20.77 10.4898C20.9596 10.4302 21.1651 10.4484 21.3414 10.5403C21.5177 10.6321 21.6502 10.7902 21.71 10.9798C21.7411 11.073 21.7533 11.1714 21.7459 11.2694C21.7385 11.3674 21.7117 11.4629 21.667 11.5504C21.6224 11.6379 21.5607 11.7156 21.4857 11.779C21.4106 11.8425 21.3237 11.8903 21.23 11.9198L12.23 14.8398C12.1532 14.8469 12.0759 14.8435 12 14.8298Z'
                            fill='currentColor'/>
                        </svg>
                        <Input name='email_contact' placeholder='Email'/>
                        {/* <input className='de-form-control form-control' type='text' name='email_contact' placeholder='Email' /> */}
                      </div>
                      <div><ErrorMessage name='email_contact'/></div>
                    </div>
                  </div>
                </div>
              </div>

              <button type='submit' className='de-btn de-btn-primary w-100'>
                <span>register</span>
                <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M3.75 9.75004H12.1275L8.4675 13.41C8.175 13.7025 8.175 14.1825 8.4675 14.475C8.76 14.7675 9.2325 14.7675 9.525 14.475L14.4675 9.53254C14.76 9.24004 14.76 8.76754 14.4675 8.47504L9.5325 3.52504C9.24 3.23254 8.7675 3.23254 8.475 3.52504C8.1825 3.81754 8.1825 4.29004 8.475 4.58254L12.1275 8.25004H3.75C3.3375 8.25004 3 8.58754 3 9.00004C3 9.41254 3.3375 9.75004 3.75 9.75004Z'
                    fill='currentColor'/>
                </svg>
              </button>
            </Col>
            <Col lg='3'>
              <TournamentSmallCard
                onSelect={() => {
                }}
                // selected={selectedIndex === 0}
                tournament={{
                  name: tournamentCtx.detail.name,
                  startDate: tournamentCtx.detail.operating.start_time ? dayjs(tournamentCtx.detail.operating.start_time).format('MM/DD/YYYY HH:mm:ss') : '',
                  gameName: tournamentCtx.detail.game.name,
                  mediaLink: '#',
                  avatar: tournamentCtx.detail.avatar,
                }}
              />

              {/* TODO handle later */}
              {/* <TournamentSmallCard onSelect={() => setSelectedIndex(0)} selected={selectedIndex === 0} />
              <TournamentSmallCard onSelect={() => setSelectedIndex(1)} selected={selectedIndex === 1} />
              <TournamentSmallCard onSelect={() => setSelectedIndex(2)} selected={selectedIndex === 2} />
              <TournamentSmallCard onSelect={() => setSelectedIndex(3)} selected={selectedIndex === 3} /> */}
            </Col>
          </Row>
        </div>
      </div>
    </FormWrapper>
  )
}
