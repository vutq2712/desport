import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TournamentTabKeys } from "@app/modules/tournament-setting/services/sidebar";
import { BracketData, listBracket } from "@app/api/bracket/list-bracket";
import { BracketStatus } from "@app/types/bracket.type";
import { useSubscription } from "@app/hooks/subscription";
import React from "react";

export function Bracket() {
  const [brackets, setBrackets] = useState<BracketData[]>([]);
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const listBracketSub = listBracket({
      tournamentId: router.query.tournamentId as any,
    }).subscribe((res) => {
      setBrackets(res.data);
    });

    subscription.add(listBracketSub);
  }, []);

  return (
    <div>
      <div className='de-card-header'>
        <div className='de-card-title'>Bracket</div>
        <button
          type='button'
          className='de-btn de-btn-sm de-btn-secondary'
        >
          Finalize standings
        </button>
      </div>
      <div className='de-card-body'>
        {!brackets || !brackets.length ?
          <>
            <div className='de-notice'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g opacity='0.6'>
                  <path d='M12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 17H11V15H13V17Z' fill='#E59C50' />
                </g>
              </svg>
              <span>No bracket</span>
            </div>
            <Link href={`/tournament-setting/${router.query.tournamentId}?tab=${TournamentTabKeys.CREATE_BRACKET}`}>
              <a className='de-btn de-btn-sm de-btn-outline-secondary'>
                Add bracket
              </a>
            </Link>
          </> :
          <div className='de-ts-list-bracket-dashboard'>
            <div className='table-responsive'>
              <table className='table de-table table-borderless de-mb-0'>
                <tbody>
                  {brackets.map((bracket) => {
                    const bracketTab =
                      bracket.status === BracketStatus.STANDBY
                        ? TournamentTabKeys.BRACKET_PREVIEW
                        : TournamentTabKeys.BRACKET_PREVIEW;

                    const bracketHref = `/tournament-setting/${router.query.tournamentId}?tab=${bracketTab}&bracketUUID=${bracket._id}`;

                    return (
                      <React.Fragment key={bracket._id}>
                        <tr>
                          <td className='text-uppercase'>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <path d='M18.79 11.82C18.6913 11.8223 18.5931 11.8038 18.5018 11.766C18.4106 11.7281 18.3282 11.6716 18.26 11.6L13.05 6.40002C12.9176 6.25785 12.8454 6.0698 12.8489 5.8755C12.8523 5.6812 12.931 5.49582 13.0684 5.3584C13.2058 5.22099 13.3912 5.14228 13.5855 5.13885C13.7798 5.13542 13.9679 5.20754 14.11 5.34002L19.32 10.54C19.4605 10.6807 19.5394 10.8713 19.5394 11.07C19.5394 11.2688 19.4605 11.4594 19.32 11.6C19.2508 11.6701 19.1683 11.7257 19.0772 11.7635C18.9862 11.8013 18.8886 11.8205 18.79 11.82Z' fill='#5062E5' />
                              <path d='M13.6301 11.77C13.5315 11.7705 13.4339 11.7513 13.3429 11.7135C13.2519 11.6757 13.1693 11.6201 13.1001 11.55C12.9596 11.4094 12.8807 11.2188 12.8807 11.02C12.8807 10.8213 12.9596 10.6306 13.1001 10.49L18.3101 5.29001C18.379 5.21925 18.4614 5.16301 18.5525 5.12462C18.6435 5.08622 18.7413 5.06644 18.8401 5.06644C18.9389 5.06644 19.0367 5.08622 19.1277 5.12462C19.2187 5.16301 19.3011 5.21925 19.3701 5.29001C19.5105 5.43063 19.5894 5.62126 19.5894 5.82001C19.5894 6.01876 19.5105 6.20938 19.3701 6.35001L14.1601 11.55C14.0912 11.6206 14.0087 11.6765 13.9176 11.7143C13.8265 11.7521 13.7287 11.771 13.6301 11.77Z' fill='#5062E5' />
                              <path d='M7.79004 11.8C7.12153 11.8 6.46805 11.6018 5.91221 11.2304C5.35637 10.859 4.92315 10.3311 4.66732 9.71348C4.4115 9.09587 4.34456 8.41626 4.47498 7.76061C4.6054 7.10495 4.92731 6.50269 5.40001 6.02999C5.87272 5.55729 6.47497 5.23537 7.13063 5.10496C7.78629 4.97454 8.46589 5.04147 9.08351 5.2973C9.70112 5.55312 10.229 5.98634 10.6004 6.54218C10.9718 7.09802 11.17 7.75151 11.17 8.42001C11.1674 9.31563 10.8104 10.1738 10.1771 10.8071C9.54384 11.4404 8.68566 11.7974 7.79004 11.8ZM7.79004 6.54001C7.41821 6.54001 7.05473 6.65027 6.74556 6.85685C6.4364 7.06342 6.19543 7.35704 6.05314 7.70057C5.91085 8.04409 5.87362 8.4221 5.94616 8.78678C6.0187 9.15146 6.19775 9.48645 6.46068 9.74937C6.7236 10.0123 7.05858 10.1913 7.42327 10.2639C7.78795 10.3364 8.16596 10.2992 8.50948 10.1569C8.85301 10.0146 9.14662 9.77365 9.3532 9.46448C9.55978 9.15532 9.67004 8.79184 9.67004 8.42001C9.67004 7.9214 9.47196 7.44322 9.1194 7.09065C8.76683 6.73808 8.28864 6.54001 7.79004 6.54001Z' fill='white' />
                              <path d='M7.79004 20C7.12153 20 6.46805 19.8018 5.91221 19.4304C5.35637 19.059 4.92315 18.5311 4.66732 17.9135C4.4115 17.2959 4.34456 16.6163 4.47498 15.9606C4.6054 15.305 4.92731 14.7027 5.40001 14.23C5.87272 13.7573 6.47497 13.4354 7.13063 13.305C7.78629 13.1746 8.46589 13.2415 9.08351 13.4973C9.70112 13.7531 10.229 14.1864 10.6004 14.7422C10.9718 15.298 11.17 15.9515 11.17 16.62C11.1674 17.5156 10.8104 18.3738 10.1771 19.0071C9.54384 19.6404 8.68566 19.9974 7.79004 20ZM7.79004 14.74C7.41821 14.74 7.05473 14.8503 6.74556 15.0569C6.4364 15.2634 6.19543 15.5571 6.05314 15.9006C5.91085 16.2441 5.87362 16.6221 5.94616 16.9868C6.0187 17.3515 6.19775 17.6865 6.46068 17.9494C6.7236 18.2123 7.05858 18.3914 7.42327 18.4639C7.78795 18.5364 8.16596 18.4992 8.50948 18.3569C8.85301 18.2146 9.14662 17.9737 9.3532 17.6645C9.55978 17.3553 9.67004 16.9919 9.67004 16.62C9.67004 16.1214 9.47196 15.6432 9.1194 15.2907C8.76683 14.9381 8.28864 14.74 7.79004 14.74Z' fill='white' />
                              <path d='M16.2101 20C15.5416 20 14.8881 19.8018 14.3323 19.4304C13.7764 19.059 13.3432 18.5311 13.0874 17.9135C12.8315 17.2959 12.7646 16.6163 12.895 15.9606C13.0254 15.305 13.3474 14.7027 13.8201 14.23C14.2928 13.7573 14.895 13.4354 15.5507 13.305C16.2063 13.1746 16.8859 13.2415 17.5035 13.4973C18.1212 13.7531 18.649 14.1864 19.0204 14.7422C19.3918 15.298 19.5901 15.9515 19.5901 16.62C19.5874 17.5156 19.2305 18.3738 18.5972 19.0071C17.9639 19.6404 17.1057 19.9974 16.2101 20ZM16.2101 14.74C15.8382 14.74 15.4748 14.8503 15.1656 15.0569C14.8564 15.2634 14.6155 15.5571 14.4732 15.9006C14.3309 16.2441 14.2937 16.6221 14.3662 16.9868C14.4387 17.3515 14.6178 17.6865 14.8807 17.9494C15.1436 18.2123 15.4786 18.3914 15.8433 18.4639C16.208 18.5364 16.586 18.4992 16.9295 18.3569C17.273 18.2146 17.5667 17.9737 17.7732 17.6645C17.9798 17.3553 18.0901 16.9919 18.0901 16.62C18.0901 16.1214 17.892 15.6432 17.5394 15.2907C17.1869 14.9381 16.7087 14.74 16.2101 14.74Z' fill='white' />
                            </svg>
                            <span className='de-ms-1'>{bracket.name}</span>
                          </td>
                          <td>
                            <Link href={bracketHref}>
                              <a className='de-btn de-btn-sm de-btn-outline-secondary'>
                                {bracket.mode}
                              </a>
                            </Link>
                          </td>
                          <td>Starting {bracket.start_date}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>
  );
}