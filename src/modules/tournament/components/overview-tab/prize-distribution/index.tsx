import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSubscription } from "@app/hooks/subscription";
import { getBracketsOfTour, BracketInfo } from "@app/api/tournament/overview/get-brackets";
import { BracketStatus } from "@app/types/bracket.type";
import { TournamentTabKeys } from "@app/modules/tournament-setting/services/sidebar";

const mapIconBracket = [
  <svg key={0} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18.79 11.8201C18.6912 11.8223 18.593 11.8039 18.5018 11.766C18.4105 11.7281 18.3282 11.6716 18.26 11.6001L13.05 6.40009C12.9175 6.25791 12.8454 6.06986 12.8488 5.87556C12.8523 5.68126 12.931 5.49588 13.0684 5.35846C13.2058 5.22105 13.3912 5.14234 13.5855 5.13891C13.7798 5.13548 13.9678 5.20761 14.11 5.34009L19.32 10.5401C19.4605 10.6807 19.5393 10.8713 19.5393 11.0701C19.5393 11.2688 19.4605 11.4595 19.32 11.6001C19.2508 11.6702 19.1682 11.7258 19.0772 11.7636C18.9862 11.8013 18.8885 11.8206 18.79 11.8201Z' fill='#5062E5' />
    <path d='M13.63 11.7701C13.5315 11.7706 13.4338 11.7513 13.3428 11.7136C13.2518 11.6758 13.1692 11.6202 13.1 11.5501C12.9596 11.4095 12.8807 11.2188 12.8807 11.0201C12.8807 10.8213 12.9596 10.6307 13.1 10.4901L18.31 5.2901C18.3789 5.21934 18.4614 5.16311 18.5524 5.12471C18.6434 5.08631 18.7412 5.06653 18.84 5.06653C18.9388 5.06653 19.0366 5.08631 19.1276 5.12471C19.2186 5.16311 19.3011 5.21934 19.37 5.2901C19.5105 5.43072 19.5893 5.62135 19.5893 5.8201C19.5893 6.01885 19.5105 6.20947 19.37 6.3501L14.16 11.5501C14.0911 11.6207 14.0086 11.6765 13.9175 11.7144C13.8264 11.7522 13.7286 11.7711 13.63 11.7701Z' fill='#5062E5' />
    <path d='M7.79001 11.8C7.1215 11.8 6.46802 11.6018 5.91218 11.2304C5.35634 10.859 4.92312 10.3311 4.66729 9.71351C4.41147 9.0959 4.34453 8.41629 4.47495 7.76064C4.60537 7.10498 4.92728 6.50272 5.39998 6.03002C5.87269 5.55732 6.47494 5.2354 7.1306 5.10499C7.78626 4.97457 8.46586 5.0415 9.08348 5.29733C9.70109 5.55315 10.229 5.98637 10.6004 6.54221C10.9718 7.09805 11.17 7.75154 11.17 8.42004C11.1674 9.31566 10.8104 10.1738 10.1771 10.8071C9.54381 11.4404 8.68563 11.7974 7.79001 11.8ZM7.79001 6.54004C7.41818 6.54004 7.0547 6.6503 6.74553 6.85688C6.43637 7.06345 6.1954 7.35707 6.05311 7.7006C5.91082 8.04412 5.87359 8.42213 5.94613 8.78681C6.01867 9.15149 6.19772 9.48648 6.46064 9.7494C6.72357 10.0123 7.05855 10.1914 7.42324 10.2639C7.78792 10.3365 8.16593 10.2992 8.50945 10.1569C8.85298 10.0146 9.14659 9.77368 9.35317 9.46451C9.55974 9.15535 9.67001 8.79187 9.67001 8.42004C9.67001 7.92143 9.47193 7.44325 9.11937 7.09068C8.7668 6.73811 8.28861 6.54004 7.79001 6.54004Z' fill='white' />
    <path d='M7.79001 20C7.1215 20 6.46802 19.8018 5.91218 19.4304C5.35634 19.059 4.92312 18.5311 4.66729 17.9135C4.41147 17.2958 4.34453 16.6162 4.47495 15.9606C4.60537 15.3049 4.92728 14.7027 5.39998 14.23C5.87269 13.7573 6.47494 13.4354 7.1306 13.3049C7.78626 13.1745 8.46586 13.2415 9.08348 13.4973C9.70109 13.7531 10.229 14.1863 10.6004 14.7422C10.9718 15.298 11.17 15.9515 11.17 16.62C11.1674 17.5156 10.8104 18.3738 10.1771 19.0071C9.54381 19.6404 8.68563 19.9974 7.79001 20ZM7.79001 14.74C7.41818 14.74 7.0547 14.8503 6.74553 15.0568C6.43637 15.2634 6.1954 15.557 6.05311 15.9005C5.91082 16.2441 5.87359 16.6221 5.94613 16.9868C6.01867 17.3514 6.19772 17.6864 6.46064 17.9494C6.72357 18.2123 7.05855 18.3913 7.42324 18.4639C7.78792 18.5364 8.16593 18.4992 8.50945 18.3569C8.85298 18.2146 9.14659 17.9736 9.35317 17.6645C9.55974 17.3553 9.67001 16.9918 9.67001 16.62C9.67001 16.1214 9.47193 15.6432 9.11937 15.2906C8.7668 14.9381 8.28861 14.74 7.79001 14.74Z' fill='white' />
    <path d='M16.21 20C15.5415 20 14.888 19.8018 14.3322 19.4304C13.7763 19.059 13.3431 18.5311 13.0873 17.9135C12.8315 17.2958 12.7645 16.6162 12.8949 15.9606C13.0254 15.3049 13.3473 14.7027 13.82 14.23C14.2927 13.7573 14.8949 13.4354 15.5506 13.3049C16.2063 13.1745 16.8859 13.2415 17.5035 13.4973C18.1211 13.7531 18.649 14.1863 19.0204 14.7422C19.3918 15.298 19.59 15.9515 19.59 16.62C19.5874 17.5156 19.2304 18.3738 18.5971 19.0071C17.9638 19.6404 17.1056 19.9974 16.21 20ZM16.21 14.74C15.8382 14.74 15.4747 14.8503 15.1655 15.0568C14.8564 15.2634 14.6154 15.557 14.4731 15.9005C14.3308 16.2441 14.2936 16.6221 14.3661 16.9868C14.4387 17.3514 14.6177 17.6864 14.8806 17.9494C15.1436 18.2123 15.4785 18.3913 15.8432 18.4639C16.2079 18.5364 16.5859 18.4992 16.9294 18.3569C17.273 18.2146 17.5666 17.9736 17.7732 17.6645C17.9797 17.3553 18.09 16.9918 18.09 16.62C18.09 16.1214 17.8919 15.6432 17.5394 15.2906C17.1868 14.9381 16.7086 14.74 16.21 14.74Z' fill='white' />
  </svg>,
  <svg key={1} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18.79 11.8201C18.6912 11.8223 18.593 11.8039 18.5018 11.766C18.4105 11.7281 18.3282 11.6716 18.26 11.6001L13.05 6.40009C12.9175 6.25791 12.8454 6.06986 12.8488 5.87556C12.8523 5.68126 12.931 5.49588 13.0684 5.35846C13.2058 5.22105 13.3912 5.14234 13.5855 5.13891C13.7798 5.13548 13.9678 5.20761 14.11 5.34009L19.32 10.5401C19.4605 10.6807 19.5393 10.8713 19.5393 11.0701C19.5393 11.2688 19.4605 11.4595 19.32 11.6001C19.2508 11.6702 19.1682 11.7258 19.0772 11.7636C18.9862 11.8013 18.8885 11.8206 18.79 11.8201Z' fill='#609A5B' />
    <path d='M13.63 11.7701C13.5315 11.7706 13.4338 11.7513 13.3428 11.7136C13.2518 11.6758 13.1692 11.6202 13.1 11.5501C12.9596 11.4095 12.8807 11.2188 12.8807 11.0201C12.8807 10.8213 12.9596 10.6307 13.1 10.4901L18.31 5.2901C18.3789 5.21934 18.4614 5.16311 18.5524 5.12471C18.6434 5.08631 18.7412 5.06653 18.84 5.06653C18.9388 5.06653 19.0366 5.08631 19.1276 5.12471C19.2186 5.16311 19.3011 5.21934 19.37 5.2901C19.5105 5.43072 19.5893 5.62135 19.5893 5.8201C19.5893 6.01885 19.5105 6.20947 19.37 6.3501L14.16 11.5501C14.0911 11.6207 14.0086 11.6765 13.9175 11.7144C13.8264 11.7522 13.7286 11.7711 13.63 11.7701Z' fill='#609A5B' />
    <path d='M7.79001 11.8C7.1215 11.8 6.46802 11.6018 5.91218 11.2304C5.35634 10.859 4.92312 10.3311 4.66729 9.71351C4.41147 9.0959 4.34453 8.41629 4.47495 7.76064C4.60537 7.10498 4.92728 6.50272 5.39998 6.03002C5.87269 5.55732 6.47494 5.2354 7.1306 5.10499C7.78626 4.97457 8.46586 5.0415 9.08348 5.29733C9.70109 5.55315 10.229 5.98637 10.6004 6.54221C10.9718 7.09805 11.17 7.75154 11.17 8.42004C11.1674 9.31566 10.8104 10.1738 10.1771 10.8071C9.54381 11.4404 8.68563 11.7974 7.79001 11.8ZM7.79001 6.54004C7.41818 6.54004 7.0547 6.6503 6.74553 6.85688C6.43637 7.06345 6.1954 7.35707 6.05311 7.7006C5.91082 8.04412 5.87359 8.42213 5.94613 8.78681C6.01867 9.15149 6.19772 9.48648 6.46064 9.7494C6.72357 10.0123 7.05855 10.1914 7.42324 10.2639C7.78792 10.3365 8.16593 10.2992 8.50945 10.1569C8.85298 10.0146 9.14659 9.77368 9.35317 9.46451C9.55974 9.15535 9.67001 8.79187 9.67001 8.42004C9.67001 7.92143 9.47193 7.44325 9.11937 7.09068C8.7668 6.73811 8.28861 6.54004 7.79001 6.54004Z' fill='white' />
    <path d='M7.79001 20C7.1215 20 6.46802 19.8018 5.91218 19.4304C5.35634 19.059 4.92312 18.5311 4.66729 17.9135C4.41147 17.2958 4.34453 16.6162 4.47495 15.9606C4.60537 15.3049 4.92728 14.7027 5.39998 14.23C5.87269 13.7573 6.47494 13.4354 7.1306 13.3049C7.78626 13.1745 8.46586 13.2415 9.08348 13.4973C9.70109 13.7531 10.229 14.1863 10.6004 14.7422C10.9718 15.298 11.17 15.9515 11.17 16.62C11.1674 17.5156 10.8104 18.3738 10.1771 19.0071C9.54381 19.6404 8.68563 19.9974 7.79001 20ZM7.79001 14.74C7.41818 14.74 7.0547 14.8503 6.74553 15.0568C6.43637 15.2634 6.1954 15.557 6.05311 15.9005C5.91082 16.2441 5.87359 16.6221 5.94613 16.9868C6.01867 17.3514 6.19772 17.6864 6.46064 17.9494C6.72357 18.2123 7.05855 18.3913 7.42324 18.4639C7.78792 18.5364 8.16593 18.4992 8.50945 18.3569C8.85298 18.2146 9.14659 17.9736 9.35317 17.6645C9.55974 17.3553 9.67001 16.9918 9.67001 16.62C9.67001 16.1214 9.47193 15.6432 9.11937 15.2906C8.7668 14.9381 8.28861 14.74 7.79001 14.74Z' fill='white' />
    <path d='M16.21 20C15.5415 20 14.888 19.8018 14.3322 19.4304C13.7763 19.059 13.3431 18.5311 13.0873 17.9135C12.8315 17.2958 12.7645 16.6162 12.8949 15.9606C13.0254 15.3049 13.3473 14.7027 13.82 14.23C14.2927 13.7573 14.8949 13.4354 15.5506 13.3049C16.2063 13.1745 16.8859 13.2415 17.5035 13.4973C18.1211 13.7531 18.649 14.1863 19.0204 14.7422C19.3918 15.298 19.59 15.9515 19.59 16.62C19.5874 17.5156 19.2304 18.3738 18.5971 19.0071C17.9638 19.6404 17.1056 19.9974 16.21 20ZM16.21 14.74C15.8382 14.74 15.4747 14.8503 15.1655 15.0568C14.8564 15.2634 14.6154 15.557 14.4731 15.9005C14.3308 16.2441 14.2936 16.6221 14.3661 16.9868C14.4387 17.3514 14.6177 17.6864 14.8806 17.9494C15.1436 18.2123 15.4785 18.3913 15.8432 18.4639C16.2079 18.5364 16.5859 18.4992 16.9294 18.3569C17.273 18.2146 17.5666 17.9736 17.7732 17.6645C17.9797 17.3553 18.09 16.9918 18.09 16.62C18.09 16.1214 17.8919 15.6432 17.5394 15.2906C17.1868 14.9381 16.7086 14.74 16.21 14.74Z' fill='white' />
  </svg>,
  <svg key={2} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18.79 11.8201C18.6912 11.8223 18.593 11.8039 18.5018 11.766C18.4105 11.7281 18.3282 11.6716 18.26 11.6001L13.05 6.40009C12.9175 6.25791 12.8454 6.06986 12.8488 5.87556C12.8523 5.68126 12.931 5.49588 13.0684 5.35846C13.2058 5.22105 13.3912 5.14234 13.5855 5.13891C13.7798 5.13548 13.9678 5.20761 14.11 5.34009L19.32 10.5401C19.4605 10.6807 19.5393 10.8713 19.5393 11.0701C19.5393 11.2688 19.4605 11.4595 19.32 11.6001C19.2508 11.6702 19.1682 11.7258 19.0772 11.7636C18.9862 11.8013 18.8885 11.8206 18.79 11.8201Z' fill='#E59C50' />
    <path d='M13.63 11.7701C13.5315 11.7706 13.4338 11.7513 13.3428 11.7136C13.2518 11.6758 13.1692 11.6202 13.1 11.5501C12.9596 11.4095 12.8807 11.2188 12.8807 11.0201C12.8807 10.8213 12.9596 10.6307 13.1 10.4901L18.31 5.2901C18.3789 5.21934 18.4614 5.16311 18.5524 5.12471C18.6434 5.08631 18.7412 5.06653 18.84 5.06653C18.9388 5.06653 19.0366 5.08631 19.1276 5.12471C19.2186 5.16311 19.3011 5.21934 19.37 5.2901C19.5105 5.43072 19.5893 5.62135 19.5893 5.8201C19.5893 6.01885 19.5105 6.20947 19.37 6.3501L14.16 11.5501C14.0911 11.6207 14.0086 11.6765 13.9175 11.7144C13.8264 11.7522 13.7286 11.7711 13.63 11.7701Z' fill='#E59C50' />
    <path d='M7.79001 11.8C7.1215 11.8 6.46802 11.6018 5.91218 11.2304C5.35634 10.859 4.92312 10.3311 4.66729 9.71351C4.41147 9.0959 4.34453 8.41629 4.47495 7.76064C4.60537 7.10498 4.92728 6.50272 5.39998 6.03002C5.87269 5.55732 6.47494 5.2354 7.1306 5.10499C7.78626 4.97457 8.46586 5.0415 9.08348 5.29733C9.70109 5.55315 10.229 5.98637 10.6004 6.54221C10.9718 7.09805 11.17 7.75154 11.17 8.42004C11.1674 9.31566 10.8104 10.1738 10.1771 10.8071C9.54381 11.4404 8.68563 11.7974 7.79001 11.8ZM7.79001 6.54004C7.41818 6.54004 7.0547 6.6503 6.74553 6.85688C6.43637 7.06345 6.1954 7.35707 6.05311 7.7006C5.91082 8.04412 5.87359 8.42213 5.94613 8.78681C6.01867 9.15149 6.19772 9.48648 6.46064 9.7494C6.72357 10.0123 7.05855 10.1914 7.42324 10.2639C7.78792 10.3365 8.16593 10.2992 8.50945 10.1569C8.85298 10.0146 9.14659 9.77368 9.35317 9.46451C9.55974 9.15535 9.67001 8.79187 9.67001 8.42004C9.67001 7.92143 9.47193 7.44325 9.11937 7.09068C8.7668 6.73811 8.28861 6.54004 7.79001 6.54004Z' fill='white' />
    <path d='M7.79001 20C7.1215 20 6.46802 19.8018 5.91218 19.4304C5.35634 19.059 4.92312 18.5311 4.66729 17.9135C4.41147 17.2958 4.34453 16.6162 4.47495 15.9606C4.60537 15.3049 4.92728 14.7027 5.39998 14.23C5.87269 13.7573 6.47494 13.4354 7.1306 13.3049C7.78626 13.1745 8.46586 13.2415 9.08348 13.4973C9.70109 13.7531 10.229 14.1863 10.6004 14.7422C10.9718 15.298 11.17 15.9515 11.17 16.62C11.1674 17.5156 10.8104 18.3738 10.1771 19.0071C9.54381 19.6404 8.68563 19.9974 7.79001 20ZM7.79001 14.74C7.41818 14.74 7.0547 14.8503 6.74553 15.0568C6.43637 15.2634 6.1954 15.557 6.05311 15.9005C5.91082 16.2441 5.87359 16.6221 5.94613 16.9868C6.01867 17.3514 6.19772 17.6864 6.46064 17.9494C6.72357 18.2123 7.05855 18.3913 7.42324 18.4639C7.78792 18.5364 8.16593 18.4992 8.50945 18.3569C8.85298 18.2146 9.14659 17.9736 9.35317 17.6645C9.55974 17.3553 9.67001 16.9918 9.67001 16.62C9.67001 16.1214 9.47193 15.6432 9.11937 15.2906C8.7668 14.9381 8.28861 14.74 7.79001 14.74Z' fill='white' />
    <path d='M16.21 20C15.5415 20 14.888 19.8018 14.3322 19.4304C13.7763 19.059 13.3431 18.5311 13.0873 17.9135C12.8315 17.2958 12.7645 16.6162 12.8949 15.9606C13.0254 15.3049 13.3473 14.7027 13.82 14.23C14.2927 13.7573 14.8949 13.4354 15.5506 13.3049C16.2063 13.1745 16.8859 13.2415 17.5035 13.4973C18.1211 13.7531 18.649 14.1863 19.0204 14.7422C19.3918 15.298 19.59 15.9515 19.59 16.62C19.5874 17.5156 19.2304 18.3738 18.5971 19.0071C17.9638 19.6404 17.1056 19.9974 16.21 20ZM16.21 14.74C15.8382 14.74 15.4747 14.8503 15.1655 15.0568C14.8564 15.2634 14.6154 15.557 14.4731 15.9005C14.3308 16.2441 14.2936 16.6221 14.3661 16.9868C14.4387 17.3514 14.6177 17.6864 14.8806 17.9494C15.1436 18.2123 15.4785 18.3913 15.8432 18.4639C16.2079 18.5364 16.5859 18.4992 16.9294 18.3569C17.273 18.2146 17.5666 17.9736 17.7732 17.6645C17.9797 17.3553 18.09 16.9918 18.09 16.62C18.09 16.1214 17.8919 15.6432 17.5394 15.2906C17.1868 14.9381 16.7086 14.74 16.21 14.74Z' fill='white' />
  </svg>
];

const mapStatusClassName = {
  [BracketStatus.STANDBY]: 'default',
  [BracketStatus.UPCOMING]: 'primary',
  [BracketStatus.ONGOING]: 'success',
  [BracketStatus.FINISHED]: 'secondary',
}

const mapStatusLabel = {
  [BracketStatus.STANDBY]: 'Standby',
  [BracketStatus.UPCOMING]: 'Upcoming',
  [BracketStatus.ONGOING]: 'On-going',
  [BracketStatus.FINISHED]: 'Finished',
}

export function TournamentPrizeDistribution() {
  const [brackets, changeBrackets] = useState<BracketInfo[]>([]);
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const sub = getBracketsOfTour(router.query.tournamentId as string).subscribe({
      next: res => {
        changeBrackets(res.data);
      },
      error: error => alert(error?.response?.msg || 'Error'),
    })

    subscription.add(sub);
  }, [])

  return (
    <div className='de-card full-h'>
      <div className='de-card-header'>
        <div className='de-card-title'>Prize distribution by bracket</div>
      </div>
      <div className='de-card-body tournament-prize-distribution-wrap'>
        <div className='table-responsive'>
          <table className='table de-table table-borderless mb-0'>
            <tbody>
              {brackets.map((bracket, index) => (
                <tr key={index}>
                  <td style={{ width: 24 }}>
                    {mapIconBracket[index] || mapIconBracket[mapIconBracket.length - 1]}
                  </td>
                  <td style={{ width: 150 }}>
                    {bracket.bracket_info?.name}
                  </td>
                  <td style={{ width: 90 }}>
                    <div className={`de-tag ${mapStatusClassName[bracket.bracket_info?.status]}`}>{mapStatusLabel[bracket.bracket_info?.status]}</div>
                  </td>
                  <td>
                    {bracket.bracket_prize?.prizepool[0]?.currency && (
                      <div className='de-sub-info-2'>
                        <img src='/assets/images/eth-icon.svg' alt='eth' />
                        <b>{bracket.bracket_prize?.prizepool[0]?.amount}</b>
                        <span>{bracket.bracket_prize?.prizepool[0]?.currency}</span>
                      </div>
                    )}
                  </td>
                  <td className='text-end'>
                    <button
                      type='button'
                      onClick={() => router.push(`/tournament-setting/${router.query.tournamentId}?tab=${TournamentTabKeys.BRACKET_DETAIL}`)}
                      className='de-btn de-btn-sm de-btn-outline-secondary'
                    >
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
