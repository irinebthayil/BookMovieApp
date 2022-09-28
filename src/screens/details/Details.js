import React, { Fragment } from "react";
import Header from "../../common/header/Header";
import Typography from '@material-ui/core/Typography';
import "./Details.css";
import { withStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridListGrid: {
        width: '100%'
    },
    backToHomeBtn:
    {
        marginLeft: 24,
        marginTop: 8,
        marginBottom: 0,
        height: 24,
    },
    textSpacing: {
        marginTop: 16,
    },
    textSpacing2: {
        marginTop: 16,
        marginBottom: 16,
    },

});

function Details(props) {
    const { classes } = props;
    const id = "52975022-a235-11e8-9077-720006ceb890";
    const backtohomeText = "< Back to Home"
    const [movieDetails, setMovieDetails] = React.useState({});
    const [artistDetails, setArtistDetails] = React.useState([]);

    async function loadMovieDetails() {
        let url = '/api/v1/movies/' + id;
        try {
            const rawResponse = await fetch(url, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                setMovieDetails(result);
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    async function loadMovieArtists() {
        let url = '/api/v1/movies/' + id + "/artists";
        try {
            const rawResponse = await fetch(url, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                setArtistDetails(result.artists);
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
        loadMovieDetails();
        loadMovieArtists();
    }, []);


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    function onStarClicked(e)
    {
        e.target.style.color = "yellow";
    }


    return (
        <Fragment>
            <Header source="detailsPage" />
            <Link to="/"><Typography id="backTohome" className={classes.backToHomeBtn} >{backtohomeText}</Typography></Link>
            <div className="main-div-container">
                <div className="container1">
                    <img src={movieDetails.poster_url}></img>
                </div>
                <div className="container2">
                    <Typography variant="headline" component="h2">
                        {movieDetails.title}
                    </Typography>
                    <Typography>
                        <strong>Genre: </strong>{movieDetails.genres}
                    </Typography>
                    <Typography>
                        <strong>Duration: </strong>{movieDetails.duration}
                    </Typography>
                    <Typography>
                        <strong>Release Date: </strong>{new Date(JSON.stringify(movieDetails.release_date)).toDateString()}
                    </Typography>
                    <Typography>
                        <strong>Rating: </strong>{movieDetails.rating}
                    </Typography>
                    <Typography className={classes.textSpacing}>
                        <strong>Plot: </strong><a href={movieDetails.wiki_url}>(Wiki url)</a>   {movieDetails.storyline}
                    </Typography>
                    <Typography className={classes.textSpacing}>
                        <strong>Trailer: </strong>
                    </Typography><br></br>
                    <YouTube videoId={movieDetails.trailer_url} opts={opts} />
                </div>
                <div className="container3">
                    <Typography>
                        <strong>Rate this movie: </strong>
                    </Typography>

                    <Typography className={classes.textSpacing2}>
                        <strong>Artists: </strong><br></br>
                        <StarBorderOutlined className="star" onClick={onStarClicked} />
                        <StarBorderOutlined className="star" onClick={onStarClicked} />
                        <StarBorderOutlined className="star" onClick={onStarClicked} />
                        <StarBorderOutlined className="star" onClick={onStarClicked} />
                        <StarBorderOutlined className="star" onClick={onStarClicked} />
                    </Typography>

                    <div className={classes.root}>
                        <GridList cellHeight={250} cols={2} className={classes.gridListGrid}>
                            {artistDetails.map(tile => (
                                <GridListTile key={tile.id} className={classes.tile}>
                                    <img src={tile.profile_url} alt={tile.first_name} />
                                    <GridListTileBar
                                        title={tile.first_name + " " + tile.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withStyles(styles)(Details);