import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  plan: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  input: {
    padding: '18.5px 14px',
    fontSize: '22px',
    borderRadius: theme.spacing.unit / 2,
    transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    border: `1px solid ${theme.palette.grey[200]}`,
    '&:hover': {
      border: `1px solid ${theme.palette.grey[400]}`,
    },
  },
}))