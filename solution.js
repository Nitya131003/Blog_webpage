import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "High Tea at the Rambagh Palace, Jaipur",
    content:
      "It turned out to be a long break from blogging! All my breaks are unintentional though. Before I start on my fabulous experience of having a high tea at the Rambagh Palace, Jaipur I need to get two things out of the way, actually three. One I need to make peace with tennis travel as that is all I get to do these days. My daughter plays tennis and it is my job to take her from tournament to tournament. Two I did best when I blogged just to capture my experiences, without any pressure of achieving anything. I need to go back to that carefree feeling. Three, I have always declared when I have been invited on a blogging trip, but let me declare this time that we were paying customers at the Rambagh Palace!",
    author: "Mridula Dwivedi",
    date: "2024-02-19",
    imageUrl: "https://traveltalesfromindia.in/wp-content/uploads/2024/02/PXL_20231010_123333765-scaled.jpg",
  },
  {
    id: 2,
    title: "Raj Mandir Jaipur – One Photo From My Album",
    content:
      "We have bought our small car on a big loan,  and it was causing a lot of itching to go somewhere. We agreed to go to pink city Jaipur the capital of Rang Rangeelo Rajasthan. It was our first trip in the new car and I felt like I owned the world even while being in debt to the bank . Mushrooming Mall City Gurgaon was our home, but Jaipur had Raj Mandir the best movie theater in India",
    author: "Prasad Np",
    date: "2013-04-22",
    imageUrl: "https://filminformation.com/wp-content/uploads/2021/02/Raj-Mandir-DSC_0027777-Recovered.jpg",
  },
  {
    id: 3,
    title: "AMER FORT VISIT IN JAIPUR",
    content:
      "Amer Fort is yet another stunningly beautiful fort of Jaipur Rajasthan made of marble and red sandstone. Amer Fort and Amber Fort are one and the same fort in Jaipur Rajasthan. The fort is in Amer town of Jaipur city, hence the name Amer Fort too.",
    author: "Indrani Ghose",
    date: "2021-09-01",
    imageUrl: "https://www.rajasthantourdriver.com/wp-content/uploads/2021/12/amber-fort-night.jpg",
  },
  {
    id: 4,
    title: "A GLIMPSE OF TEEJ FESTIVAL IN JAIPUR",
    content:
      "The auto driver refuses to take us to the Hawa Mahal. “Udhar, Tripolia Gate Ke Paas bahut beed hogi, aaj Teej festival hai na,” he  says , while another one who stops by nods his head in agreement and continues on his way. The roads they say will be closed on account of Teej Festival Jaipur and the crowds will throng the gates.  More autos pass me by and they all refuse to take me to the pink old city. Finally, a young auto driver agrees and as I sit inside, I realize he has no clue where Hawa Mahal is, let alone what Teej Festival Rajasthan is all about. Several posters advertise the Teej and the procession as we get stuck in bumper-to-bumper traffic.",
    author:"Lakshmi Sharath",
    date: "2021-08-21",
    imageUrl: "https://lakshmisharath.com/wp-content/uploads/2021/08/Teej-Festival-Rajasthan-1024x678.jpg",
  },
  {
    id: 5,
    title: "ISKCON Temple, Jaipur: A Psychedelic Window To The Spiritual World",
    content:
      "I have been a regular visitor to the ISKCON Temple in Jaipur, Rajasthan for almost an entire past decade. Rajasthan being my ancestral state, we make it a point to travel here once at least every year. To say then, that I have a personal affinity for this state, and the Jaipur ISKCON temple wouldn’t be an exaggeration… from being a simple small house many years back, it has been a joy to see the temple gradually evolve to a relatively bigger premise and stand in line along with some of its more famous contemporaries like the ISKCON Temple in Delhi.",
    author: "Arti",
    date: "2019-03-05",
    imageUrl: "https://www.trodly.com/pictures/attraction/x5929.jpg.pagespeed.ic.ZVRwmuT2KK.jpg",
  },
  {
    id: 6,
    title: "JANTAR MANTAR JAIPUR – OBSERVATORY OF SAWAI JAI SINGH",
    content:
      " Jantar Mantar is a perfect place for those of us who loved Maths and Calculations at school. Standing at the observatory makes you feel as if the small instruments of your geometry box have suddenly taken a giant avatar. The semi-circles remind you of the D, the triangles remind you of their plastic versions and the markings on the instruments remind you of the scale. Some instruments remind you of the rotating globe. Well you never know, our school geometry box may have been a miniature version of instruments at Jantar Mantar. After all, Jantar means Yantra or Instrument, and Mantra means Calculation.",
    author: "Anuradha Goyal",
    date: "2017-08-28",
    imageUrl: "https://www.trawell.in/admin/images/upload/151648398Jaipur_Jantar_Mantar_Main.jpg",
  },
  {
    id: 7,
    title: "Kite Festival, Jaipur",
    content:
      "Kite festival or International Kite Festival is one of the biggest festivals celebrated in Rajasthan. Many kite flyers and tourists visit Gujarat to visit the fair. Kite festival is celebrated on Makar Sankranti or Uttarayan (14th of January) every year. It is certainly a unique festival in its own way. The colourful kites cover the whole sky of the Jaipur. It is the best time to visit the Jaipur if you love to fly the kite.",
      author: "Jitender Singh",
      date: "2016-08-22",
      imageUrl: "https://www.india-tours.com/images/festivals/international-kite-festival/kite-festival1.jpg",
  },
  {
    id: 8,
    title: "Offbeat Rajasthan: A touch of real at Jaipura Garh",
    content:
      "The hearth was fired up and Tulsa was busy piling up the rotis next to it. Her husband had taken Chetan to their cattle shed. I chose the warmth of the fire and asked Tulsa if I could sit next to her as she prepared breakfast for her family. “Here, have one”, she said and thrust a roti straight off the tawa (pan) into my hands. The piping hot roti felt blissful in my palms, as I sat there breathing out mist. Her granddaughter promptly brought out a bowl of makkhan (homemade butter) and plonked a dollop on the hot roti. Tulsa then crushed half of the roti into the melting butter. I felt like one of the little kids I had just photographed outside the house, smiling gleefully as the fresh, wholesome butter soaked bite of the bajra roti filled my mouth. “Bajra (millet) does well for you in this cold”, she said.",
    author: "Sandeepa Chetan",
    date: "2018-01-06",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/ab/40/bb/fort-chandragupt.jpg?w=1200&h=-1&s=1",
  },
  {
    id: 9,
    title: "Jaipur Jewellery",
    content:
      "Jaipur, the capital city of Rajasthan is famous all over the world for its jewellery, especially semi-precious & precious stones (along with loads of fakes - if you ever go there watch out!). We spent hours trawling through piles of jewellery & came away with some nice pieces. I ended up with 3 necklaces - one mainly silver, the other two with semi-precious stones. I'll have to give the sports clothes a break to wear them!",
    author: "Dulkara Delta Martig",
    date: "2024-07-01",
    imageUrl: "https://www.shutterstock.com/image-photo/do-you-want-some-beautiful-260nw-2348053933.jpg",
  },
  {
    id: 10,
    title: "HOW TO VISIT THE JAIPUR STEPWELL: PANNA MEENA KA KUND",
    content: 
      "The famous stepwell near Jaipurl is actually located near the Kheri Gate in Amer, just a short walk from the Amer Fort. Contrary to conventional first impressions, the Jaipur Stepwell is not within the fort grounds, so visiting it is free. However, since the stepwell is so close to the Amer Fort, combining it with a trip to the fort or the famous Jaipur Wall is a great bet.",
    author: "Olly Gaspar",
    date: "2024-o5-02",
    imageUrl: "https://www.rajasthantourdriver.com/wp-content/uploads/2023/12/panna-meena-ka-kund.jpg",
  },
];

let lastId = 10;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
    imageUrl: req.body.imageUrl,
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  if (req.body.imageUrl) post.imageUrl = req.body.imageUrl;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
