import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';
import { MailSubscribe } from '@app/types/user.type';

interface CreateTeamParams {
    game: string;
    name: string;
    tag: string;
    country: string;
    logo: File;
    banner:File;
}

export interface CreateTeamData {
    _id: string;
    game: string;
    name: string;
    tag: string;
    country: string;
    logo: string;
    banner: string;
    captain: string;
}

export function createTeam(params: CreateTeamParams) {
  const formData = new FormData();
  formData.append('name', params.name);
  formData.append('tag', params.tag);
  formData.append('country', params.country);
  formData.append('game', params.game);
  formData.append('logo', params.logo);
  formData.append('banner', params.banner);

  return Http.request<CreateTeamData>({
    url: `${API_END_POINT}/team/create`,
    method: 'POST',
    body: formData,
    headers: {}
  });
}




