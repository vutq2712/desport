import { TeamMediumCard } from "@app/dekits/components/team-medium-card";

export function MyTeams() {
  return (
    <div className='de-card de-card-my-team full-h'>
      <div className='de-card-header'>
        <div className='de-card-title'>My Teams</div>
        <a href='#' className='de-btn de-btn-sm de-btn-secondary'>View all</a>
      </div>
      <div className='de-card-body'>
        <div className='de-my-teams'>
          <TeamMediumCard />
          <TeamMediumCard />
        </div>
      </div>
    </div>
  )
}
