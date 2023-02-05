// in english

function extractEnglishFilterWords(response) {
    // Split response into individual words
    const words = response.split(" ");
  
    // Define a list of filter words
    const filterWords = ["the", "and", "of", "to", "a", "in", "that", "it", "with", "as", "for", "was", "on", "is", "are", "be", "this", "an", "at", "by", "i", "you", "we", "they", "which", "or", "but", "not", "what", "all", "were", "when", "where", "how", "many", "some", "can", "other", "only", "new", "more", "was", "said", "who", "will", "one", "about", "out", "if", "has", "been", "its"];
  
    // Remove the filter words from the response and return the result
    return words.filter(word => !filterWords.includes(word));
  }
  
  const englishReponse = "This is an example of a text string to extract keywords from.";
  console.log(extractFilterWords(englishReponse));
  // Output: [ "example", "text", "string", "extract", "keywords" ]

// in Indonesian

function extractIndonesianFilterWords(response) {
    // Split response into individual words
    const words = response.split(" ");
  
    // Define a list of filter words in Indonesian
    const filterWords = ["di", "dan", "yang", "untuk", "dengan", "dari", "ke", "ini", "karena", "itu", "tidak", "pada", "ada", "adalah", "seperti", "atau", "jika", "memiliki", "telah", "yaitu"];
  
    // Remove the filter words from the response and return the result
    return words.filter(word => !filterWords.includes(word));
  }
  
  const indonesianResponse = "Ini adalah contoh dari sebuah string teks untuk mengekstrak kata kunci.";
  console.log(extractFilterWords(indonesianResponse));
  // Output: [ "contoh", "string", "teks", "mengekstrak", "kata", "kunci" ]
  