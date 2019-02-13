import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    height: '100%',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  cell: {
    padding: `8px 56px 8px 24px`,
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  footer: {
    backgroundColor: theme.palette.grey[100],
  },
}))
