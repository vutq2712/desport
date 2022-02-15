import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { uploadAvatar } from "@app/api/tournament/info-detail/upload-avatar";
import { updateInfo } from "@app/api/tournament/info-detail/update-info";
import { getSetting } from "@app/api/tournament/get-setting";
import { Col, Row } from "react-bootstrap";

export function InfoDetailTab() {
  const [file, changeFile] = useState<File>();
  const [avatar, changeAvatar] = useState<string>('');
  const [info, changeInfo] = useState<string>('');
  const [support, changeSupport] = useState<string>('');
  const router = useRouter();
  const fileRef = useRef<any>();

  useEffect(() => {
    getSetting(router.query.tournamentId as string).subscribe(res => {
      const settingDetail = res.data;

      if (settingDetail.avatar) changeAvatar(settingDetail.avatar);

      if (settingDetail.info) changeInfo(settingDetail.info);
      // if (settingDetail.support) changeSupport(settingDetail.support);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onUpload = () => {
    uploadAvatar({
      _id: router.query.tournamentId as string,
      file: file as File,
      fileName: 'Avatar',
    }).subscribe(res => {
      (fileRef.current as HTMLInputElement).value = '';
      changeAvatar(res.data)
    }, (error) => {
      alert(error?.response?.msg || 'Error');
    })
  }

  const onPreview = () => {
    // TODO
  }

  const onSave = () => {
    updateInfo({
      _id: router.query.tournamentId as string,
      info,
      // support,
      avatar,
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

  const onChangeSupport = (e) => {
    if (!e.target) return;

    changeSupport(e.target.value);
  }

  return (
    <div className='de-ts-info-detail'>
      <Row>
        <Col xl='2' lg='3'>
          <div className='text-center'>
            <div className='de-mb-3'>
              <div className='de-ts-image-wrap'>
                <div className='de-ts-image'>
                  {
                    (avatar && avatar.startsWith('http')) ?
                      <Image src={avatar} /> :
                      <img onClick={() => (fileRef.current as HTMLInputElement).click()} src='/assets/images/image-placeholder.png' alt='' />
                  }
                </div>
              </div>
              <input type='file' onChange={onChangeFile} ref={fileRef} className='d-none' accept='image/*' />
            </div>
            <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary' disabled={!file} onClick={onUpload}>
              Upload avatar
            </button>
          </div>
        </Col>
        <Col xl='10' lg='9'>
          <div className='de-card de-mb-3'>
            <div className='de-card-header de-mb-3'>
              <div className='de-card-title text-uppercase'>Overview</div>
            </div>
            <div className='de-card-body'>
              <div className='de-mb-3'>
                <textarea onChange={onChangeInfo} className='de-form-control form-control' value={info} style={{ minHeight: 140 }} />
              </div>
              <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary de-me-1' disabled={!file} onClick={onPreview}>Preview</button>&nbsp;
              <button type='button' className='de-btn de-btn-sm de-btn-secondary' disabled={!avatar} onClick={onSave}>Save</button>
            </div>
          </div>

          <div className='de-card'>
            <div className='de-card-header de-mb-3'>
              <div className='de-card-title text-uppercase'>support</div>
            </div>
            <div className='de-card-body'>
              <div className='de-mb-3'>
                <textarea onChange={onChangeSupport} className='de-form-control form-control' value={support} style={{ minHeight: 140 }} />
              </div>
              <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary de-me-1' disabled={!file} onClick={onPreview}>Preview</button>&nbsp;
              <button type='button' className='de-btn de-btn-sm de-btn-secondary' disabled={!avatar} onClick={onSave}>Save</button>
            </div>
          </div>
        </Col>
      </Row>




    </div>
  )
}
