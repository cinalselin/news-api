let secretKey;

//  if the user does not pass on any values, use values from parameter
let newsArticle = (
  language = "en",
  search = "apple",
  sortBy = "popularity"
) => {
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&sortBy=${sortBy}&language=${language}&apiKey=${secretKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#newsContainer").innerHTML = "";
      for (let i = 0; i <= data["articles"].length; i++) {
        const newsContainer = document.getElementById("newsContainer");
        let images = data.articles[i].urlToImage;
        let headline = data["articles"][i].title;
        let newsContent = data["articles"][i].content;
        let newsDate = data["articles"][i].publishedAt;
        let readMore = data["articles"][i].url;

        // NEWS DIV CONTAINER
        let newsDiv = document.createElement("div");

        // NEWS IMAGES
        let newsImage = document.createElement("img");
        newsImage.src = images;
        newsDiv.appendChild(newsImage);

        images === null
          ? (newsImage.src =
              "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")
          : (newsImage.src = images);

        // NEWS HEADLINE
        let newsHeadline = document.createElement("h2");
        newsHeadline.innerText = headline;
        newsDiv.appendChild(newsHeadline);

        // NEWS ARTICLE
        let newsContentFull = document.createElement("p");
        newsContentFull.innerText = newsContent.slice(
          0,
          newsContent.indexOf("[")
        );
        newsDiv.appendChild(newsContentFull);

        // DATE OF NEWS
        let newsContentDate = document.createElement("span");
        newsContentDate.innerText = newsDate.substr(0, 10);
        newsDiv.appendChild(newsContentDate);

        // READ MORE BUTTON
        let newsReadMore = document.createElement("a");
        newsReadMore.innerText = "Read More";
        newsReadMore.href = readMore;
        newsDiv.appendChild(newsReadMore);

        newsContainer.appendChild(newsDiv);
      }
    });
};
newsArticle();

//  if the user passes  any values, use values from user
document.querySelector("#submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  newsArticle(
    document.getElementById("language").value,
    document.querySelector("#search").value,
    document.getElementById("sortBy").value
  );
});
