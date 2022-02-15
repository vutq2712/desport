import React, { useCallback, useEffect, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { MemberSelectCard } from '../member-select-card';
import { MembersSelected } from '@app/modules/tournament/components/register-tab';

interface SelectMemberProps {
  members: MembersSelected[];
  captain: string;
  selectedIndices: Array<number>;
  teamName: string;
  onSelected: (members: MembersSelected[]) => void;
}

function SelectMemberModal(props: any) {
  const { modalRef, data } = props;
  const [selectedIndices, setSelectedIndices] = useState<number[]>([...data.selectedIndices]);
  const [members, changeMembers] = useState<MembersSelected[]>(data?.members || []);
  const [membersDisplay, changeMembersDisplay] = useState<MembersSelected[]>(data?.members || []);
  const handleSelectedChange = (e, index) => {
    // const exists = selectedIndices.findIndex((i) => i === index);
    let newSelectedIndexs = Object.assign([], selectedIndices);
    if (e) {
      newSelectedIndexs.push(index);
    } else {
      newSelectedIndexs.length <= 1 ? newSelectedIndexs = [] : newSelectedIndexs.splice(index, 1);
    }
    setSelectedIndices(newSelectedIndexs);
  }

  const onSelectedProfile = useCallback((index) => (profile: {
    _id: string,
    profile_name: string,
  }) => {
    const newMembers = [...members]
    newMembers[index]['selected'] = profile;

    changeMembers(newMembers);
  }, [members])

  const onSubmit = () => {
    modalRef.close(members.filter((_, index) => selectedIndices.indexOf(index) > -1));
  }

  useEffect(() => {
    changeMembersDisplay(data?.members || []);
  }, [data])

  const onFilter = (e) => {
    if (!data || !members?.length || !e.target) return;

    const newMembers = members.filter(item => {
      return (item._id.name as string).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
      item.profileInfo.findIndex(profile => (profile.profile_name as string).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) > -1;
    });

    changeMembersDisplay(newMembers);
  }

  return (
    <div className='modal-body de-p-3'>
      <div className='modal-sub-title de-mb-1'>Team Members</div>
      <div className='modal-title modal-title-2 de-mb-3' id='exampleModalLabel'>{data?.teamName}</div>
      <div className='modal-inner'>
        <div className='d-flex align-items-center de-mb-3'>
          <div className='de-form-group form-group w-100 de-mb-0 de-me-3'>
            <div className='de-form-control-with-icon'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M9.75 17.27C8.26664 17.27 6.8166 16.8302 5.58323 16.006C4.34986 15.1819 3.38856 14.0106 2.82091 12.6401C2.25325 11.2697 2.10472 9.7617 2.39411 8.30685C2.6835 6.85199 3.39781 5.51562 4.4467 4.46672C5.4956 3.41783 6.83197 2.70352 8.28683 2.41413C9.74168 2.12474 11.2497 2.27327 12.6201 2.84093C13.9906 3.40858 15.1619 4.36988 15.986 5.60325C16.8101 6.83661 17.25 8.28666 17.25 9.77002C17.25 11.7591 16.4598 13.6668 15.0533 15.0733C13.6468 16.4798 11.7391 17.27 9.75 17.27ZM9.75 3.77002C8.56332 3.77002 7.40328 4.12192 6.41658 4.78121C5.42989 5.44049 4.66085 6.37757 4.20673 7.47392C3.7526 8.57028 3.63378 9.77668 3.86529 10.9406C4.0968 12.1045 4.66825 13.1735 5.50736 14.0127C6.34648 14.8518 7.41558 15.4232 8.57946 15.6547C9.74335 15.8862 10.9497 15.7674 12.0461 15.3133C13.1425 14.8592 14.0795 14.0901 14.7388 13.1034C15.3981 12.1167 15.75 10.9567 15.75 9.77002C15.75 8.17872 15.1179 6.6526 13.9926 5.52738C12.8674 4.40216 11.3413 3.77002 9.75 3.77002Z' fill='currentColor' />
                <path d='M21 21.7699C20.9015 21.7704 20.8039 21.7512 20.7128 21.7134C20.6218 21.6756 20.5393 21.6201 20.47 21.5499L14 15.0699C13.9258 15.0019 13.8661 14.9197 13.8244 14.8281C13.7826 14.7366 13.7598 14.6375 13.7571 14.5369C13.7544 14.4363 13.7721 14.3362 13.8089 14.2425C13.8457 14.1489 13.901 14.0636 13.9715 13.9918C14.042 13.92 14.1262 13.863 14.2192 13.8244C14.3121 13.7858 14.4119 13.7663 14.5125 13.7671C14.6131 13.7679 14.7126 13.7889 14.8049 13.8289C14.8973 13.8689 14.9806 13.9271 15.05 13.9999L21.53 20.4799C21.6705 20.6206 21.7494 20.8112 21.7494 21.0099C21.7494 21.2087 21.6705 21.3993 21.53 21.5399C21.4616 21.6119 21.3795 21.6693 21.2884 21.7088C21.1974 21.7483 21.0993 21.7691 21 21.7699Z' fill='currentColor' />
              </svg>
              <input className='de-form-control form-control' type='text' onChange={onFilter} placeholder='Search member' />
            </div>
          </div>
          <button type='button' onClick={() => setSelectedIndices([])} className='de-btn de-btn-link'>
            <span>Remove All</span>
          </button>
        </div>
        <div className='de-members'>
          {!!membersDisplay?.length && membersDisplay.map((member, index) => (
            <MemberSelectCard
              key={member._id._id}
              logo={member._id.avatar || '/assets/images/avatar-2.png'}
              name={member.selected ? member.selected.profile_name : (member.profileInfo[0]?.profile_name || 'N/A')}
              selected={selectedIndices.indexOf(index) > -1}
              onSelect={(e) => handleSelectedChange(e, index)}
              online // TODO check online
              captain={member._id._id === data.captain}
              label={member._id._id === data.captain ? 'Rosters: 2/3 Player Selected' : null} // TODO check
              member={member}
              onSelectedProfile={onSelectedProfile(index)}
            />
          ))}
        </div>
      </div>
      <div className='modal-actions'>
        <a onClick={modalRef.close} className='de-btn'>
          <span>cancel</span>
        </a>
        <button type='button' disabled={selectedIndices?.length <= 0} className='de-btn de-btn-primary w-100' onClick={onSubmit}>
          <span>Confirm</span>
        </button>
      </div>
    </div>
  )
}

export function SelectMember({ members, captain, selectedIndices, teamName, onSelected }: SelectMemberProps) {
  const openSelectMember = useCallback(() => {
    if (!members) return;

    const modal = openModal(SelectMemberModal, { dialogClassName: 'de-modal-lg', data: { members, captain, selectedIndices, teamName } });

    modal.afterClosed().subscribe(data => {
      onSelected(data);
    })
  }, [members, captain, selectedIndices, teamName, onSelected]);

  return (
    <button className='de-btn de-btn-select' type='button' onClick={openSelectMember}>
      <span>Select Player</span>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M8.12 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.7 10.7001C6.31 10.3101 6.31 9.68006 6.7 9.29006C7.09 8.91006 7.73 8.90006 8.12 9.29006Z' fill='currentColor' />
      </svg>
    </button>
  )
}
