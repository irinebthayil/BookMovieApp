import React, { Fragment } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

// styles needed for grids, card and card component
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridListGrid: {
        width: '100%'
    },
    tile: {
        cursor: 'pointer',
    },
    cardRoot: {
        minWidth: 240,
    },
    cardContentElements: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,
    },
    title: {
        color: theme.palette.primary.light,
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,
    },

});

function Home(props) {
    const { classes } = props;
    const [upcomingMoviesList, setUpcomingMoviesList] = React.useState([]);
    const [releasedMoviesList, setReleasedMoviesList] = React.useState([]);
    const [genresList, setGenresList] = React.useState([]);
    const [artistsList, setArtistsList] = React.useState([]);

    // load list of upcoming movies, i.e, movies with status as PUBLISHED
    async function loadUpcomingMovies() {
        try {
            const rawResponse = await fetch('/api/v1/movies?status=PUBLISHED', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                setUpcomingMoviesList(result.movies)
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    // load list of released movies, i.e, movies with status as RELEASED
    async function loadReleasedMovies() {
        try {
            const rawResponse = await fetch('/api/v1/movies?status=RELEASED', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                setReleasedMoviesList(result.movies)
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    // load list of all genres to display in filters
    async function loadGenres() {
        try {
            const rawResponse = await fetch('/api/v1/genres', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                setGenresList(result.genres)
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    // load list of all artists to display in filters
    async function loadArtists() {
        try {
            const rawResponse = await fetch('/api/v1/artists', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                setArtistsList(result.artists)
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    React.useEffect(() => {
        loadUpcomingMovies();
        loadReleasedMovies();
        loadGenres();
        loadArtists();
    }, []);

    return (
        <Fragment>
            <Header />
            <div className="upcoming-movies-header">Upcoming Movies</div>

            {/* Horizontal Scrollable grid list to display upcoming movies*/}
            <div className={classes.root}>
                <GridList className={classes.gridList} cellHeight={250} cols={6}>
                    {upcomingMoviesList.map(tile => (
                        <GridListTile key={tile.id} className={classes.tile}>
                            <Link className={classes.link} to={"/movie/" + tile.id}>
                                <img src={tile.poster_url} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                />
                            </Link>
                        </GridListTile>

                    ))}
                </GridList>
            </div>

            {/* Grid to display released movies */}
            <div className="released-movies-parent-container">
                <div className="flex-div" style={{ width: '76%' }}>
                    <div className={classes.root}>
                        <GridList cellHeight={350} cols={4} className={classes.gridListGrid}>
                            {releasedMoviesList.map(tile => (
                                <GridListTile key={tile.id} className={classes.tile}>
                                    <Link className={classes.link} to={"/movie/" + tile.id}>
                                        <img src={tile.poster_url} alt={tile.title} />
                                        <GridListTileBar
                                            title={tile.title}
                                            subtitle={<span>Release Date: {tile.release_date}</span>}
                                        />
                                    </Link>
                                    
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>

                {/* div to display filters */}
                <div className="flex-div" style={{ width: '24%' }}>
                    <Card className={classes.cardRoot} variant="outlined">
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.title}>FIND MOVIES BY:</Typography>
                            <FormControl className={classes.cardContentElements}>
                                <InputLabel htmlFor="movie_name">Movie Name</InputLabel>
                                <Input id="movie_name" />
                            </FormControl>
                            <FormControl className={classes.cardContentElements}>
                                <InputLabel htmlFor="genres">Genres</InputLabel>
                                <Select
                                    id="genres"
                                    multiple
                                    value={[]}
                                    input={<Input />}
                                >
                                    {genresList.map((genreItem) => (
                                        <MenuItem key={genreItem.id} value={genreItem.genre}>
                                            <Checkbox />
                                            <ListItemText primary={genreItem.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.cardContentElements}>
                                <InputLabel htmlFor="artists">Artists</InputLabel>
                                <Select
                                    id="artists"
                                    multiple
                                    value={[]}
                                    input={<Input />}
                                >
                                    {artistsList.map((artist) => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.cardContentElements}>
                                <TextField
                                    id="release_date_start"
                                    label="Release Date Start"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    placeholder="dd-mm-yyyy"
                                />
                            </FormControl>
                            <FormControl className={classes.cardContentElements}>
                                <TextField
                                    id="release_date_end"
                                    label="Release Date End"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    placeholder="dd-mm-yyyy"
                                />
                            </FormControl>
                            <CardActions>
                                <Button className={classes.cardContentElements} id="applyFilterButton" variant="contained" color="primary">APPLY</Button>
                            </CardActions>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </Fragment>

    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);