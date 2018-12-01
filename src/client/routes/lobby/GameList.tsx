import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  createStyles,
  Theme,
  Typography,
  Button,
  WithStyles,
  withStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  AppBar,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FilterIcon from "@material-ui/icons/Search"
import ApiService from "../../common/ApiService";

import Player1Avatar from '../../assets/player1.jpg'
import Player2Avatar from '../../assets/player2.jpg'


class GameList extends React.Component<IGameListProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      filter: ''
    }
  }

  private handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value.toLowerCase()
    })
  }

  public render() {
    const { classes, gameNames } = this.props
    const noGames = !gameNames || gameNames.length === 0

    return (
      <Paper className={classes.root}>
        <AppBar position='static' className={classes.header}>
          <Typography className={classes.contrastText} variant="headline">{this.props.title}</Typography>
          <Button onClick={this.props.openDialog} className={classes.contrastText}>
            <AddIcon /> Game
          </Button>
        </AppBar>
        <div className={classes.content}>
          <FormControl>
            <InputLabel htmlFor="game-filter">Filter</InputLabel>
            <Input
              id="game-filter"
              type="text"
              value={this.state.filter}
              onChange={this.handleFilterChange}
              endAdornment={
                <InputAdornment position="end">
                  <FilterIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <List>
            {
              gameNames
              .filter(gameName => gameName.toLowerCase().includes(this.state.filter))
              .map(gameName => (
                <ListItem
                  key={gameName}
                  button
                  onClick={() => this.onRoomClick(gameName)}
                >
                  <div className={classes.playerAvatarsContainer}>
                    <Avatar alt="Player 1" src={Player1Avatar} title="Player 1 username" />
                    <Avatar alt="Player 2" src={Player2Avatar} title='Player 2 username' />
                  </div>
                  <ListItemText
                    primary={gameName}
                    secondary={'123 turns'}
                  />
                </ListItem>
              ))
            }
          </List>
          {noGames && <Typography>No games available</Typography>}
        </div>
      </Paper>
    );
  }

  private onRoomClick = async (gameTitle: string) => {
    const result = await ApiService.write.joinGame(gameTitle);
    this.props.history.push(`/game/${result.title}`)
  }
}

interface IGameListProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  title: string,
  gameNames: string[],
  openDialog: () => void,
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    margin: "20px auto",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.unit
  },
  content: {
    padding: theme.spacing.unit
  },
  contrastText: {
    color: theme.palette.primary.contrastText
  },
  playerAvatarsContainer: {
    display: 'flex'
  }
});

export default withStyles(styles)(withRouter(GameList));