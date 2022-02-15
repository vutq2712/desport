import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { uploadAvatar } from "@app/api/tournament/sponsor/upload-avatar";
import { updateInfo } from "@app/api/tournament/sponsor/update-info";
import { getSponsors } from "@app/api/tournament/sponsor/get-sponsors";

export function SponsorTab() {
  const [file, changeFile] = useState<File>();
  const [avatar, changeAvatar] = useState<string>('');
  const [displayName, changeDisplayName] = useState<string>('');
  const [info, changeInfo] = useState<string>('');
  const router = useRouter();
  const fileRef = useRef<any>();

  useEffect(() => {
    getSponsors(router.query.tournamentId as string).subscribe(res => {
      console.log('res.data;', res.data)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onUpload = () => {
    uploadAvatar({
      idTour: router.query.tournamentId as string,
      file: file as File,
      fileName: 'Avatar',
    }).subscribe(res => {
      (fileRef.current as HTMLInputElement).value = '';
      changeAvatar(res.data)
    }, (error) => {
      alert(error?.response?.msg || 'Error');
    })
  }

  const onSave = () => {
    updateInfo({
      _id: 'S-123456', // TODO: get _id of sponsor
      info,
      avatar,
      display_name: displayName,
    }).subscribe(res => {
      console.log('res', res)
    }, (error) => {
      alert(error?.response?.msg || 'Error');
    })
  }

  const onChangeFile = (e) => {
    if (!e.target || !e.target.files) return;

    changeFile(e.target.files[0]);
  }

  const onChangeInfo = (e) => {
    if (!e.target) return;

    changeInfo(e.target.value);
  }

  const onChangeDisplayName = (e) => {
    if (!e.target) return;

    changeDisplayName(e.target.value);
  }

  return (
    <div>
      <div>Sponsor</div>
      <div className='avatar'>
        <div>Avatar</div>
        <div className='image'>
          {avatar && avatar.startsWith('http') && <Image src={avatar} width={100} height={100} />}
          <input type='file' onChange={onChangeFile} ref={fileRef} className='' accept='image/*' />

          <button type='button' className='btn btn-primary mt-2' disabled={!file} onClick={onUpload}>Upload</button>
        </div>
      </div>

      <div className='rule mt-2'>
        Display name
        <input type='text' name='' onChange={onChangeDisplayName} className='form-control' />
      </div>

      <div className='rule mt-2'>
        Info
        <textarea cols={30} onChange={onChangeInfo} className='form-control' rows={4} value={info} />
      </div>

      <div className='action mt-2'>
        <button type='button' className='btn btn-primary mt-2' disabled={!avatar} onClick={onSave}>Save</button>
      </div>
    </div>
  )
}
