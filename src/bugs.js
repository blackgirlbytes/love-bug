// bugs.js
export const commonBugs = [
  {
    id: 1,
    title: "Infinite Loop of Love",
    code: `function sendLoveMessages() {
  while (true) {
    console.log("I love you!")
  }
}`,
    bugDescription: "This function will run forever and crash the browser!",
    hints: [
      "Think about what condition could stop the loop",
      "You might need a counter variable to track progress",
      "Add a parameter for message count and increment a counter",
      {
        type: "code",
        content: `function sendLoveMessages(times) {
  let count = 0;
  while (count < times) {
    console.log("I love you!")
    count++;
  }
}`
      }
    ],
    solution: `function sendLoveMessages(times) {
  let count = 0;
  while (count < times) {
    console.log("I love you!")
    count++;
  }
}`,
  },
  {
    id: 2,
    title: "Undefined Love",
    code: `function getLoveMessage() {
  let message;
  if (inLove) {
    message = "My heart beats for you!"
  }
  return message;
}`,
    bugDescription: "The variable 'inLove' is not defined, and the message might be undefined!",
    hints: [
      "What happens if inLove is false?",
      "You should add a parameter to the function",
      "Add a default message for when inLove is false",
      {
        type: "code",
        content: `function getLoveMessage(inLove) {
  let message = "Still searching for love...";
  if (inLove) {
    message = "My heart beats for you!"
  }
  return message;
}`
      }
    ],
    solution: `function getLoveMessage(inLove) {
  let message = "Still searching for love...";
  if (inLove) {
    message = "My heart beats for you!"
  }
  return message;
}`,
  },
  {
    id: 3,
    title: "Valentine's String Comparison",
    code: `const checkValentine = (message) => {
  const sweetMessage = "Be Mine"
  if (message = sweetMessage) {
    return "Perfect match! 💕"
  }
  return "Keep looking! 💔"
}`,
    bugDescription: "The comparison operator is wrong! This always returns a match.",
    hints: [
      "Look carefully at the comparison operator",
      "= assigns values, === compares them",
      "Use the correct comparison operator",
      {
        type: "code",
        content: `const checkValentine = (message) => {
  const sweetMessage = "Be Mine"
  if (message === sweetMessage) {
    return "Perfect match! 💕"
  }
  return "Keep looking! 💔"
}`
      }
    ],
    solution: `const checkValentine = (message) => {
  const sweetMessage = "Be Mine"
  if (message === sweetMessage) {
    return "Perfect match! 💕"
  }
  return "Keep looking! 💔"
}`,
  },
  {
    id: 4,
    title: "Love Letter Array",
    code: `const letters = ["Be mine", "XOXO", "Forever yours"]
const getLastLoveLetter = (letters) => {
  return letters[letters.length]
}
console.log(getLastLoveLetter(letters))`,
    bugDescription: "We're trying to read a love letter that doesn't exist! Arrays are zero-based.",
    hints: [
      "Array indices start at 0",
      "The last index is always length - 1",
      "Adjust the array index calculation",
      {
        type: "code",
        content: `const letters = ["Be mine", "XOXO", "Forever yours"]
const getLastLoveLetter = (letters) => {
  return letters[letters.length - 1]
}
console.log(getLastLoveLetter(letters))`
      }
    ],
    solution: `const letters = ["Be mine", "XOXO", "Forever yours"]
const getLastLoveLetter = (letters) => {
  return letters[letters.length - 1]
}
console.log(getLastLoveLetter(letters))`,
  },
  {
    id: 5,
    title: "Sweet Valentine Greeting",
    code: `function createValentine(name) {
  const greeting = "Happy Valentine's Day"
  return greeting + name + "!"
}
// Example: createValentine("Alice") currently returns "Happy Valentine's DayAlice!"
// We want it to return "Happy Valentine's Day dear Alice!" instead`,
    bugDescription: "Our Valentine's greeting needs to be more romantic! The function should add the word 'dear' before the name to make it more personal. Also fix the spacing between words.",
    hints: [
      "Look at the example output - words are running together and missing 'dear'",
      "Add spaces around the word 'dear' when concatenating",
      "The greeting should look like: greeting + ' dear ' + name + '!'",
      {
        type: "code",
        content: `function createValentine(name) {
  const greeting = "Happy Valentine's Day"
  return greeting + " dear " + name + "!"
}`
      }
    ],
    solution: `function createValentine(name) {
  const greeting = "Happy Valentine's Day"
  return greeting + " dear " + name + "!"
}`,
  },
  {
    id: 6,
    title: "Love Calculator",
    code: `function calculateLove(name1, name2) {
  return name1.length + name2.length
}
console.log(calculateLove("Romeo", "Juliet"))`,
    bugDescription: "Our love calculator needs to give a percentage between 1-100!",
    hints: [
      "Convert the sum to a percentage",
      "Use modulo to keep it in range",
      "Add 1 to avoid zero percent love",
      {
        type: "code",
        content: `function calculateLove(name1, name2) {
  return ((name1.length + name2.length) % 100) + 1
}
console.log(calculateLove("Romeo", "Juliet"))`
      }
    ],
    solution: `function calculateLove(name1, name2) {
  return ((name1.length + name2.length) % 100) + 1
}
console.log(calculateLove("Romeo", "Juliet"))`,
  },
  {
    id: 7,
    title: "Valentine's Promise",
    code: `fetch('https://api.valentine.com/message')
.then(response => {
  response.json()
})
.then(data => {
  console.log("Valentine says: " + data.message)
})`,
    bugDescription: "We forgot to return the promise of love! The message will never arrive.",
    hints: [
      "The first .then() needs to return something",
      "Return the result of response.json()",
      "Add the return keyword",
      {
        type: "code",
        content: `fetch('https://api.valentine.com/message')
.then(response => {
  return response.json()
})
.then(data => {
  console.log("Valentine says: " + data.message)
})`
      }
    ],
    solution: `fetch('https://api.valentine.com/message')
.then(response => {
  return response.json()
})
.then(data => {
  console.log("Valentine says: " + data.message)
})`,
  },
  {
    id: 8,
    title: "Love Note Scope",
    code: `function writeNote() {
  message = "I love you"
  message += " forever"
  return message
}`,
    bugDescription: "Our love note isn't properly scoped! It's becoming a global variable.",
    hints: [
      "Variables should be declared before use",
      "Use let or const to declare variables",
      "Add let to properly scope the message",
      {
        type: "code",
        content: `function writeNote() {
  let message = "I love you"
  message += " forever"
  return message
}`
      }
    ],
    solution: `function writeNote() {
  let message = "I love you"
  message += " forever"
  return message
}`,
  },
  {
    id: 9,
    title: "Heart Drawing",
    code: `async function drawHeart() {
  const color = fetch('https://api.valentine.com/colors/red')
  const pattern = color.json()
  return "❤️ " + pattern.hex
}`,
    bugDescription: "We forgot to await our heart's color! Promises need to be awaited.",
    hints: [
      "Async functions need await for promises",
      "Both fetch and json() return promises",
      "Add await to both async operations",
      {
        type: "code",
        content: `async function drawHeart() {
  const color = await fetch('https://api.valentine.com/colors/red')
  const pattern = await color.json()
  return "❤️ " + pattern.hex
}`
      }
    ],
    solution: `async function drawHeart() {
  const color = await fetch('https://api.valentine.com/colors/red')
  const pattern = await color.json()
  return "❤️ " + pattern.hex
}`,
  },
  {
    id: 10,
    title: "Love Letter Copy",
    code: `const original = { to: "My Love", message: "Forever yours" }
const copy = original
copy.message = "Always yours"
console.log(original.message)`,
    bugDescription: "We're modifying the original love letter! We need to make a proper copy.",
    hints: [
      "Objects are copied by reference",
      "Use spread operator to clone",
      "Create a new object with {...original}",
      {
        type: "code",
        content: `const original = { to: "My Love", message: "Forever yours" }
const copy = { ...original }
copy.message = "Always yours"
console.log(original.message)`
      }
    ],
    solution: `const original = { to: "My Love", message: "Forever yours" }
const copy = { ...original }
copy.message = "Always yours"
console.log(original.message)`,
  }
];

// Function to get a random selection of bugs
export const getRandomBugs = (count = 3) => {
  // Create a copy of the bugs array
  const shuffled = [...commonBugs];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first 'count' bugs
  return shuffled.slice(0, count);
};