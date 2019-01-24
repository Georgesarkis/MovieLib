<!-- ownerHome.vue -->
<!-- This is a really basic (static) Vue component.
We just demonstrate how data (variables in the Vue instance) can be bound to HTML elements -->
<template>
  <div>
<div class="container">
  <div class="row">

            <div v-for="MovieSchema in MovieSchemas" v-bind:key="MovieSchema._id" class="col-md-3 col-sm-6 col-xs-12">
                <div class="thumbnail">
                <div v-if="$route.name === 'admin'">
                    <router-link :to="{ name: 'adminMovie', params: {id: MovieSchema._id } }">
                        <img :src="MovieSchema.MainPoster" alt="movie poster"  style="width:100%" >
                        <h4 style="font-size: 100%; text-align: center;"> {{MovieSchema.MovieTitle}} </h4>     
                        <h3 style="font-size: 70%; text-align: center;">({{MovieSchema.ReleaseYear}}) </h3>   
                    </router-link>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'visitorMovie', params: {id: MovieSchema._id } }">
                        <img :src="MovieSchema.MainPoster" alt="movie poster"  style="width:100%" >
                        <h4 style="font-size: 100%; text-align: center;"> {{MovieSchema.MovieTitle}} </h4>     
                        <h3 style="font-size: 70%; text-align: center;">({{MovieSchema.ReleaseYear}}) </h3>   
                    </router-link>
                </div>
                <div>  
                    <div v-if="$route.name === 'admin'">
                        <button type="button" class="close" @click="deleteMovie(MovieSchema._id)">&times;</button>
                    </div>
                </div>
                <div v-if="$route.name === 'admin'">
                    <div v-if="editMovie === MovieSchema._id">
                         <div class="text-center">
                        <label style="width:100%" for="releaseyear">Release year:</label><br>
                        <input style="width:100%" v-bind:placeholder="MovieSchema.ReleaseYear" v-model="releaseYear" id="releaseyear" type="text" name="releaseyear" ><br>
                        <label style="width:100%" for="movietitle">Movie title:</label><br>
                        <input style="width:100%" v-model="movieTitle" id="movietitle" type="text" name="movietitle"><br>
                        <label style="width:100%" for="plot">Plot description:</label><br>
                        <textarea style="width:100%" v-model="plot" id="plot" cols="40" rows="4" type="text" name="plotdescription">
                        </textarea><br>
                        <label style="width:100%"  for="director">Director:</label><br>
                        <input style="width:100%" v-model="director" id="director" type="text" name="director"><br>
                        <label style="width:100%"  for="trailer">Trailer:</label><br>
                        <input style="width:100%" v-model="trailer" id="trailer" type="text" name="trailer"><br>
                        <label style="width:100%" for="poster">MainPoster:</label><br>
                        <input style="width:100%" v-model="poster" id="poster" type="text" name="mainposter"><br>
                        <label style="width:100%" for="actors">MainActors:</label><br>
                        <input style="width:100%" v-model="actors" id="actors" type="text" name="mainactors"><br><br>
                        <button @click="updateMovie(MovieSchema)">Save</button>
                        </div>
                    </div>
                    <div v-else>
                        <button @click="editMovie = MovieSchema._id">Edit</button>
                    </div>
                </div>
                </div>
            </div>
    </div>
    <div class="row ">
        <div class = "col-sm-5">
        </div>
        <div v-if="$route.name === 'admin'" class = "col-sm-2">
            <router-link to="/admin/createMovie"> <button>Create Movie</button></router-link> 
        </div>
        <div class = "col-sm-5">
        </div>
    </div>   
  </div>
</div>
</template>

<script>
var axios = require('axios');

module.exports = {
  name:"Home",
 data () {
    return {
        MovieSchemas: [],
        editMovie: 0,
        releaseYear: "",
        movieTitle: "",
        plot: "",
        director: "",
        trailer: "",
        poster: "",
        actors: ""
    }
  },
  methods: {
      //Performs a GET request to /api/camels using AXIOS.
        getMovies: function () {
            axios.get('/api/movies/')
            .then(
                response => {
                    //This is only an example of how you can access the status code
                    if (response.status!==200) {
                        console.log("Wrong status code: " + response.status);
                    }
                    //If we get a response, empty the camels array and fill it with all camels from our endpoints
                    this.MovieSchemas.length = 0;
                    for (var i = 0; i < response.data.Movies.length; i++) {
                        this.MovieSchemas.push(response.data.Movies[i]);
                    }
            })
            .catch(error => {
                //In case of error, empty the camels array.
                this.MovieSchemas.length = 0;
                console.log(error);
            })
            .then(function () {
                //This code is always executed, independent of the request being successful or not.
            });
        }, 
        //Performs a DELETE request to the camel with the provided ID.
        deleteMovie: function (MovieID) {
            console.log("Deleting movie with ID " + MovieID);
            axios.delete('/api/admin/movies/'+MovieID)
            .then(
                response => {
                    //This code basically finds the camel under question in the array and deletes it (using splice)
                    var localIndex = -1;
                    for (var i=0; i < this.MovieSchemas.length; i++) {
                        if (this.MovieSchemas[i]._id === MovieID) {
                            localIndex = i;
                            i = this.MovieSchemas.length;
                        }
                    }
                    if (localIndex !== -1) {
                        //Vue reacts to splice. So removing the element here causes the DOM to update.
                        this.MovieSchemas.splice(localIndex, 1); 
                    }
                    console.log("Success: " + response.status);
            })
            .catch(error => {
                console.log(error);
            })
            .then(function () {
            });
        },
        // Performs a PATCH request to a movie with the provided ID.
        updateMovie: function(MovieSchema) {
            console.log("Editing movie with ID " + MovieSchema._id);
            console.log(this.editMovie);

            axios.patch("api/admin/movies/" + MovieSchema._id, {
                ReleaseYear: this.releaseYear,
                MovieTitle: this.movieTitle,
                PlotDescription: this.plot,
                Director: this.director,
                Trailer: this.trailer,
                MainPoster: this.poster,
                MainActors: this.actors
            })
            .then(response => {
                for (var i = 0; i < this.MovieSchemas.length; i++) {
                    if ( this.MovieSchemas[i]._id === MovieSchema._id) {
                        this.$set(this.MovieSchemas[i], 'ReleaseYear', this.releaseYear);
                        this.$set(this.MovieSchemas[i], 'MovieTitle', this.movieTitle);
                        this.$set(this.MovieSchemas[i], 'PlotDescription', this.plot);
                        this.$set(this.MovieSchemas[i], 'Director', this.director);
                        this.$set(this.MovieSchemas[i], 'Trailer', this.trailer);
                        this.$set(this.MovieSchemas[i], 'MainPoster', this.poster);
                        this.$set(this.MovieSchemas[i], 'MainActors', this.actors);
                        break;
                    }
                }
                this.editMovie = 0;
                console.log(response);
                console.log("POST: " + this.editMovie);
                this.getMovies();
            })
            .catch(function(error) {
                console.log(error.response);
            });
        }
    }, 
    //This basically means that once Vue is ready, we call getCamels() to fetch
    //all camels and populate our DOM tree with them.
    mounted () {
        this.getMovies();
    }
};
</script>