import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface UploadAvatarRequest {
  _id: string,
  file: File,
  fileName: string,
}


export function uploadAvatar(params: UploadAvatarRequest) {
  const formData = new FormData();

  formData.append('_id', params._id);
  formData.append('file', params.file);
  formData.append('file_name', params.fileName);

  return Http.request({
    url: `${API_END_POINT}/tournament/upload-avatar`,
    method: 'POST',
    body: formData,
    headers: {}
  });
}
