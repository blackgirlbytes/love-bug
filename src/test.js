import { validateCode } from './validateCode.js';

// Test the Valentine's Gift List bug
const badCode = `function addGift(gifts, newGift) {
  gifts.push(newGift)
  return gifts
}

const myGifts = ["chocolates", "flowers"]
const updatedGifts = addGift(myGifts, "card")
console.log(myGifts)`;

const goodCode = `function addGift(gifts, newGift) {
  return [...gifts, newGift]
}

const myGifts = ["chocolates", "flowers"]
const updatedGifts = addGift(myGifts, "card")
console.log(myGifts)`;

async function runTests() {
  console.log("Testing bad code (should fail):");
  console.log(await validateCode(5, badCode));
  
  console.log("\nTesting good code (should pass):");
  console.log(await validateCode(5, goodCode));
}

runTests();