import { DisputeResultModal } from '@app/dekits/components/dispute-result-modal';
import { openModal } from '@app/dekits/modal';
import { useCallback } from 'react';
import { Bracket, RenderSeedProps, RoundProps, Seed, SeedItem, SeedTeam } from 'react-brackets';
export function BracketInfo() {
  const rounds: RoundProps[] = [
    {
      title: "",
      seeds: [
        {
          id: 1,
          teams: [{ name: "Team Liquid", logo: "/assets/images/team-logo-2.png", scores: 0 }, { name: "Natus Vincere", logo: "/assets/images/team-logo-3.png", scores: 2, win: true }]
        },
        {
          id: 2,
          teams: [{ name: "Team Gambit", logo: "/assets/images/team-logo-2.png", scores: 2, win: true }, { name: "Heroic", logo: "/assets/images/team-logo-3.png", scores: 0 }]
        },
        {
          id: 3,
          teams: [{ name: "Virtus Pro", logo: "/assets/images/team-logo-2.png", scores: 1 }, { name: "Vitality", logo: "/assets/images/team-logo-3.png", scores: 2, win: true }]
        },
        {
          id: 4,
          teams: [{ name: "G2", logo: "/assets/images/team-logo-3.png", scores: 2, win: true }, { name: "Faze", logo: "/assets/images/team-logo-2.png", scores: 0 }]
        }
      ]
    },
    {
      title: "",
      seeds: [
        {
          id: 6,
          teams: [{ name: "Natus Vincere", logo: "/assets/images/team-logo-3.png", win: true }, { name: "Team Gambit", logo: "/assets/images/team-logo-2.png" }]
        },
        {
          id: 5,
          teams: [{ name: "Vitality", logo: "/assets/images/team-logo-3.png", win: true }, { name: "G2", logo: "/assets/images/team-logo-2.png" }]
        }
      ]
    },
    {
      title: "",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Natus Vincere", logo: "/assets/images/team-logo-3.png", win: true }, { name: "Vitality", logo: "/assets/images/team-logo-2.png" }]
        }
      ]
    }
  ];

  const lowerBracketRounds: RoundProps[] = [
    {
      title: "",
      seeds: [
        {
          id: 6,
          teams: [{ name: "Natus Vincere", logo: "/assets/images/team-logo-3.png", scores: 0 }, { name: "Team Gambit", logo: "/assets/images/team-logo-2.png", win: true, scores: 2 }]
        },
        {
          id: 5,
          teams: [{ name: "Vitality", logo: "/assets/images/team-logo-3.png", win: true, scores: 2 }, { name: "G2", logo: "/assets/images/team-logo-2.png", scores: 0 }]
        }
      ]
    },
    {
      title: "",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Natus Vincere", logo: "/assets/images/team-logo-3.png", win: true }, { name: "Vitality", logo: "/assets/images/team-logo-2.png" }]
        }
      ]
    }
  ];

  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: RenderSeedProps) => {
    const handleSeedClick = useCallback(() => {
      openModal(DisputeResultModal, { dialogClassName: 'de-modal-sm' });
    }, []);

    return (
      <Seed className='de-seed' mobileBreakpoint={breakpoint}>
        <SeedItem className='de-seed-item' onClick={handleSeedClick}>
          <SeedTeam className={`de-seed-team ${seed.teams[0]?.win ? 'win' : ''}`}>
            <div className='de-seed-team-logo'>
              <img src={seed.teams[0]?.logo || '/assets/images/team-logo-3.png'} alt={seed.teams[0]?.name || 'NO TEAM '} />
            </div>
            <div className='de-seed-team-name'>{seed.teams[0]?.name || 'NO TEAM '}</div>
            <div className='de-seed-team-scores'>{seed.teams[0]?.scores}</div>
          </SeedTeam>
          <SeedTeam className={`de-seed-team ${seed.teams[1]?.win ? 'win' : ''}`}>
            <div className='de-seed-team-logo'>
              <img src={seed.teams[1]?.logo || '/assets/images/team-logo-3.png'} alt={seed.teams[1]?.name || 'NO TEAM '} />
            </div>
            <div className='de-seed-team-name'>{seed.teams[1]?.name || 'NO TEAM '}</div>
            <div className='de-seed-team-scores'>{seed.teams[1]?.scores}</div>
          </SeedTeam>
        </SeedItem>
      </Seed>
    );
  };
  return (
    <div className='de-bracket-tab-content'>
      <div className='de-bracket-info'>
        <Bracket
          roundClassName='de-bracket-round'
          rounds={rounds}
          mobileBreakpoint={992}
          renderSeedComponent={CustomSeed}
        />

        <div className='de-bracket-low'>
          <h4>Lower Bracket</h4>
          <Bracket
            roundClassName='de-bracket-round'
            rounds={lowerBracketRounds}
            mobileBreakpoint={992}
            renderSeedComponent={CustomSeed}
          />
        </div>
      </div>
    </div>
  )
}
