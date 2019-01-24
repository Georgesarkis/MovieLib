<template>
    <div class="text-center">
        <div id="input-form">
            <fieldset>
                <legend>Movie information</legend>
                <!--TODO: add form action -->
                <form>
                  <div class=" row">
                              <div class="col-sm-4">
                                <label for="releaseyear">Release year:</label>
                              </div>
                              <div class="col-sm-4">
                              </div>
                              <div class="col-sm-4">
                                <input v-model="releaseYear" id="releaseyear" type="text" name="releaseyear" style="width:100%">
                              </div>
                  </div>   
                  <hr>
                  <div class=" row">         
                              <div class="col-sm-4">
                                <label for="movietitle">Movie title:</label>
                              </div>
                              <div class="col-sm-4">
                              </div>
                              <div class="col-sm-4">
                                <input v-model="movieTitle" id="movietitle" type="text" name="movietitle" style="width:100%">
                              </div>
                  </div>
                  <hr> 
                  <div class=" row">         
                            <div class="col-sm-4">
                            <label for="director">Director:</label>
                            </div>
                            <div class="col-sm-4">
                              </div>
                            <div class="col-sm-4">
                            <input v-model="director" id="director" type="text" name="director" style="width:100%">
                            </div>
                  </div>
                  <hr>    
                  <div class=" row">         
                            <div class="col-sm-4">
                            <label for="trailer">Trailer:</label>
                            </div>
                            <div class="col-sm-4">
                              </div>
                            <div class="col-sm-4">
                            <input v-model="trailer" id="trailer" type="text" name="trailer" style="width:100%">
                            </div>
                  </div>
                  <hr>          
                  <div class=" row">         
                            <div class="col-sm-4">
                            <label for="poster">MainPoster:</label>
                            </div>
                            <div class="col-sm-4">
                              </div>
                            <div class="col-sm-4">
                            <input v-model="poster" id="poster" type="text" name="mainposter" style="width:100%">
                            </div>
                  </div>
                  <hr>          
                  <div class=" row">         
                            <div class="col-sm-4">
                            <label for="actors">MainActors:</label>
                            </div>
                            <div class="col-sm-4">
                              </div>
                            <div class="col-sm-4">
                            <input v-model="actors" id="actors" type="text" name="mainactors" style="width:100%">
                            </div>
                  </div>
                  <hr>          
                  <div class=" row">         
                            <div class="col-sm-4">
                            <label for="plot">Plot description:</label>
                            </div>
                            <div class="col-sm-4">
                              </div>
                            <div class="col-sm-4">
                            <textarea style="width:100%" v-model="plot" id="plot" cols="60" rows="4" type="text" name="plotdescription" >
                            </textarea><br>
                            </div> 
                  </div> 
                              
                  <div class="row">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-4">
                              <router-link to="/admin"> <button @click="createMovie">Submit</button></router-link> 
                            </div>
                            <div class="col-sm-4">
                            </div>
                  </div> 
                </form>
            </fieldset>
        </div>
    </div>
</template>

<script>
var axios = require("axios");

module.exports = {
  name: "CreateMovie",
  data() {
    return {
      releaseYear: "1999",
      movieTitle: "Fight Club",
      plot:
        "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
      director: "David Fincher",
      trailer:
        "https://www.imdb.com/video/imdb/vi781228825?playlistId=tt0137523&ref_=tt_ov_vi",
      poster:
        "https://www.imdb.com/title/tt0137523/mediaviewer/rm590641920?ref_=tt_ov_i",
      actors: ["Brad Pitt", "Edward Norton", "Meat Loaf"]
    };
  },

  methods: {
    createMovie: function() {
      axios
        .post("/api/admin/movies", {
          ReleaseYear: this.releaseYear,
          MovieTitle: this.movieTitle,
          PlotDescription: this.plot,
          Director: this.director,
          Trailer: this.trailer,
          MainPoster: this.poster,
          MainActors: this.actors
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>
