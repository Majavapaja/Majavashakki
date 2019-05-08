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
  Avatar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FilterIcon from "@material-ui/icons/Search"
import ApiService from "../../common/ApiService";
import { ApiGameInfo } from "../../../common/types";

import Player1Avatar from "../../assets/player1.jpg"
import Player2Avatar from "../../assets/player2.jpg"
import { inject } from "mobx-react";
import { IAppStore } from "client/store/AppStore";

@inject((stores: IAppStore) => ({game: stores.app.game, api: stores.app.api}))
class GameList extends React.Component<IGameListProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      filter: "",
    }
  }

  private handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value.toLowerCase(),
    })
  }

  public render() {
    const { classes, games, id } = this.props
    const noGames = !games || games.length === 0

    return (
      <Paper id={id} className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Typography className={classes.contrastText} variant="headline">{this.props.title}</Typography>
          <Button id="createGame" onClick={this.props.openDialog} className={classes.contrastText}>
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
              games
              .filter(game => game.title.toLowerCase().includes(this.state.filter))
              .map(game => {
                const whiteName = game.playerWhite ? game.playerWhite.name : undefined
                const blackName = game.playerBlack ? game.playerBlack.name : undefined
                const msg = !game.inProgress ? "Game is finished"
                  : !whiteName ? "Waiting for players..."
                  : !blackName ? `${whiteName} waiting for opponent...`
                  : `${whiteName} vs ${blackName}`
                return <ListItem
                  key={game.title}
                  button
                  onClick={() => this.onRoomClick(game)}
                >
                  <div className={classes.playerAvatarsContainer}>
                    <Avatar alt="Player 1" src={Player1Avatar} title={whiteName} />
                    <Avatar alt="Player 2" src={Player2Avatar} title={blackName} />
                  </div>
                  <ListItemText
                    className="game-title"
                    primary={game.title}
                    secondary={msg}
                  />
                </ListItem>
              })
            }
          </List>
          {noGames && <Typography>No games available</Typography>}
        </div>
      </Paper>
    );
  }

  private onRoomClick = async (game: ApiGameInfo) => {
    await this.props.api.write.joinGame(game.id)
    this.props.history.push(`/game/${game.id}`)
  }
}

interface IGameListProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  id: string,
  title: string,
  games: ApiGameInfo[],
  api?: ApiService,
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
    padding: theme.spacing.unit,
  },
  content: {
    padding: theme.spacing.unit,
  },
  contrastText: {
    color: theme.palette.primary.contrastText,
  },
  playerAvatarsContainer: {
    display: "flex",
  },
});

export default withStyles(styles)(withRouter(GameList));