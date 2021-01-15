var main = document.getElementById('content');
main.style="width:100%; min-height:50vh;";
var mainSearch = document.getElementById('contentSearch');
mainSearch.style="width:100%; min-height:50vh; display:none;";
var otherPages = document.getElementById('otherPages');
otherPages.style = "width:100%; min-height:50vh; display:none;";
document.getElementById('pages').innerHTML = "<p class='pagen'>Page <span class='yellow'>1</span>";

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR&page=1')
    .then(res => {
        if(res.ok){
            res.json().then(data => {               
                console.log(data);
                var resultats = data.results;
                var length = resultats.length;
                function makeOnClickCallback(j) {  
                    return function() {  
                        var resultsM = data.results[j];
                        var titleM = resultsM.title;
                        var imgM = resultsM.poster_path;                       
                        if(resultsM.overview == ""){
                            var syno = "à venir...";
                        }else{
                            var syno = resultsM.overview;
                        }
                        var average = resultsM.vote_average;
                        var originalTitle = resultsM.original_title;
                        var date = resultsM.release_date;
                        var id = resultsM.id;
                        modals.innerHTML = "<a id='close'><i class='bx bxs-x-square'></i></a><h2 id='titleLinks'>"+titleM+"</h2><img class='imgViews' src='https://image.tmdb.org/t/p/w500"+imgM+"'><p class='p'>Titre Original : "+originalTitle+" | Date de sortie : "+date+"</p><p class='p'>Notes : <span id='yellow'>"+average+"</span>/10</p><p class='syno'>"+syno+"</p><i id='seeMore' class='pos bx bxs-chevron-right-circle arr'></i>";
                        document.getElementById('modals').classList.add('show');
                        var close = document.getElementById('close');
                        close.addEventListener('click', function(){
                            document.getElementById('modals').classList.remove('show');
                            document.getElementById('credits').classList.remove('show');
                        })
                        
                        document.getElementById('seeMore').addEventListener('click', function() {
                            document.getElementById('seeMore').classList.add('none');
                            close.classList.add('none');
                            
                            
                           
                            var credits = document.getElementById('credits');
                            credits.classList.add('show');
                            fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR')
                            .then(res => {
                                if(res.ok){
                                    res.json().then(data => {
                                        console.log(data)
                                        
                                            var resultsC = data.cast[0];
                                            var resultsD = data.cast[1];
                                            var resultsE = data.cast[2];
                                            var resultsF = data.cast[3];
                                            var resultsG = data.cast[4];
                                            if(resultsC.profile_path == null){
                                                var imgProfil = "public/img/noImage.png";
                                            }else{
                                                var imgProfil = "https://image.tmdb.org/t/p/w92"+resultsC.profile_path;
                                                var nameA = resultsC.name;
                                            }
                                            if(resultsD.profile_path == null){
                                                var imgProfil2 = "public/img/noImage.png";
                                            }else{
                                                var imgProfil2 = "https://image.tmdb.org/t/p/w92"+resultsD.profile_path;
                                                var nameA2 = resultsD.name;
                                            }
                                            if(resultsE.profile_path == null){
                                                var imgProfil3 = "public/img/noImage.png";
                                            }else{
                                                var imgProfil3 = "https://image.tmdb.org/t/p/w92"+resultsE.profile_path;
                                                var nameA3 = resultsE.name;
                                            }
                                            if(resultsF.profile_path == null){
                                                var imgProfil4 = "public/img/noImage.png";
                                            }else{
                                                var imgProfil4 = "https://image.tmdb.org/t/p/w92"+resultsF.profile_path;
                                                var nameA4 = resultsF.name;
                                            }                              

                                            fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=en-US')
                                            .then(res => {
                                                if(res.ok){
                                                    res.json().then(data => {
                                                        console.log(data)
                                                        var resu = data.results;
                                                        var resultsV = data.results[0];                                    
                                                        if(resu.length == 0){
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }else{
                                                            var video = resultsV.key;
                                                            console.log(video)
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                        
                                                        
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }
                                                        
                                                        
                                                        
                                                    })
                                                }else{
                                                    console.log('Erreur');
                                                }
                                            })                                           
                                            
                                 
                                    })
                                }else{
                                    console.log('Erreur');
                                }
                            })
                        
                                    
                        }) 
                       return false;
                    };  
                 } 
                for(var i = 0; i < length; i++){
                    var results = data.results[i];
                    if(results.poster_path == null){
                        var img = "public/img/noImage.png";
                    }else{
                        var img = "https://image.tmdb.org/t/p/w500"+results.poster_path;
                    }                 
                    var films = document.createElement('div');
                    films.id = 'film'+[i];
                    films.className = "col-12 col-md-6 col-lg-4";
                    films.innerHTML = "<img class='imgFilm' src='"+img+"'>"
                    main.appendChild(films);
                    var modals = document.getElementById('modals');                                                                                              
                }
                var j;
                for(var j = 0; j < length; j++){                   
                    document.getElementById('film'+[j]).onclick = makeOnClickCallback(j);                                   
                }                  
            })
        }else{
            console.log('Erreur');
        }
    })


    var btn = document.getElementById('submit');
    btn.addEventListener('click', function(e){
        e.preventDefault();
        document.getElementById('h1').classList.add('none');
        main.classList.add('none');
        main.innerHTML = "";
        document.getElementById('btnA2').classList.add('opaci0');
        document.getElementById('btnA1').classList.add('opaci0');
        otherPages.classList.add('none');
        otherPages.innerHTML = "";
        mainSearch.classList.add('block');
        var searchF = document.getElementById('search');
        var search = searchF.value;
        document.getElementById('h1Search').classList.add('block2');
        document.getElementById('h1Search').innerHTML = "Résultats pour : <span>"+search+"</span> <a id='closeSearch'><i class='bx bxs-x-square'></i></a>";
        searchF.classList.add('none');
        document.getElementById('left').classList.add('none');
        document.getElementById('right').classList.add('none');
        document.getElementById('pages').classList.add('none');
        btn.classList.add('none');
        document.getElementById('bigH1').classList.add('none');
        document.getElementById('banner').classList.add('none');
        document.getElementById('closeSearch').addEventListener('click', function() {
            window.location.reload();
        })  
    fetch('https://api.themoviedb.org/3/search/movie?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR&query='+search+'&page=1&include_adult=false')
    .then(res => {
        if(res.ok){
            res.json().then(data => {
                console.log(data)
                var resultats = data.results;
                var length = resultats.length;
                function makeOnClickCallback(j) {  
                    return function() {  
                        var resultsM = data.results[j];
                        var titleM = resultsM.title;
                        var imgM = resultsM.poster_path;                       
                        if(resultsM.overview == ""){
                            var syno = "à venir...";
                        }else{
                            var syno = resultsM.overview;
                        }
                        var average = resultsM.vote_average;
                        var originalTitle = resultsM.original_title;
                        var date = resultsM.release_date;
                        var id = resultsM.id;
                        modals.innerHTML = "<a id='close'><i class='bx bxs-x-square'></i></a><h2 id='titleLinks'>"+titleM+"</h2><img class='imgViews' src='https://image.tmdb.org/t/p/w500"+imgM+"'><p class='p'>Titre Original : "+originalTitle+" | Date de sortie : "+date+"</p><p class='p'>Notes : <span id='yellow'>"+average+"</span>/10</p><p class='syno'>"+syno+"</p><i id='seeMore' class='pos bx bxs-chevron-right-circle arr'></i>";
                        document.getElementById('modals').classList.add('show');
                        var close = document.getElementById('close');
                        close.addEventListener('click', function(){
                            document.getElementById('modals').classList.remove('show');
                            document.getElementById('credits').classList.remove('show');
                        })
                        document.getElementById('seeMore').addEventListener('click', function() {
                            document.getElementById('seeMore').classList.add('none');
                            close.classList.add('none');
                            
                            
                           
                            var credits = document.getElementById('credits');
                            credits.classList.add('show');
                            fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR')
                            .then(res => {
                                if(res.ok){
                                    res.json().then(data => {
                                        console.log(data)
                                        
                                            var resultsC = data.cast[0];
                                            var resultsD = data.cast[1];
                                            var resultsE = data.cast[2];
                                            var resultsF = data.cast[3];
                                            var resultsG = data.cast[4];                       
                                            if(resultsC.profile_path == null){
                                                var imgProfil = "public/img/noImage.png";
                                            }else{
                                                var imgProfil = "https://image.tmdb.org/t/p/w92"+resultsC.profile_path;
                                                var nameA = resultsC.name;
                                            }
                                            if(resultsD.profile_path == null){
                                                var imgProfil2 = "public/img/noImage.png";
                                            }else{
                                                var imgProfil2 = "https://image.tmdb.org/t/p/w92"+resultsD.profile_path;
                                                var nameA2 = resultsD.name;
                                            }
                                            if(resultsE.profile_path == null){
                                                var imgProfil3 = "public/img/noImage.png";
                                            }else{
                                                var imgProfil3 = "https://image.tmdb.org/t/p/w92"+resultsE.profile_path;
                                                var nameA3 = resultsE.name;
                                            }
                                            if(resultsF.profile_path == null){
                                                var imgProfil4 = "public/img/noImage.png";
                                            }else{
                                                var imgProfil4 = "https://image.tmdb.org/t/p/w92"+resultsF.profile_path;
                                                var nameA4 = resultsF.name;
                                            }
                                                                 
                                            fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=en-US')
                                            .then(res => {
                                                if(res.ok){
                                                    res.json().then(data => {
                                                        console.log(data)
                                                        var resu = data.results;
                                                        var resultsV = data.results[0];
                                                        if(resu.length == 0){
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'>";
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }else{
                                                            var video = resultsV.key;
                                                            console.log(video)
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                        
                                                        
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }
                                                        
                                                        
                                                    })
                                                }else{
                                                    console.log('Erreur');
                                                }
                                            })                                           
                                            
                                 
                                    })
                                }else{
                                    console.log('Erreur');
                                }
                            })
                        
                                    
                        })  
                       return false;
                    };  
                 } 
                for(var i = 0; i < length; i++){
                    var results = data.results[i];
                    if(results.poster_path == null){
                        var img = "public/img/noImage.png";
                    }else{
                        var img = "https://image.tmdb.org/t/p/w500"+results.poster_path;
                    }
                                     
                    var films = document.createElement('div');
                    films.id = 'film'+[i];
                    films.className = "col-12 col-md-6 col-lg-4";
                    films.innerHTML = "<img class='imgFilm' src='"+img+"'>";
                    mainSearch.appendChild(films);
                    var modals = document.getElementById('modals');                                                                                              
                }
                var j;
                for(var j = 0; j < length; j++){                   
                    document.getElementById('film'+[j]).onclick = makeOnClickCallback(j);                                   
                }                  
            })
        }else{
            console.log('Erreur');
        }
    })
    

   })
    var p = 1;
    document.getElementById('right').addEventListener('click', function() {
    p++;
    if(p > 500){

    }else if(p <= 500){
    window.scrollTo(0,0);   
    main.classList.add('none');
    main.innerHTML = "";
    document.getElementById('btnA2').classList.add('opaci0');
    document.getElementById('btnA1').classList.add('opaci0');
    otherPages.innerHTML = "";
    otherPages.classList.add('block');
    document.getElementById('bigH1').classList.add('none');
    document.getElementById('banner').classList.add('none');
    document.getElementById('pages').innerHTML = "<p class='pagen'>Page <span class='yellow'>"+p+"</span>";
fetch('https://api.themoviedb.org/3/movie/popular?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR&page='+p)
.then(res => {
    if(res.ok){
        res.json().then(data => {
            console.log(data)
            var resultats = data.results;
            var length = resultats.length;
            function makeOnClickCallback(j) {  
                return function() {  
                    var resultsM = data.results[j];
                    var titleM = resultsM.title;
                    var imgM = resultsM.poster_path;                       
                    if(resultsM.overview == ""){
                        var syno = "à venir...";
                    }else{
                        var syno = resultsM.overview;
                    }
                    var average = resultsM.vote_average;
                    var originalTitle = resultsM.original_title;
                    var date = resultsM.release_date;
                    var id = resultsM.id;
                    modals.innerHTML = "<a id='close'><i class='bx bxs-x-square'></i></a><h2 id='titleLinks'>"+titleM+"</h2><img class='imgViews' src='https://image.tmdb.org/t/p/w500"+imgM+"'><p class='p'>Titre Original : "+originalTitle+" | Date de sortie : "+date+"</p><p class='p'>Notes : <span id='yellow'>"+average+"</span>/10</p><p class='syno'>"+syno+"</p><i id='seeMore' class='pos bx bxs-chevron-right-circle arr'></i>";
                    document.getElementById('modals').classList.add('show');
                    var close = document.getElementById('close');
                    close.addEventListener('click', function(){
                        document.getElementById('modals').classList.remove('show');
                        document.getElementById('credits').classList.remove('show');
                    })
                    document.getElementById('seeMore').addEventListener('click', function() {
                        document.getElementById('seeMore').classList.add('none');
                        close.classList.add('none');
                        
                        
                       
                        var credits = document.getElementById('credits');
                        credits.classList.add('show');
                        fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR')
                        .then(res => {
                            if(res.ok){
                                res.json().then(data => {
                                    console.log(data)
                                    
                                        var resultsC = data.cast[0];
                                        var resultsD = data.cast[1];
                                        var resultsE = data.cast[2];
                                        var resultsF = data.cast[3];
                                        var resultsG = data.cast[4];                       
                                        if(resultsC.profile_path == null){
                                            var imgProfil = "public/img/noImage.png";
                                        }else{
                                            var imgProfil = "https://image.tmdb.org/t/p/w92"+resultsC.profile_path;
                                            var nameA = resultsC.name;
                                        }
                                        if(resultsD.profile_path == null){
                                            var imgProfil2 = "public/img/noImage.png";
                                        }else{
                                            var imgProfil2 = "https://image.tmdb.org/t/p/w92"+resultsD.profile_path;
                                            var nameA2 = resultsD.name;
                                        }
                                        if(resultsE.profile_path == null){
                                            var imgProfil3 = "public/img/noImage.png";
                                        }else{
                                            var imgProfil3 = "https://image.tmdb.org/t/p/w92"+resultsE.profile_path;
                                            var nameA3 = resultsE.name;
                                        }
                                        if(resultsF.profile_path == null){
                                            var imgProfil4 = "public/img/noImage.png";
                                        }else{
                                            var imgProfil4 = "https://image.tmdb.org/t/p/w92"+resultsF.profile_path;
                                            var nameA4 = resultsF.name;
                                        }
                                                            
                                        fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=en-US')
                                        .then(res => {
                                            if(res.ok){
                                                res.json().then(data => {
                                                    console.log(data)
                                                    
                                                        var resu = data.results;
                                                        var resultsV = data.results[0];
                                                        if(resu.length == 0){
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }else{
                                                            var video = resultsV.key;
                                                            console.log(video)
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                        
                                                        
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }
                                                    
                                                    
                                                })
                                            }else{
                                                console.log('Erreur');
                                            }
                                        })                                           
                                        
                             
                                })
                            }else{
                                console.log('Erreur');
                            }
                        })
                    
                                
                    })   
                   return false;
                };  
             } 
            for(var i = 0; i < length; i++){
                var results = data.results[i];
                if(results.poster_path == null){
                    var img = "public/img/noImage.png";
                }else{
                    var img = "https://image.tmdb.org/t/p/w500"+results.poster_path;
                }
                                 
                var films = document.createElement('div');
                films.id = 'film'+[i];
                films.className = "col-12 col-md-6 col-lg-4";
                films.innerHTML = "<img class='imgFilm' src='"+img+"'>";
                otherPages.appendChild(films);
                var modals = document.getElementById('modals');                                                                                              
            }
            var j;
            for(var j = 0; j < length; j++){                   
                document.getElementById('film'+[j]).onclick = makeOnClickCallback(j);                                   
            }                  
        })
    }else{
        console.log('Erreur');
    }
})
}
})

    document.getElementById('left').addEventListener('click', function() {
    p--;
    if(p < 1){
        
    }else if(p >= 1){   
    window.scrollTo(0,0); 
    main.classList.add('none');
    document.getElementById('btnA2').classList.add('opaci0');
    document.getElementById('btnA1').classList.add('opaci0');
    main.innerHTML = "";
    otherPages.innerHTML = "";
    otherPages.classList.add('block');
    document.getElementById('bigH1').classList.add('none');
    document.getElementById('banner').classList.add('none');
    document.getElementById('pages').innerHTML = "<p class='pagen'>Page <span class='yellow'>"+p+"</span>"; 
fetch('https://api.themoviedb.org/3/movie/popular?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR&page='+p)
.then(res => {
    if(res.ok){
        res.json().then(data => {
            console.log(data)
            var resultats = data.results;
            var length = resultats.length;
            function makeOnClickCallback(j) {  
                return function() {  
                    var resultsM = data.results[j];
                    var titleM = resultsM.title;
                    var imgM = resultsM.poster_path;                       
                    if(resultsM.overview == ""){
                        var syno = "à venir...";
                    }else{
                        var syno = resultsM.overview;
                    }
                    var average = resultsM.vote_average;
                    var originalTitle = resultsM.original_title;
                    var date = resultsM.release_date;
                    var id = resultsM.id;
                    modals.innerHTML = "<a id='close'><i class='bx bxs-x-square'></i></a><h2 id='titleLinks'>"+titleM+"</h2><img class='imgViews' src='https://image.tmdb.org/t/p/w500"+imgM+"'><p class='p'>Titre Original : "+originalTitle+" | Date de sortie : "+date+"</p><p class='p'>Notes : <span id='yellow'>"+average+"</span>/10</p><p class='syno'>"+syno+"</p><i id='seeMore' class='pos bx bxs-chevron-right-circle arr'></i>";
                    document.getElementById('modals').classList.add('show');
                    var close = document.getElementById('close');
                    close.addEventListener('click', function(){
                        document.getElementById('modals').classList.remove('show');
                        document.getElementById('credits').classList.remove('show');
                    })
                    document.getElementById('seeMore').addEventListener('click', function() {
                        document.getElementById('seeMore').classList.add('none');
                        close.classList.add('none');
                        
                        
                       
                        var credits = document.getElementById('credits');
                        credits.classList.add('show');
                        fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR')
                        .then(res => {
                            if(res.ok){
                                res.json().then(data => {
                                    console.log(data)
                                    
                                        var resultsC = data.cast[0];
                                        var resultsD = data.cast[1];
                                        var resultsE = data.cast[2];
                                        var resultsF = data.cast[3];
                                        var resultsG = data.cast[4];                       
                                        if(resultsC.profile_path == null){
                                            var imgProfil = "public/img/noImage.png";
                                        }else{
                                            var imgProfil = "https://image.tmdb.org/t/p/w92"+resultsC.profile_path;
                                            var nameA = resultsC.name;
                                        }
                                        if(resultsD.profile_path == null){
                                            var imgProfil2 = "public/img/noImage.png";
                                        }else{
                                            var imgProfil2 = "https://image.tmdb.org/t/p/w92"+resultsD.profile_path;
                                            var nameA2 = resultsD.name;
                                        }
                                        if(resultsE.profile_path == null){
                                            var imgProfil3 = "public/img/noImage.png";
                                        }else{
                                            var imgProfil3 = "https://image.tmdb.org/t/p/w92"+resultsE.profile_path;
                                            var nameA3 = resultsE.name;
                                        }
                                        if(resultsF.profile_path == null){
                                            var imgProfil4 = "public/img/noImage.png";
                                        }else{
                                            var imgProfil4 = "https://image.tmdb.org/t/p/w92"+resultsF.profile_path;
                                            var nameA4 = resultsF.name;
                                        }
                                                           
                                        fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=en-US')
                                        .then(res => {
                                            if(res.ok){
                                                res.json().then(data => {
                                                    console.log(data)
                                                    
                                                    var resu = data.results;
                                                        var resultsV = data.results[0];
                                                        if(resu.length == 0){
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }else{
                                                            var video = resultsV.key;
                                                            console.log(video)
                                                            document.getElementById('credits').innerHTML = "<a id='close2'><i class='bx bxs-x-square'></i></a><div id='video'><iframe width='560' height='315' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div id='actorImg'><div><img title='"+nameA+"' class='imgProfil' src='"+imgProfil+"'></div><div><img title='"+nameA2+"' class='imgProfil' src='"+imgProfil2+"'></div><div><img title='"+nameA3+"'class='imgProfil' src='"+imgProfil3+"'></div><div><img title='"+nameA4+"' class='imgProfil' src='"+imgProfil4+"'></div>";
                                                        
                                                        
                                                            function bye(){
                                                                document.getElementById('modals').classList.remove('show')
                                                            }
                                                            
                                                            document.getElementById('close2').addEventListener('click', function(){
                                                                document.getElementById('credits').innerHTML ="";
                                                                document.getElementById('credits').classList.remove('show');
                                                                setTimeout(bye, 120);
                                                            })
                                                        }
                                                    
                                                    
                                                })
                                            }else{
                                                console.log('Erreur');
                                            }
                                        })                                           
                                        
                             
                                })
                            }else{
                                console.log('Erreur');
                            }
                        })
                    
                                
                    })    
                   return false;
                };  
             } 
            for(var i = 0; i < length; i++){
                var results = data.results[i];
                if(results.poster_path == null){
                    var img = "public/img/noImage.png";
                }else{
                    var img = "https://image.tmdb.org/t/p/w500"+results.poster_path;
                }
                                 
                var films = document.createElement('div');
                films.id = 'film'+[i];
                films.className = "col-12 col-md-6 col-lg-4";
                films.innerHTML = "<img class='imgFilm' src='"+img+"'>";
                otherPages.appendChild(films);
                var modals = document.getElementById('modals');                                                                                              
            }
            var j;
            for(var j = 0; j < length; j++){                   
                document.getElementById('film'+[j]).onclick = makeOnClickCallback(j);                                   
            }                  
        })
    }else{
        console.log('Erreur');
    }
})
}

})


fetch('https://api.themoviedb.org/3/movie/popular?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=fr-FR&page=1')
    .then(res => {
        if(res.ok){
            res.json().then(data => {
                var ress = data.results;
                for(var i = 0; i < 8; i++){
                    var resu = ress[i];             
                    var imgh = resu.poster_path;
                    var idh = resu.id;
                    document.getElementById('s'+[i]).innerHTML="<img src='https://image.tmdb.org/t/p/w500"+imgh+"'>";
                    document.getElementById('s'+[i]).onclick = OnClickCallback(idh, [i]);                         
                }           
            })
        }else{
            console.log('Erreur');
        }
    })

    function OnClickCallback(idh, [i]) {  
        return function() { 
                        fetch('https://api.themoviedb.org/3/movie/'+idh+'/videos?api_key=cb1e59bbc3ac8432cca2befd0bf5d2da&language=en-US')
                        .then(res => {
                            if(res.ok){
                                res.json().then(data => {
                                    console.log(data)
                                    var resss = data.results[0];
                                    var trailer = resss.key;
                                    document.getElementById('s'+[i]).innerHTML="<iframe width='200' height='200' style='border:2px solid  rgb(243, 207, 2);border-radius: 5px 5px 5px 5px;' src='https://www.youtube.com/embed/"+trailer+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";

                                })
                            }else{
                                console.log('Erreur');
                            }
                        })

            return false;
                };  
             }
             document.getElementById('btnA2').addEventListener('click', function() {
                document.getElementById('box').classList.add('box2');
                document.getElementById('btnA1').classList.add('opaci');
                document.getElementById('btnA2').classList.add('opaci0');
             })
             document.getElementById('btnA1').addEventListener('click', function() {
                document.getElementById('box').classList.remove('box2');
                document.getElementById('btnA1').classList.remove('opaci');
                document.getElementById('btnA2').classList.remove('opaci0');
             })  

             