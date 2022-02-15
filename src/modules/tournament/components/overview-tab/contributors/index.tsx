import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TopContributorData, getTopContributor } from "@app/api/tournament/overview/get-top-contributor";
import { ContributorCard } from "@app/dekits/components/contributor-card";
import { useSubscription } from "@app/hooks/subscription";
import { TournamentTabKeys } from "@app/modules/tournament/services/sidebar";

const mapType = ['silver', 'gold', 'bronze']

export function TournamentContributors() {
  const [contributors, changeContributors] = useState<TopContributorData[]>([]);
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const sub = getTopContributor(router.query.tournamentId as string).subscribe({
      next: res => {
        changeContributors(res.data);
      },
      error: error => alert(error?.response?.msg || 'Error'),
    })

    subscription.add(sub);
  }, [])



  return (
    <div className='tournament-contributors'>
      <div className='tournament-section-title'>Top contributors</div>
      <div className='d-flex align-items-end justify-content-center de-mb-5'>
        {!!contributors.length ?
          contributors.slice(0, 3).map((contributor, index) => (
            <ContributorCard
              key={index} avatar={contributor.user_info.avatar || '/assets/images/avatar.png'}
              type={mapType[index]}
              className={index === 1 ? 'de-mb-5' : ''}
            />
          )) :
          <></>
        }
      </div>
      <div className='text-center'>
        <button
          type='button'
          className='de-btn de-btn-sm de-btn-outline-secondary'
          onClick={() => router.push(`/tournament/${router.query.tournamentId}?tab=${TournamentTabKeys.CONTRIBUTE}`)}
        >
          <span>View all contributors</span>
        </button>
      </div>
    </div>
  )
}
