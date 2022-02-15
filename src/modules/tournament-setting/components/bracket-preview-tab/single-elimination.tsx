import Link from "next/link";
import { SimpleNotice } from '@app/dekits/components/simple-notice';
import { RenderSeedProps, RoundProps, Seed, SeedItem, SeedTeam, Bracket } from 'react-brackets';

export function BracketSingleElimination({ bracketSeedingHref, editBracketHref }) {
  const rounds: RoundProps[] = [
    {
      title: "Round 1 - Best of 1",
      seeds: [
        {
          id: 1,
          teams: [{ name: "TBD", }, { name: "TBD" }]
        },
        {
          id: 2,
          teams: [{ name: "TBD", }, { name: "TBD" }]
        },
        {
          id: 3,
          teams: [{ name: "TBD", }, { name: "TBD" }]
        },
        {
          id: 4,
          teams: [{ name: "TBD", }, { name: "TBD" }]
        }
      ]
    },
    {
      title: "Round 2 - Best of 1",
      seeds: [
        {
          id: 6,
          teams: [{ name: "TBD" }, { name: "TBD" }]
        },
        {
          id: 5,
          teams: [{ name: "TBD" }, { name: "TBD" }]
        }
      ]
    },
    {
      title: "Round 3 - Best of 3",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "TBD" }, { name: "TBD" }]
        }
      ]
    }
  ];
  const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: RenderSeedProps) => {
    return (
      <Seed className='de-seed' mobileBreakpoint={breakpoint}>
        <SeedItem className='de-seed-item'>
          <SeedTeam className='de-seed-team'>
            <div className='de-seed-team-name'>{seed.teams[0]?.name || 'NO TEAM '}</div>
          </SeedTeam>
          <SeedTeam className='de-seed-team'>
            <div className='de-seed-team-name'>{seed.teams[1]?.name || 'NO TEAM '}</div>
          </SeedTeam>
        </SeedItem>
      </Seed>
    );
  };
  return (
    <>
      <div className='de-ts-bracket-preview-header'>
        <h4>Single Elimination</h4>
        <div>
          <Link href={bracketSeedingHref}>
            <button type='submit' className='de-btn de-btn-outline-primary de-me-1'>Seeding</button>
          </Link>

          <Link href={editBracketHref}>
            <button type='submit' className='de-btn de-btn-outline-primary'>Edit setting</button>
          </Link>
        </div>
      </div>
      <SimpleNotice message='The bracket has not been seeded yet. Please check participants and seed the bracket.' />


      <div className='de-card'>
        <Bracket
          roundClassName='de-bracket-round'
          rounds={rounds}
          mobileBreakpoint={992}
          renderSeedComponent={CustomSeed}
          roundTitleComponent={(title: React.ReactNode) => {
            return <div className='de-bracket-round-title'>{title}</div>;
          }}
        />
      </div>
    </>
  )
}
