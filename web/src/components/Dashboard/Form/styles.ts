import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    title: {
      margin: `${unit * 2}px 0`,
      display: 'flex',
    },
    subTitle: {
      color: theme.palette.primary.main,
      padding: `${unit * 2}px 0 0 0`,
      margin: `${unit * 4}px 0 ${unit * 2}px 0`,
      borderTop: `1px dashed ${theme.palette.grey.A100}`,
    },
    icon: {
      marginRight: unit,
    },
    action: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
    },
  }
})
