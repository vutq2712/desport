import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ChatReport() {
  return (
    <div className='de-chat-report'>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip>Report</Tooltip>
        }
      >
        <button type='button' className='de-chat-report-button'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='8' cy='8' r='2' transform='rotate(90 8 8)' fill='currentColor' />
            <circle cx='8' cy='2' r='2' transform='rotate(90 8 2)' fill='currentColor' />
            <circle cx='8' cy='14' r='2' transform='rotate(90 8 14)' fill='currentColor' />
          </svg>
        </button>
      </OverlayTrigger>
    </div>
  )
}
