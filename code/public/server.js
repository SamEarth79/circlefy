(function() {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    var userResponse;
    const isMobile = window.matchMedia('(max-width: 800px)')

    const tagsbtn = document.getElementById("tags");
    tagsbtn.addEventListener("click", toggleTags);
    function toggleTags(){
      const t1 = document.querySelector(".tags-1");
      const t2 = document.querySelector(".tags-2");
      t1.classList.toggle("hide");
      t2.classList.toggle("hide");
    }

    colorPicker = document.getElementById("bg-color");
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", watchColorPicker, false);

    function updateFirst(event) {
      let container = document.getElementById("artists-profile");
      let containerWidth = isMobile.matches ? "30" : "34";
      let containerHeight = isMobile.matches ? "30" : "34";

      if (container) {
        container.style ="background-color :"+event.target.value+";"
                      +"width: "+containerWidth+"em;"+
                      "height: "+containerHeight+"em;";   
      }
    }

    function watchColorPicker(event) {
      let containerWidth = isMobile.matches ? "30" : "34";
      let containerHeight = isMobile.matches ? "30" : "34";

      let container = document.getElementById("artists-profile");
      container.style ="background-color :"+event.target.value+";"
                      +"width: "+containerWidth+"em;"+
                      "height: "+containerHeight+"em;";   
    }

    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    // var userProfileSource = document.getElementById('user-profile-template').innerHTML,
    //     userProfileTemplate = Handlebars.compile(userProfileSource),
    //     userProfilePlaceholder = document.getElementById('user-profile');
    
    var artistsProfileSource = document.getElementById('artists-profile-template').innerHTML,
        artistsProfileTemplate = Handlebars.compile(artistsProfileSource),
        artistsProfilePlaceholder = document.getElementById('artists-profile');

    function hiddenClone(element) {
      // Create clone of element
      console.log(element);
      const clone = element.cloneNode(true);
      console.log(clone);
  
      // Position element relatively within the
      // body but still out of the viewport
      // var style = clone.style;
      // style.position = "relative";
      // style.top = window.innerHeight + "px";
      // style.left = 0;
      // Append clone to body and return the clone
      document.body.appendChild(clone);
      return clone;
    }

    function downloadImg() {
      var fileName="circlefy";
      // var offScreen = document.querySelector(".artistContainer");
      var offScreen = document.getElementById("artists-profile");
      window.scrollTo(0, 0);
      // Use clone with htm2canvas and delete clone
      html2canvas(offScreen, {
         useCors: true
        }).then((canvas) => {
        document.body.appendChild(canvas)
        var dataURL = canvas.toDataURL("image/png", 1.0);
        // console.log(dataURL);
        document.body.removeChild(clone);
        var link = document.createElement("a");
        link.href = dataURL;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    function downloadImgOwn(fileName){
      const imgHTML = document.querySelector("#artists-profile");
      console.log(imgHTML);
      html2canvas(imgHTML, {
          useCORS: true,
      }).then(canvas => {
          document.body.appendChild(canvas)
          var dataURL = canvas.toDataURL("image/jpeg");
          console.log(dataURL)
          var link = document.createElement("a");
          link.href = dataURL;
          link.download = `${fileName}.jpeg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
    }


    function setCircleStyles(artistsProfile, response){

      let centre, circle1, circle2;
      const centre_size = isMobile.matches ? 6 : 8;

      const circle1_count = 8;
      const circle1_size = isMobile.matches ? 65 : 80;
      const circle1_radius = isMobile.matches ? "6.5em" : "8em";
      let circle1_rot = 290;
      const circle1_angle = 360/circle1_count;
      
      const circle2_count = isMobile.matches ? 16 : 18;
      const circle2_size = isMobile.matches ? 60 : 70;
      const circle2_radius = isMobile.matches ? "11em" : "13.5em";
      let circle2_rot = 100;
      const circle2_angle = 360/circle2_count;
      
      //Another instance of the below code is in UpdateFirst and WatchColorPicker functions 
      let containerWidth = isMobile.matches ? "28" : "34";
      let containerHeight = isMobile.matches ? "28" : "34";

      centre = document.querySelector(".centre-image");
      centre.style = 
      "margin: "+centre_size/(-2)+"em;"
      +"width: "+centre_size+"em;"
      +"height: "+centre_size+"em;"

      // console.log(artistsProfile.children);
      for(let i=0; i<artistsProfile.children[0].children.length; i++)
      {
        if(artistsProfile.children[0].children[i].classList[0]==="circle-1")
        {
          circle1 = artistsProfile.children[0].children[i];
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
        // console.log(response["items"][0]["images"][0]["url"]);
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

      let circle1_tags;

      for(let i=0; i<artistsProfile.children[0].children.length; i++)
      {
        if(artistsProfile.children[0].children[i].classList[0]==="tags-1")
        {
          circle1_tags = artistsProfile.children[0].children[i];
          break;
        }
      }
      
      for(let i=0;i<circle1_count;i++)
      {
        let li = document.createElement("li");
        li.innerHTML = response["items"][i]["name"];
        circle1_tags.appendChild(li);
      }
      
      tag1_rot=290;
      tag_size = isMobile.matches ? "10" : "12";
      tag1_radius=isMobile.matches ? "10em" : "11em";
      for(let i=0; i<circle1_tags.children.length; i++)
      {
        let tag = circle1_tags.children[i];
        console.log(tag);
        tag.style = "transform: rotate(calc("+ tag1_rot +" * 1deg)) translate("+ tag1_radius +") rotate(calc("+ tag1_rot +" * -1deg));"
        +"font-size: "+ tag_size +"px;"
        // +"height: "+ 3+"em;"
        +"margin-left: -"+ tag_size+"px;"
        +"margin-top: "+ tag_size*1.5+"px;"
        ;
        tag1_rot+=circle1_angle;
      }


      for(let i=0; i<artistsProfile.children[0].children.length; i++)
      {
        if(artistsProfile.children[0].children[i].classList[0]==="circle-2")
        {
          circle2 = artistsProfile.children[0].children[i];
          break;
        }
      }

      for(let i=circle1_count;i<circle2_count+8;i++)
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
        +"margin: "+ circle2_size/(-2) +"px;"
        ;
        circle2_rot+=circle2_angle;
      }

      let circle2_tags;

      for(let i=0; i<artistsProfile.children[0].children.length; i++)
      {
        if(artistsProfile.children[0].children[i].classList[0]==="tags-2")
        {
          circle2_tags = artistsProfile.children[0].children[i];
          break;
        }
      }
      
      for(let i=circle1_count;i<circle2_count+8;i++)
      {
        let li = document.createElement("li");
        li.innerHTML = response["items"][i]["name"];
        circle2_tags.appendChild(li);
      }
      
      tag2_rot=100;
      tag2_radius=isMobile.matches ? "17em" : "17.5em";
      for(let i=0; i<circle2_tags.children.length; i++)
      {
        let tag = circle2_tags.children[i];
        console.log(tag);
        tag.style = "transform: rotate(calc("+ tag2_rot +" * 1deg)) translate("+ tag2_radius +") rotate(calc("+ tag2_rot +" * -1deg));"
        +"font-size: "+ tag_size +"px;"
        // +"height: "+ 3+"em;"
        +"margin-left: -"+ tag_size+"px;"
        +"margin-top: "+ tag_size*1.5+"px;"
        ;
        tag2_rot+=circle2_angle;
      }



      artistsProfile.style = 
        "width: "+containerWidth+"em;"+
        "height: "+containerHeight+"em;"   
      
    }

    function getArtists() {
      $.ajax({
        url: `https://api.spotify.com/v1/me/top/artists?limit=30&time_range=long_term`,
        headers: {
          Authorization: "Bearer " + access_token,
        },
        success: function (response) {
          let allResponse = {
            artistResponse: response,
            userResponse: userResponse
          };
          artistsProfilePlaceholder.innerHTML = artistsProfileTemplate(allResponse);
          $('#login').hide();
          $('#loggedin').show();

          const artistsProfile = document.getElementById("artists-profile");
          // console.log(artistsProfile);
          setCircleStyles(artistsProfile, response);

          document.getElementById("download").addEventListener("click", ()=> downloadImgOwn("circlefy"));

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
              userResponse=response;
              // userProfilePlaceholder.innerHTML = userProfileTemplate(response);
              
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