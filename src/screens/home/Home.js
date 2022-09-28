import React, { Fragment } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
});

function Home(props) {
    const { classes } = props;
    const [upcomingMoviesList, setUpcomingMoviesList] = React.useState([]);
    const [releasedMoviesList, setReleasedMoviesList] = React.useState([]);

    async function loadUpcomingMovies()
    {
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

    React.useEffect(() => {
        loadUpcomingMovies();
        loadReleasedMovies();
    }, []);

    
    return (
        <Fragment>
            <Header />
            <div className="upcoming-movies-header">Upcoming Movies</div>
            <div className={classes.root}>
                <GridList className={classes.gridList} cellHeight={250} cols={6}>
                    {upcomingMoviesList.map(tile => (
                        <GridListTile key={tile.id}>
                            <img src={tile.poster_url} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="released-movies-parent-container">
                <div className="flex-div" style={{width: '76%'}}>
                    <div className={classes.root}>
                        <GridList cellHeight={350} cols={4} className={classes.gridListGrid}>
                            {releasedMoviesList.map(tile => (
                                <GridListTile key={tile.id}>
                                    <img src={tile.poster_url} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>Release Date: {tile.release_date}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
                <div className="flex-div" style={{ width: '24%' }}>
                    
                </div>
            </div>
        </Fragment>
        
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);