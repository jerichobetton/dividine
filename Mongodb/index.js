const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://marbm23:Brandon18@colorcodedlabs.bwux2jy.mongodb.net/');
console.log("connected")
  
}
