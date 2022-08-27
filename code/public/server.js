(function() {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');
    
    var artistsProfileSource = document.getElementById('artists-profile-template').innerHTML,
        artistsProfileTemplate = Handlebars.compile(artistsProfileSource),
        artistsProfilePlaceholder = document.getElementById('artists-profile');

    function setCircleStyles(artistsProfile, response){

      let circle1, circle2;
      const circle1_count = 8;
      const circle1_size = 80;
      const circle1_radius = "8em";
      let circle1_rot = 290;
      const circle1_angle = 360/circle1_count;
      
      const circle2_count = 18;
      const circle2_size = 70;
      const circle2_radius = "13.5em";
      let circle2_rot = 100;
      const circle2_angle = 360/circle2_count;
      
      // console.log(artistsProfile.children);
      for(let i=0; i<artistsProfile.children.length; i++)
      {
        if(artistsProfile.children[i].classList[0]==="circle-1")
        {
          circle1 = artistsProfile.children[i];
          break;
        }
      }
      
      for(let i=0;i<circle1_count;i++)
      {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.classList.add("media-object");
        img.classList.add("round");
        img.classList.add("circle-1-image");
        console.log(response["items"][0]["images"][0]["url"]);
        img.src=response["items"][i]["images"][0]["url"];
        li.appendChild(img);
        circle1.appendChild(li);
      }
      
      
      for(let i=0; i<circle1.children.length; i++)
      {
        let circle = circle1.children[i];
        circle.children[0].style = "transform: rotate(calc("+ circle1_rot +" * 1deg)) translate("+ circle1_radius +") rotate(calc("+ circle1_rot +" * -1deg));"
        +"width: "+ circle1_size+"px;"
        +"height: "+ circle1_size+"px;"
        +"margin: "+ circle1_size/(-2)+"px;"
        ;
        circle1_rot+=circle1_angle;
      }


      for(let i=0; i<artistsProfile.children.length; i++)
      {
        if(artistsProfile.children[i].classList[0]==="circle-2")
        {
          circle2 = artistsProfile.children[i];
          break;
        }
      }

      for(let i=8;i<circle2_count+8;i++)
      {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.classList.add("media-object");
        img.classList.add("round");
        img.classList.add("circle-2-image");
        // console.log(response["items"][0]["images"][0]["url"]);
        img.src=response["items"][i]["images"][0]["url"];
        li.appendChild(img);
        circle2.appendChild(li);
      }

        
      for(let i=0; i<circle2.children.length; i++)
      {
        let circle = circle2.children[i];
        circle.children[0].style = "transform: rotate(calc("+ circle2_rot +" * 1deg)) translate("+ circle2_radius +") rotate(calc("+ circle2_rot +" * -1deg));"
        +"width: "+ circle2_size+"px;"
        +"height: "+ circle2_size+"px;"
        +"margin: "+ circle2_size/(-2)+"px;"
        ;
        circle2_rot+=circle2_angle;
      }

      
        // console.log("");
    }

    function getArtists() {
      $.ajax({
        url: `https://api.spotify.com/v1/me/top/artists?limit=30&time_range=long_term`,
        headers: {
          Authorization: "Bearer " + access_token,
        },
        success: function (response) {
          artistsProfilePlaceholder.innerHTML = artistsProfileTemplate(response);
          $('#login').hide();
          $('#loggedin').show();

          const artistsProfile = document.getElementById("artists-profile");
          // console.log(artistsProfile);
          setCircleStyles(artistsProfile, response);

        }
      });
    }

    
    var params = getHashParams();
    
    var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;
    
    document.onload = getArtists();
    
    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {
        // render oauth info
        

        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              userProfilePlaceholder.innerHTML = userProfileTemplate(response);
              
              // let user = {
              //   username: "Spotify"
              // }
              // userProfilePlaceholder.innerHTML = userProfileTemplate(user);
              $('#login').hide();
              $('#loggedin').show();
            }
        });
      } else {
          // render initial screen
          $('#login').show();
          $('#loggedin').hide();
      }

      
      
    }
  })();