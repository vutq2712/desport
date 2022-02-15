import {MyProfile} from "@app/api/user/my-profile";
import {openModal} from "@app/dekits/modal";
import {DragDropFile} from "@app/dekits/d2d-file";
import {uploadAvatar} from "@app/api/user/upload-avatar";
import {useEffect, useState} from "react";
import {map} from 'rxjs/operators';

const defaultAvatar = '/assets/images/users/avatar.png';

interface AvatarSettingProps {
  myProfile: MyProfile
}

export function AvatarSetting({
  myProfile,
}: AvatarSettingProps) {
  const [avatar, setAvatar] = useState<string>(defaultAvatar);

  const changeAvatarOnClick = () => {
    const handleUpdateAvatar = (files: File[]) => {
      return uploadAvatar({
        file: files[0],
        path: 'avatar',
        fileName: 'avatar',
      }).pipe(map((res) => {
        window.alert("Upload avatar success");
        console.log({avatar: res.data});
        // Append timestamp to avoid browser cache
        setAvatar(res.data + '?t=' + new Date().getTime());
      }, (error) => {
        console.log({error});
      }));
    }

    openModal(DragDropFile, {
      dialogClassName: 'de-modal-md',
      closeButton: true,
      data: {onSaveFile: handleUpdateAvatar},
    });
  };

  useEffect(() => {
    // Append timestamp to avoid browser cache
    setAvatar(myProfile.avatar! + '?t=' + new Date().getTime());
  }, [myProfile.avatar])

  return (
    <div className='de-profile-avatar'>
      <div className='de-profile-avatar-preview'>
        <img src={avatar} alt='Avatar'/>
      </div>
      <button onClick={changeAvatarOnClick} type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>Change avatar</button>
    </div>
  )
}
