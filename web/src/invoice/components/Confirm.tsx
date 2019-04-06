import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function(props: Props) {
  const {open, onCancel: cancel, onConfirm: confirm} = props

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>Attention</DialogTitle>

      <DialogContent>
        <DialogContentText>
          C'est la première fois que vous téléchargez cette facture. Si vous
          continuez, elle sera vérouillée, et vous ne pourrez plus la modifier.
          Êtes-vous sûr de vouloir continuer ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={cancel} color="secondary">
          Annuler
        </Button>
        <Button onClick={confirm} color="primary" variant="contained" autoFocus>
          Continuer
        </Button>
      </DialogActions>
    </Dialog>
  )
}