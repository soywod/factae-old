import React, {Fragment, useMemo, useEffect, useRef, useState} from 'react'
import find from 'lodash/find'
import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import keys from 'lodash/keys'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Quotation, emptyQuotation} from '../../quotation/model'
import {ContractItem} from '../../contractItem/model'
import {RateUnit} from '../../user/model'
import useRouting from '../../common/hooks/routing'
import useQuotationContext from '../context'
import useUserContext from '../../user/context'
import useClientContext from '../../client/context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import EditItem from '../../contractItem/components/Edit'
import ListItem from '../../contractItem/components/List'

export default function() {
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const [quotations, dispatch] = useQuotationContext()

  const {goTo, match, location} = useRouting<{id: number}>()
  const id = isNil(match.params.id) ? -1 : Number(match.params.id)

  const getDefaultQuotation = useMemo((): Quotation => {
    const {state} = location
    if (isObject(state)) return state

    const quotation = find(quotations, {id})
    if (!isNil(quotation)) return quotation

    return emptyQuotation(user)
  }, [quotations])

  const quotation = useRef(getDefaultQuotation)
  const [rate, setLocalRate] = useState(quotation.current.rate)
  const [taxRate, setLocalTaxRate] = useState(quotation.current.taxRate)
  const [items, setItems] = useState(quotation.current.items)
  const [total, setTotal] = useState(quotation.current.total)
  const {Form, TextField, DateField, Select} = useForm(quotation.current)

  useEffect(() => {
    quotation.current = getDefaultQuotation

    setLocalRate(quotation.current.rate)
    setLocalTaxRate(quotation.current.taxRate)
    setItems(quotation.current.items)
    setTotal(quotation.current.total)
  }, [quotations])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + item.total)
  }

  function setTaxRate(value: string | number | null | undefined) {
    setLocalTaxRate(isNil(value) ? null : Number(value))
  }

  function setRate(value: string | number | null | undefined) {
    setLocalRate(isNil(value) ? null : Number(value))
  }

  async function saveQuotation(quotation: Quotation) {
    quotation.items = items
    quotation.total = total

    if (id === -1) {
      await service.create(quotation)
      dispatch({type: 'create', quotation})
    } else {
      await service.update(quotation)
      dispatch({type: 'update', quotation})
    }
  }

  if (isNil(user)) return null
  if (isNil(clients)) return null
  if (isNil(quotations) && id > -1) return null

  function renderRate(unit: RateUnit) {
    switch (unit) {
      case RateUnit.hour:
        return 'Par heure'

      case RateUnit.day:
        return 'Par jour'

      case RateUnit.service:
        return 'Par prestation'
    }
  }

  return (
    <Fragment>
      <Form
        onSubmit={saveQuotation}
        onSuccess={{message: 'Devis enregistré.', goTo: 'quotation'}}
        onError={{message: "Erreur lors de l'enregistrement du devis !"}}
      >
        <Header
          title={id === -1 ? 'Créer un devis' : 'Modifier un devis'}
          onBack={() => goTo('quotation')}
          action={{
            label: 'Sauvegarder',
            icon: IconSave,
          }}
        />

        <Section title="Informations générales">
          <Select name="clientId" label="Client" autoFocus>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </Select>
          {user.taxId && (
            <TextField
              name="taxRate"
              label="TVA (%)"
              type="number"
              onChange={setTaxRate}
            />
          )}
          <TextField
            grid={{xs: 12}}
            multiline
            rows={4}
            name="conditions"
            label="Conditions"
            required={false}
          />
        </Section>

        <Section title="Tarification">
          <TextField
            name="rate"
            label="Tarif (€)"
            type="number"
            required={false}
            onChange={setRate}
          />
          <Select name="rateUnit" label="Unité" required={false}>
            {keys(RateUnit)
              .filter(unit => !isNaN(Number(unit)))
              .map(unit => (
                <option key={unit} value={unit}>
                  {renderRate(Number(unit))}
                </option>
              ))}
          </Select>
        </Section>

        <Section title="Dates">
          <DateField name="expiresAt" label="Expiration de l'offre" />
          <DateField name="startsAt" label="Date de début" />
          <DateField name="endsAt" label="Date de fin" />
        </Section>
      </Form>

      <EditItem rate={rate} onAdd={addItem} />
      <ListItem items={items} total={total} taxRate={taxRate} />
    </Fragment>
  )
}
