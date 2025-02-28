function page_load(){
    
    const msgText = "# page2: page load"

    console.log(msgText.toUpperCase())

}


function btnSearch(){

    let msgText = "# page5: btnSearch" 
    console.log(msgText.toUpperCase());  
  

    const txtsearch = document.getElementById("txtsearch"); 
    const divdisplayinfo = document.getElementById("divdisplayinfo");
  

    if(txtsearch == null){
        msgText = "# txtsearch field not found"
        console.log(msgText)
        return false
    }
  
    if(divdisplayinfo == null){
        msgText = "# divdisplayinfo field not found"
        console.log(msgText)
        return false
    }
  

    if(txtsearch.value.trim().length == 0) {
        msgText = "# please enter a valid search text"
        console.log(msgText)
        divdisplayinfo.innerText = msgText
        return false 
    }
  

    msgText = "# searching for: " + txtsearch.value
  

    divdisplayinfo.innerText = msgText;
  

        const _search_text = txtsearch.value 
      const _giphy_ApiKey = "CPPlahCVIEdhglmTDt8677Q3wSPIL8Gs"
        const _giphy_result_data_file = "./data/giphy2.json";
        const _giphyApi_Url = `https://api.giphy.com/v1/gifs/search?api_key=${_giphy_ApiKey}&q=${_search_text}&limit=25&rating=g`; 

        let _request_url = (_giphy_ApiKey.trim().length == 0)? _giphy_result_data_file : _giphyApi_Url;
    
        console.log("---- _request_url---- ");
        console.log(_request_url)
        console.log("")
    
        fetch(_request_url)
        .then(response => {
          if (!response.ok) {

            throw new Error('Network response was not ok');
          }

          return response.json();
        })
        .then(data => {
    
            console.log("#### giphy fetch.promise then - post data ###")
            console.log(data);
    
            console.log("")
            console.log("-------- giphy json data as string ----")

            console.log("")
    
            let _image = "";
            
            if(data == null | data.data.length == 0){
              divdisplayinfo.innerText = "# no results found"
              return false;
            }
  
            _image = data.data[0].images.original.url;
            
            console.log("-- first image ---");
            console.log(_image)
            console.log("")

            let _html = "<div class='gif-container'>";

            for (let i = 0; i < data.data.length; i++) {
                if (i > 11) {
                    break;
                }
            
                let _image = data.data[i].images.original.url;
                _html += `<div class='gif-item'><img width='100' height='100' src='${_image}'></div>`;
            }
            
            _html += "</div>";
            divdisplayinfo.innerHTML = _html;
            
            
            console.log("-------------- html string ----------")
            console.log(_html)
            console.log("")
  
            divdisplayinfo.innerHTML = _html
            
        })
        .catch(error => {
          console.error('## There was a problem with the fetch operation:', error);
          divdisplayinfo.innerText = error;
        });
    
        console.log("..continue fetching gphy data...demo of non-blocking code")
        divdisplayinfo.innerText = "..continue fetching giphy data...demo of non-blocking code";

    txtsearch.focus(); 
  
  }

function lnkClear(){
  
  txtsearch.value = ""; 
  txtsearch.focus(); 
}