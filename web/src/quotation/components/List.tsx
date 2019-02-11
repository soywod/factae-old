import React, {useContext} from 'react'
import isNull from 'lodash/fp/isNull'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import QuotationContext from '../context'
import QuotationListItem from './ListItem'

export default function() {
  const [quotations] = useContext(QuotationContext)

  if (isNull(quotations)) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Numéro</TableCell>
          <TableCell align="right">Total HT</TableCell>
          <TableCell align="right">Total TTC</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quotations.map(quotation => (
          <QuotationListItem key={quotation.id} quotation={quotation} />
        ))}
      </TableBody>
    </Table>
  )
}