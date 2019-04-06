import React, {useContext} from 'react'
import isNull from 'lodash/fp/isNull'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import QuotationContext from '../../context'
import QuotationListItem from '../ListItem'

import {useStyles} from './styles'

export default function() {
  const [quotations] = useContext(QuotationContext)
  const classes = useStyles()

  if (isNull(quotations)) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.date}>Date</TableCell>
          <TableCell className={classes.client}>Client</TableCell>
          <TableCell className={classes.status}>Statut</TableCell>
          <TableCell className={classes.total}>Total HT</TableCell>
          <TableCell className={classes.actions}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quotations.map((quotation, key) => (
          <QuotationListItem key={key} quotation={quotation} />
        ))}
      </TableBody>
    </Table>
  )
}