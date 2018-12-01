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
  InputAdornment
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FilterIcon from "@material-ui/icons/Search"
import ApiService from "../../common/ApiService";

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
    const { classes, games } = this.props
    const noGames = !games || games.length === 0

    return (
      <Paper className={classes.root}>
        <div className={classes.header}>
          <Typography variant="headline">{this.props.title}</Typography>
          <Button onClick={this.props.openDialog}><AddIcon /> new room</Button>
        </div>
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
            .map(game => (
              <ListItem
                key={game.ref}
                button
                onClick={() => this.onRoomClick(game.title)}
              >
                <ListItemText primary={game.title} />
              </ListItem>
            ))
          }
        </List>
        {noGames && <Typography>No games available</Typography>}
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
  games: global.IGameRef[],
  openDialog: () => void,
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    margin: "20px auto",
    padding: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  }
});

export default withStyles(styles)(withRouter(GameList));