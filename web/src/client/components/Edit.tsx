import React, {useContext} from 'react'
import find from 'lodash/fp/find'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import IconSave from '@material-ui/icons/Save'

import * as clientService from '../service'
import ClientContext from '../context'
import {Client, emptyClient} from '../model'
import useRouting from '../../common/hooks/routing'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'

export default function() {
  const {match} = useRouting()
  const [clients, dispatch] = useContext(ClientContext)

  const id = isNil(match.params.id) ? -1 : Number(match.params.id)
  const defaultClient = find<Client>({id})(clients) || emptyClient
  const client = isNull(clients) ? null : defaultClient
  const {Form, TextField} = useForm<Client>(client)

  async function createOrUpdateClient(nextClient: Client) {
    if (id === -1) {
      const clientWithId = await clientService.create(nextClient)
      dispatch({type: 'create', client: clientWithId})
    } else {
      const clientWithId = await clientService.update(nextClient)
      dispatch({type: 'update', client: clientWithId})
    }
  }

  if (id > -1 && isNull(client)) {
    return null
  }

  return (
    <Form onSubmit={createOrUpdateClient}>
      <Header
        title={id === -1 ? 'Ajouter un client' : 'Modifier un client'}
        label="Sauvegarder"
        icon={IconSave}
      />
      <Section title="Informations personnelles">
        <TextField name="firstName" label="Prénom" autoFocus />
        <TextField name="lastName" label="Nom" />
        <TextField name="email" label="Email" type="email" />
        <TextField name="phone" label="Téléphone" />
      </Section>
      <Section title="Adresse postale">
        <TextField name="address" label="Adresse" />
        <TextField name="zip" label="Code postal" type="number" />
        <TextField name="city" label="Ville" />
      </Section>
      <Section title="Autre">
        <TextField name="tvaNumber" label="Numéro de TVA" required={false} />
      </Section>
    </Form>
  )
}