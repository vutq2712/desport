import { Contribute } from "./contribute";
import { ListContributors } from "./list-contributors";

export function ContributeTab() {
  return (
    <div className='de-contribute-tab'>
      <Contribute />

      <ListContributors />
    </div>
  )
}
