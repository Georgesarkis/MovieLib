<!-- ================================================== -->
<!-- TEMPLATE -->
<!-- ================================================== -->

<template>
  <div class="container">
    <h1 align="center">{{ movieTitle }}</h1>
	  <!-- Movie Details -->
      <div class= "row">
        <div  class="col-md-8"> 
        <table class="table"  style=" width=auto height=auto">
        <tbody>
          <tr>
            <td align="left"><strong>Movie title:</strong></td>
            <td align="left">{{ movieTitle }}</td>
          </tr>
          <tr>
            <td align="left"><strong>Release Year:</strong></td>
            <td align="left">({{ releaseYear }})</td>
          </tr>
          <tr>
            <td align="left"><strong>Director:</strong></td>
            <td align="left">{{ director }}</td>
          </tr>
          <tr>
            <td align="left"><strong>Main actors:</strong></td>
            <td align="left">{{ mainActors }}</td>
          </tr>
        </tbody>
        </table>
        </div>
        <div  class="col-md-4 col-sm-12"> 
        <img 
            v-bind:src="mainPoster"
            width="100%" 
            height="100%" />
        </div>
    </div>

      <hr>

        <!-- p id="rating">{{ rating }}</p --><br>
    <div class= "row">
      <div class="col-md-8" style="width=100% height=100%">
          <iframe width="480px" height="320px"
          v-bind:src="trailer">
          </iframe>
      </div>
      <div  class="col-md-4 col-sm-12" style="width=auto height=auto" >
          <p align="center">Plot description:</p>
          <p>{{ plot }}</p>
      </div> 
    </div>
    <!-- ADMIN SECTION -->
    <!-- TODO: Hide when route path does not contain admin -->
    <!--<div>
        <button @click="editMovie = true">Edit</button>
    </div><br>-->

    <!-- REVIEW LIST -->
    <hr>
    <div class="row">
        <button v-if="$route.name==='adminMovie'" @click="deleteAllReviews()">Delete all reviews</button>
        <div class="col-sm-12 text-center"  style="width=100% height=100%" >
          <h3>Reviews</h3>
          <!-- list of reviews -->
          <div class="col-sm-12 text-center"  style="width=100% height=100%" >
          <ul>
            
              <li v-for="review in reviews" v-bind:key="review._id" class="card">
                  <div v-if="editReview === review._id">
                      <label for="reviewRating">Rating:</label>
                      <input v-bind:placeholder="review.Rating" v-model="reviewRating" id="reviewRating" type="text" name="reviewRating"><br>
                      <label for="reviewText"></label><br>
                      <textarea v-bind:placeholder="review.reviewText" v-model="reviewText" id="reviewText" cols="40" rows="4" type="text" name="reviewText">
                      </textarea><br>
                      <button @click="updateReview(review)">Save</button>
                  </div>
                  <div v-else>
                      <button type="button" class="close" @click="deleteReview(review._id)">&times;</button>
                      <div>
                        <h6><strong>Posted by:</strong> {{ review.Username }}</h6>
                        <h6><strong>Rating:</strong> {{ review.Rating }}</h6>
                        <p>{{ review.ReviewText }}</p>
                      </div>
                      <button v-if="$route.name === 'visitorMovie'" @click="editReview = review._id" class="centered">Edit</button>
                  </div>
              </li>
          </ul>
          </div>
        </div>
    </div>

    <hr>
    <div v-if="$route.name === 'visitorMovie'" class="row">
      <div class="col-sm-12 text-center">
        <h3 style="text-align:center;">Create a review</h3>
        <label for="userName"><strong>Username:</strong></label><br>
        <input v-model="userName" id="userName" type="text" name="userName"><br>

        <label for="releaseyear"><strong>Rating:</strong></label><br>

        <span class="fa fa-star checked" id="star1" @click="add(this,1)"></span>
        <span class="fa fa-star" id="star2" @click="add(this,2)"></span>
        <span class="fa fa-star" id="star3" @click="add(this,3)"></span>
        <span class="fa fa-star" id="star4" @click="add(this,4)"></span>
        <span class="fa fa-star" id="star5" @click="add(this,5)"></span><br>
        <label for="Review"><strong>Review:</strong></label><br>
        <textarea style="width:100%"  v-model="Review" id="Review" cols="40" rows="5" type="text" name="Review"></textarea><br>
        
        <button @click="createReview()">Submit</button> 
      </div>
    </div>
</div>
</template>

<!-- ================================================== -->
<!-- SCRIPT -->
<!-- ================================================== -->

<script>
var axios = require('axios');
var count = 0;

module.exports = {
  name: "movieDetails",
  data() {
    return {
      releaseYear: 0,
      movieTitle: "",
      plot: "",
      director: "",
      trailer: "",
      mainPoster: "",
      mainActors: "",
      reviews: [],
      editReview: 0,
      reviewText: "",
      reviewRating: 0
    };
  },

  methods: {
        add:function(ths,sno){
            for (var i=2;i<=5;i++){
                var cur=document.getElementById("star"+i)
                cur.className="fa fa-star"
            }

            for (var i=1;i<=sno;i++){
                var cur=document.getElementById("star"+i)
                if(cur.className=="fa fa-star")
                {
                    cur.className="fa fa-star checked"
                }
            }
        },
        getMovie: function(){
            axios.get('/api/movies/' + this.$route.params.id) 
		    .then(response => {
                this.movieTitle = response.data.MovieTitle;
                this.releaseYear = response.data.ReleaseYear;
                this.plot = response.data.PlotDescription;
                this.director = response.data.Director;
                this.trailer = response.data.Trailer;
                this.mainPoster = response.data.MainPoster;
                this.mainActors = response.data.MainActors;
                console.log(response.data);
		    })
		    .catch(function(error) {
			    console.log(error);
		    });
        },
        createReview: function() {
          for (var i=1;i<=5;i++){
                var cur=document.getElementById("star"+i)
                if(cur.className=="fa fa-star checked"){
                    count ++;
                }
            }
        axios.post("/api/movies/"+ this.$route.params.id + "/review", {
          Rating: count,
          ReviewText: this.Review,
          Movie: this.$route.params.id,
          Username: this.userName
        })
        .then(response => {
          console.log(response);
          this.getMovieReviews();
        })
        .catch(function(error) {
          console.log(error.response);
        });
        count = 0;
        },
        getMovieReviews: function() {
        axios
        .get("/api/movies/" + this.$route.params.id + "/reviews")
        .then(response => {
          if (response.status !== 200) {
            console.log("Wrong status code: " + response.status);
          }
          this.reviews.length = 0;
          for (var i = 0; i < response.data.data.length; i++) {
            this.reviews.push(response.data.data[i]);
          }
        })
        .catch(function(error) {
          this.reviews.length = 0;
          console.log(error);
        })
        .then(function() {});
    },
    updateReview: function(review) {
      console.log("Editing review with ID " + review._id);
      console.log(this.editReview);
      if (this.reviewRating > 5) {
       this.reviewRating = 5;
     } else if (this.reviewRating < 1) {
       this.reviewRating = 1;
     }
      axios
        .patch("api/reviews/" + review._id, {
          Rating: this.reviewRating,
          ReviewText: this.reviewText
        })
        .then(response => {
          for (var i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i]._id === review._id) {
              this.$set(this.reviews[i], "Rating", this.reviewRating);
              this.$set(this.reviews[i], "ReviewText", this.reviewText);
              break;
            }
          }
          this.editReview = 0;
          console.log(response);
          console.log("POST: " + this.editReview);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    deleteReview: function(reviewID) {
      console.log("Deleting review with ID " + reviewID);
      axios
        .delete("/api/reviews/" + reviewID)
        .then(response => {
          var localIndex = -1;
          for (var i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i]._id === reviewID) {
              localIndex = i;
              i = this.reviews.length;
            }
          }
          if (localIndex !== -1) {
            this.reviews.splice(localIndex, 1);
          }
          console.log("Success: " + response.status);
        })
        .catch(error => {
          console.log(error);
        })
        .then(function() {});
    },
  deleteAllReviews: function () {
    axios
      .delete('/api/admin/movies/' + this.$route.params.id + '/reviews')
      .then(response => {
        //console.log("Success: " + response.status);
        this.getMovieReviews(); 
      })
      .catch(error => {
        console.log(error);
      })
      .then(function() {});
  }
  },
  mounted() {
    this.getMovie();
    this.getMovieReviews();
  }
};

</script>

<style>
.checked {
    color: orange;
}
</style>