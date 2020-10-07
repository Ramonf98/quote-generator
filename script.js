const quoteContainer = document.getElementById('quote-container');
const quoteText      = document.getElementById('quote-text');
const authorText     = document.getElementById('author');
const twitterBtn     = document.getElementById('twitter');
const newQuoteBtn    = document.getElementById('new-quote');
const loader         = document.getElementById('loader');

function ShowLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function HideLoadingSpinner(){
    if(loader.hidden === false){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote from API
async function getQuote() {
    ShowLoadingSpinner();
    const proxyUrl = 'https://hidden-chamber-55499.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //If author is blank, then it is Unkown.
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        //Reduce fontsize for long quotes.
        if(data.quoteText.length >= 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText  = data.quoteText;

        HideLoadingSpinner();
    }catch(error){
        getQuote();//Load another Quote
        console.log('Opps, Something went wrong!', error);
    }

}

//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.trim()} - ${author}`;
    window.open(encodeURI(twitterUrl), '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();
