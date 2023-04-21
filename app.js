const express = require('express')
const request = require('request')

const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

// Define a route handler for a POST request to the "/submit" URL
app.post('/submit', (req, res) => {
  console.log('Button Clicked!')
  // Define an array to store the generated insult texts
  let insults = []
  
  // Make three GET requests to "https://evilinsult.com/generate_insult.php?lang=en&type=text"
  // and store the generated insult texts in the "insults" array
  for (let i = 0; i < 2; i++) {
    request('https://evilinsult.com/generate_insult.php?lang=en&type=text', (error, response, body) => {
      //console.log(body);
      insults.push(body)
      if (insults.length === 2) {
        

        res.render('insult', { insults });
      }
     
    })
  }
  

})



const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})


// async function getInsult() {
//     try {
//       const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=text');
//       const insult = response.data;
//       return insult;
//     } catch (error) {
//       console.error(error);
//     }
//   }


//   async function generateInsult() {
//     try {
//       const insult = await getInsult();
//       console.log(insult);
//       document.getElementById("insult").innerHTML=insult;
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   document.getElementById("myBtn").addEventListener("click", generateInsult);
