import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface UploadFileRequest{
  file: File,
  title: string,
  path: string,
  fileName: string,
}

export interface UpdateLogo{
  team_id: string,
  logo: string,
}
export interface UpdateBanner{
  team_id: string,
  banner: string,
}

export function uploadTeamLogoOrBanner(params: UploadFileRequest) {
  const formData = new FormData();

  formData.append('file', params.file);
  formData.append('fileName', params.fileName);
  formData.append('path', params.path);
  formData.append('title', params.title);

  return Http.request<string>({
    url: `${API_END_POINT}/team/upload-s3`,
    method: 'POST',
    body: formData,
    headers: {}
  });
}

export function changeLogoApi(params: UpdateLogo) {
  return Http.request({
    url: `${API_END_POINT}/team/changelogo`,
    method: 'PUT',
    body: params,
  });
}

export function changeBannerApi(params: UpdateBanner) {
  return Http.request({
    url: `${API_END_POINT}/team/changebanner`,
    method: 'PUT',
    body: params,
  });
}
