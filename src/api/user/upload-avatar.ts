import {API_END_POINT} from '@app/const/common.const';
import {Http} from '@app/services/http';

export interface UploadFileRequest {
  file: File,
  path: string,
  fileName: string,
}

export function uploadAvatar(params: UploadFileRequest) {
  const formData = new FormData();

  formData.append('file', params.file);
  formData.append('fileName', params.fileName);
  formData.append('path', params.path);

  return Http.request<string>({
    url: `${API_END_POINT}/user/upload-avatar`,
    method: 'POST',
    body: formData,
    headers: {}
  });
}


