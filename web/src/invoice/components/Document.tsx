import React from 'react'
import _ from 'lodash/fp'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import {useTheme} from '@material-ui/styles'

import Document from './../../contract/components/Document'
import Section from './../../contract/components/Document/Section'
import UserView from './../../contract/components/Document/User'
import TitleView from './../../contract/components/Document/Title'
import ClientView from '../../contract/components/Document/Client'
import InfoView from '../../contract/components/Document/Info'
import ItemListView from '../../contract/components/Document/ItemList'
import ConditionView from '../../contract/components/Document/Condition'
import BankView from '../../contract/components/Document/Bank'
import MentionView from '../../contract/components/Document/Mention'
import useUserContext from '../../user/context'
import {Invoice} from '../model'
import {Client} from '../../client/model'

type Props = {
  invoice: Invoice | null
  client: Client | null
  onSuccess: (pdf: string) => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {invoice, client} = props
  const [user] = useUserContext()
  const theme = useTheme<Theme>()

  if (_.isNull(user)) return null
  if (_.isNull(client)) return null
  if (_.isNull(invoice)) return null
  if (_.isNull(invoice.createdAt)) return null

  const infos = {
    'Facture n°': invoice.number,
    'Date émission': invoice.createdAt.toFormat('dd/LL/yyyy'),
  }

  return (
    <Document
      fileName={`facture-${invoice.number}.pdf`}
      onDownload={props.onSuccess}
      onError={props.onError}
    >
      <Section theme={theme}>
        <TitleView title="Facture" />
        <InfoView theme={theme} infos={infos} />
      </Section>

      <Section theme={theme}>
        <UserView theme={theme} user={user} />
        <ClientView theme={theme} title="Facturé à" client={client} />
      </Section>

      <Section theme={theme}>
        <ItemListView theme={theme} contract={invoice} />
      </Section>

      <Section theme={theme}>
        <ConditionView conditions={invoice.conditions} />
      </Section>

      <Section theme={theme}>
        <BankView theme={theme} user={user} />
      </Section>

      <Section theme={theme}>
        <MentionView theme={theme} type="invoice" user={user} />
      </Section>
    </Document>
  )
}
