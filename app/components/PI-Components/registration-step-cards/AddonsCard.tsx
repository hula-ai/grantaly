import { PlanAddon, PriceType } from '../../../config'
import { Card } from '../multi-step/card/Card'
import styles from './AddonsCard.module.scss'
import DocumentUpload from './DocumentUpload'

type Props = {
  addons: PlanAddon[]
  checkedAddons: Set<PlanAddon>
  onToggleAddon: (addon: PlanAddon) => void
  priceType: PriceType
}

export default function AddonsCard(
  { addons, checkedAddons, onToggleAddon, priceType }: Props,
) {
  return (
    <Card>
      <Card.Title>Contract Management</Card.Title>
      <Card.Description>
        Please upload your contract
      </Card.Description>
      <DocumentUpload/>
    </Card>
  )
}
