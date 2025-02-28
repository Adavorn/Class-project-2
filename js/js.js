function page_load(){
    
    const msgText = "# page2: page load"

    console.log(msgText.toUpperCase())

}


function btnSearch(){

  let msgText = "# page5: btnSearch" //string 
  console.log(msgText.toUpperCase());  

  //select text field and display div using document.getElementById
  const txtsearch = document.getElementById("txtsearch"); //HTMLElement or null
  const divdisplayinfo = document.getElementById("divdisplayinfo"); //HTMLElement or null

  //validate if text field and display div is not null, if so and exit function
  if(txtsearch == null){
      msgText = "# txtsearch field not found"
      console.log(msgText)
      return false //stop onclick and exit function 
  }

  if(divdisplayinfo == null){
      msgText = "# divdisplayinfo field not found"
      console.log(msgText)
      return false //stop onclick and exit function 
  }

  //######## other if condition examples ####
  //if(txtsearch != null) -> not null 
  //if(txtsearch == null ! divdisplayinfo == null)  -> or 
  //if(txtsearch == null & divdisplayinfo == null) -> or

  //validate if text field is empty, if so exit function
  if(txtsearch.value.trim().length == 0) {
      msgText = "# please enter a valid search text"
      console.log(msgText)
      divdisplayinfo.innerText = msgText
      return false //stop onclick and exit function 
  }

  //display search text in display div
  msgText = "# searching for: " + txtsearch.value

  //divdisplayinfo.innerHTML = "<br>" + msgText + "</b>"
  divdisplayinfo.innerText = msgText;

  //--- Giphy Api Search code ------

      //giphy url and api key  
    
      const _search_text = txtsearch.value //input text fields
    const _giphy_ApiKey = "CPPlahCVIEdhglmTDt8677Q3wSPIL8Gs"
      const _giphy_result_data_file = "./data/giphy2.json";
      const _giphyApi_Url = `https://api.giphy.com/v1/gifs/search?api_key=${_giphy_ApiKey}&q=${_search_text}&limit=25&rating=g`; 
  
      //fetch - then - promise - non-blocking - javascript call then when data is available 
      //another way of implementing promise = async/await 
  
      //inline or 1 line if statement 
      let _request_url = (_giphy_ApiKey.trim().length == 0)? _giphy_result_data_file : _giphyApi_Url;
  
      console.log("---- _request_url---- ");
      console.log(_request_url)
      console.log("")
  
      fetch(_request_url)
      .then(response => {
        if (!response.ok) {
          //throw/raise - generate or a error and descrption 
          throw new Error('Network response was not ok');
        }
        //-- convert data from text to json 
        return response.json();
      })
      .then(data => {
  
          console.log("#### giphy fetch.promise then - post data ###")
          console.log(data);
  
          console.log("")
          console.log("-------- giphy json data as string ----")
          //console.log(JSON.stringify(data))
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
  
          //retrieve giphy data 
          //const giphapi_image = `<img width='200' height='150' src='${_image}'>`
  
          //display multiple images 
          //build dynamic html in string or using DOM to dynamically append html elements

          //add css style 
          let _html = "<div>"
          
          for(i=0;i<data.data.length;i++)
          {
            //unit test: display 12 images , exit loop 
            if(i>11)
            {
              //ext loop 
              break;
            }

            _image = data.data[i].images.original.url;
            _html += `<img width='100' height='100' src='${_image}'>`
            //display 3 images per row 
          }
          
          _html += "</div>"
          
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
  

  //--- Giphy Api Search code ------

  //txtsearch.value = ""; //clear text field
  txtsearch.focus(); //move keyboard cursor to text field

}

function lnkClear(){
  
  txtsearch.value = ""; 
  txtsearch.focus(); 
}