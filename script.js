function wikiSearch(){
            var extension;
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+ $("#input").val() +"&callback=JSON_CALLBACK%27;",
                jsonp: "callback", 
                dataType: 'jsonp',
                // data: { 
                //     action: "query", 
                //     list: "search", 
                //     srsearch: $('#input').val(), 
                //     format: "json", 
                //     prop: "extracts"
                // },
                xhrFields: { withCredentials: true },
                success: function(response) { 
                    console.log(response.query.pages); 
                    var obj = response.query.pages;
                    var html = "";
                    $.each(obj, function(key, value){
                        html +=
                        '<article class="article" onclick="goToWiki(' + value.pageid + ');">' +
                        '<h1>' + value.title + '</h1>' +
                        '<p>' + value.extract + '</p>' +
                        '</article>' 
                        
                    });
                    $(".container").html(html);
                }
            });
        }
        
        function goToWiki(pageId){
            console.log("wiki");
            window.open('https://en.wikipedia.org/?curid=' + pageId);
        }