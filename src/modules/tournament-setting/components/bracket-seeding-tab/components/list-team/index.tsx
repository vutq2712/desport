import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { addSeedTeamToBracket } from '@app/api/bracket/add-seed-team';
import { applyTeamToBracket } from '@app/api/bracket/apply-team-to-bracket';
import { removeSeedTeamFromBracket } from '@app/api/bracket/remove-seed-team-from-bracket';
import { TeamInBracket } from '@app/api/bracket/search-team-in-bracket';
import { removeTeamFromBracket } from '@app/api/bracket/remove-team-from-bracket';
import { FormWrapper, Switch, FormikProps } from '@app/dekits/form';
import { useSubscription } from '@app/hooks/subscription';

interface ListTeamProps {
  listTeam: TeamInBracket[];
}

interface LisTeamFormValues {
  select: boolean[];
  seed: boolean[];
}

export function ListTeam(props: ListTeamProps) {
  const router = useRouter();
  const subscription = useSubscription();
  const formRef = useRef<FormikProps<LisTeamFormValues>>(null);

  const [displayTeams, setDisplayTeams] = useState<TeamInBracket[]>([]);
  useEffect(() => {
    const formik = formRef.current;
    const acceptedList = props.listTeam.map(team => team.accepted);
    const seedList = props.listTeam.map(team => team.isSeed);

    formik?.setFieldValue('select', acceptedList);
    formik?.setFieldValue('seed', seedList);
    setDisplayTeams(props.listTeam);
  }, [props.listTeam]);

  const handleSelectChange = useCallback((team: TeamInBracket, idx: number) => (selected) => {
    const bracketUUID = router.query.bracketUUID as string;
    const changeTeamInBracketApi = selected ? applyTeamToBracket : removeTeamFromBracket;
    const changeTeamInBracketSub = changeTeamInBracketApi({
      bracket: bracketUUID,
      team: team.uuid,
    }).subscribe({
      error: (res) => {
        // rollback
        const formik = formRef.current;
        const acceptedList = formik?.values['select'] || [];
        acceptedList[idx] = !selected;
        formik?.setFieldValue('select', acceptedList);

        window.alert(res.msg);
      }
    });

    subscription.add(changeTeamInBracketSub);
  }, []);

  const handleSeedChange = useCallback((team: TeamInBracket, idx: number) => (selected) => {
    const bracketUUID = router.query.bracketUUID as string;
    const changeSeedTeamInBracket = selected ? addSeedTeamToBracket : removeSeedTeamFromBracket;
    const changeSeedTeamInBracketSub = changeSeedTeamInBracket({
      bracket: bracketUUID,
      team: team.uuid,
    }).subscribe({
      error: (res) => {
        // rollback
        const formik = formRef.current;
        const seedList = formik?.values['seed'] || [];
        seedList[idx] = !selected;
        formik?.setFieldValue('seed', seedList);

        window.alert(res.msg);
      }
    });

    subscription.add(changeSeedTeamInBracketSub);
  }, []);

  return (
    <FormWrapper innerRef={formRef}>
      <table>
        <thead>
          <tr>
            <td width={200}>Team name</td>
            <td width={200}>Seed No</td>
            <td width={200}>Select</td>
            <td width={200}>Seed</td>
          </tr>
        </thead>

        <tbody>
          {displayTeams.map((team, idx) => (
            <tr key={idx}>
              <td>{team.name}</td>
              <td>{idx + 1}</td>
              <td><Switch onChange={handleSelectChange(team, idx)} name={`select[${idx}]`} /></td>
              <td><Switch onChange={handleSeedChange(team, idx)} name={`seed[${idx}]`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </FormWrapper>
  )
}
