import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: theme.palette.grey[200],
    height: `calc(100vh - ${theme.spacing.unit * 8}px)`,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingTop: theme.spacing.unit * 8,
  },
  grid: {
    height: '100%',
    alignItems: 'flex-end',
  },
  subTitle: {
    marginBottom: theme.spacing.unit * 4,
  },
  screenshotContainer: {
    flex: 1,
  },
  screenshot: {
    display: 'inline-block',
    width: 'auto',
  },
}))
