
const dummyAvatarStyle = { width: 120, height: 120, display: 'inline-block', border: '1px solid #8B5CE4' }
import { FormWrapper, Select, Input, Radio, SelectOptions } from '@app/dekits/form'
import { ModalProps } from '@app/dekits/modal';
import { useCallback, useMemo } from 'react';
import { BracketStatus } from '@app/types/bracket.type';
import { Match } from '@app/dekits/bracket';
import { useSubscription } from '@app/hooks/subscription';
import { updateScore } from '@app/api/single-elimination/update-score';
import { searchTeamInRound } from '@app/api/single-elimination/search-team-in-round';
import { map } from 'rxjs';
import { MatchCustomData } from '@app/services/bracket';

interface ModalData {
  match: Match<MatchCustomData>;
  bracketStatus: BracketStatus;
}

interface ReportScoreFormValues {
  /** UUID. */
  winner: string | null;
  team1Scores: number[];
  team2Scores: number[];
}

export function ReportScoreModal(props: ModalProps<ModalData>) {
  const { modalRef, data } = props;
  const bracketStatus = data?.bracketStatus;
  const { match, round } = data!.match.customData;
  const scores = match.scores;
  const subscription = useSubscription();
  const initialValues = useMemo<ReportScoreFormValues>(() => ({
    team1Scores: scores.map(score => score.team1),
    team2Scores: scores.map(score => score.team2),
    winner: match.winner?.uuid || null,
  }), [scores]);

  const handleSubmit = useCallback((values: ReportScoreFormValues) => {
    const updateScoreSub = updateScore({
      match: match.uuid,
      scores: values.team2Scores.map((_, idx) => ({ team1: values.team1Scores[idx], team2: values.team2Scores[idx] })),
      winner: values.winner,
    }).subscribe(() => {
      modalRef.close();
    });

    subscription.add(updateScoreSub);
  }, []);

  const fetchTeamOptions = useCallback((keyword: string) => {
    return searchTeamInRound({
      round: round.uuid,
      key_search: keyword,
    }).pipe<SelectOptions>(map(res => {
      return res.data.map(bracket => ({
        label: bracket.name,
        value: bracket.uuid
      }));
    }));
  }, [round])

  // const shouldDisableChangeTeam = bracketStatus !== BracketStatus.STANDBY;

  return (
    <FormWrapper initialValues={initialValues} onSubmit={handleSubmit}>
      <div className='modal-body'>
        <div className='modal-title de-mb-4'>Resport score {bracketStatus}</div>

        <div className='modal-innerx pb-5'>
          <div className='row'>
            <div className='col-3 text-center'>
              <div>Win: <Radio name='winner' value={match.team1?.uuid as string} /></div>
              <div className='pb-3' style={dummyAvatarStyle}></div>
              <div className='text-center pb-2 pt-2'>{match.team1?.tag}</div>
              <div style={{ width: '120px', display: 'inline-block' }}>
                <Select fetchOption={fetchTeamOptions} name='team1New' placeholder='Change team' hasSearch />
              </div>
            </div>

            <div className='col-6 pt-4'>
              {scores.map((_, idx) => (
                <div key={idx} className='d-flex justify-content-center pb-3'>
                  <Input type='number' min={0} name={`team1Scores.${idx}`} />
                  <div className='d-flex justify-content-center align-items-center w-100'>Game {idx + 1}</div>
                  <Input type='number' min={0} name={`team2Scores.${idx}`} />
                </div>
              ))}
            </div>

            <div className='col-3 text-center'>
              <div>Win: <Radio name='winner' value={match.team2?.uuid as string} /></div>
              <div className='pb-3' style={dummyAvatarStyle}></div>
              <div className='text-center pb-2 pt-2'>{match.team2?.tag}</div>
              <div style={{ width: '120px', display: 'inline-block' }}>
                <Select fetchOption={fetchTeamOptions} name='team2New' placeholder='Change team' hasSearch />
              </div>
            </div>
          </div>
        </div>

        <div className='modal-actions d-flex justify-content-center'>
          <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
          <button type='submit' className='de-btn de-btn-outline-primary'>save</button>
        </div>
      </div>
    </FormWrapper>
  )
}
