var currentQuote = {
  "_id":"",
  "tags":[""],
  "content":"",
  "author":"",
  "authorSlug":"",
  "length":'',
  "dateAdded":"",
  "dateModified":""
}

const fetchAndSetQuote = (quoteElem, authorElem) => {
  fetch('https://api.quotable.io/random')
  .then(result => result.json())
  .then(quote => {
    currentQuote = quote
    quoteElem.hide()
    authorElem.hide()
    quoteElem.text(currentQuote.content)
    .fadeIn(500)
    authorElem.text(`- ${currentQuote.author}`)
    .fadeIn(500)
  })
}

$(document).ready(function () {
  const quoteElem = $('#text')
  const authorElem = $('#author')
  const newQuoteBtn = $('#new-quote')
  const tweetBtn = $('#tweet-quote')
  
  
  // fetch an initial quote
  fetchAndSetQuote(quoteElem, authorElem)

  tweetBtn.on('click', function () {
    $(this).attr(
      'href',
      'https://twitter.com/intent/tweet?'
      +'hashtags=quotes,'+currentQuote.tags.join(',')
      + '&text='+
      encodeURIComponent(`" ${currentQuote.content} " - ${currentQuote.author}`)
      )
  })

  newQuoteBtn.on('click', () => {
    fetchAndSetQuote(quoteElem, authorElem)
  })
})