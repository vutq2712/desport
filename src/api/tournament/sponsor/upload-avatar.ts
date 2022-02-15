import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface UploadAvatarRequest {
  file: File,
  fileName: string,
  idTour: string,
}


export function uploadAvatar(params: UploadAvatarRequest) {
  const formData = new FormData();

  formData.append('file', params.file);
  formData.append('file_name', params.fileName);
  formData.append('id_tour', params.idTour);

  return Http.request({
    url: `${API_END_POINT}/tournament/sponsor/upload-avatar`,
    method: 'POST',
    body: formData,
    headers: {}
  });
}
