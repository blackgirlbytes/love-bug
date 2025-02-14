import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from './components/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'

const commonBugs = [
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
      "Add a default message and a parameter for the love status",
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
]

function App() {
  const [currentBug, setCurrentBug] = useState(0)
  const [hintLevel, setHintLevel] = useState(0)
  const [userSolution, setUserSolution] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [timeLeft, gameOver])

  const showNextHint = () => {
    if (hintLevel < 4) {
      setHintLevel(prev => prev + 1)
    }
  }

  const checkSolution = () => {
    const currentProblem = commonBugs[currentBug]
    
    // Create a safe evaluation environment
    const validateCode = (code) => {
      try {
        // Remove any unsafe code patterns
        if (code.includes('eval') || code.includes('Function') || code.includes('import')) {
          return { isValid: false, error: 'Unsafe code detected' };
        }

        // For the undefined love bug
        if (currentProblem.id === 2) {
          // Check if the function:
          // 1. Takes an 'inLove' parameter
          // 2. Has a default message for false case
          // 3. Returns "My heart beats for you!" for true case
          const functionStr = code.toString();
          const hasParameter = /function\s+getLoveMessage\s*\(\s*inLove\s*\)/.test(functionStr);
          const hasDefaultMessage = /message\s*=\s*["'].*["']\s*;/.test(functionStr);
          const hasCorrectTrueCase = functionStr.includes('My heart beats for you!');
          
          // Test the function
          const fn = new Function('return ' + code)();
          const falseCase = fn(false);
          const trueCase = fn(true);
          
          return {
            isValid: hasParameter && 
                    hasDefaultMessage && 
                    hasCorrectTrueCase &&
                    typeof falseCase === 'string' &&
                    falseCase.length > 0 &&
                    trueCase === "My heart beats for you!",
            error: null
          };
        }
        
        // For the infinite loop bug
        if (currentProblem.id === 1) {
          // Check if the function:
          // 1. Takes a 'times' parameter
          // 2. Has a counter variable
          // 3. Has a condition to stop the loop
          const functionStr = code.toString();
          const hasParameter = /function\s+sendLoveMessages\s*\(\s*times\s*\)/.test(functionStr);
          const hasCounter = /let|var\s+count\s*=\s*0/.test(functionStr);
          const hasCondition = /while\s*\(\s*count\s*<\s*times\s*\)/.test(functionStr);
          const hasIncrement = /count\s*\+\+|\+\+\s*count|count\s*=\s*count\s*\+\s*1/.test(functionStr);
          
          return {
            isValid: hasParameter && hasCounter && hasCondition && hasIncrement,
            error: null
          };
        }
        
        return { isValid: false, error: 'Unknown bug type' };
      } catch (error) {
        return { isValid: false, error: error.message };
      }
    };

    const result = validateCode(userSolution);
    
    if (result.isValid) {
      // Calculate score based on hints used
      const hintPenalty = hintLevel * 5 // -5 points per hint used
      const timeBonus = Math.floor(timeLeft / 10) // +1 point per 10 seconds left
      const baseScore = 20 // Base score for solving the problem
      const totalScore = Math.max(0, baseScore - hintPenalty + timeBonus)
      
      setScore(prev => prev + totalScore)
      setFeedback({
        type: 'success',
        message: `💖 Perfect! +${totalScore} points (${baseScore} base ${timeBonus > 0 ? `+${timeBonus} time bonus` : ''} ${hintPenalty > 0 ? `-${hintPenalty} hint penalty` : ''})`
      })
      
      // Wait a moment before moving to next problem
      setTimeout(() => {
        if (currentBug < commonBugs.length - 1) {
          setCurrentBug(prev => prev + 1)
          setUserSolution('')
          setHintLevel(0)
          setFeedback(null)
        } else {
          setGameOver(true)
        }
      }, 2000)
    } else {
      // Provide more specific feedback based on what's missing
      let errorMessage = '💔 Not quite right. ';
      
      if (currentProblem.id === 2) {
        const functionStr = userSolution.toString();
        if (!/function\s+getLoveMessage\s*\(\s*inLove\s*\)/.test(functionStr)) {
          errorMessage += "Make sure your function takes an 'inLove' parameter. ";
        }
        if (!/message\s*=\s*["'].*["']\s*;/.test(functionStr)) {
          errorMessage += "Add a default message for when inLove is false. ";
        }
        if (!functionStr.includes('My heart beats for you!')) {
          errorMessage += "Keep the original love message for when inLove is true. ";
        }
      } else if (currentProblem.id === 1) {
        const functionStr = userSolution.toString();
        if (!/function\s+sendLoveMessages\s*\(\s*times\s*\)/.test(functionStr)) {
          errorMessage += "Make sure your function takes a 'times' parameter. ";
        }
        if (!/let|var\s+count\s*=\s*0/.test(functionStr)) {
          errorMessage += "You need a counter variable. ";
        }
        if (!/while\s*\(\s*count\s*<\s*times\s*\)/.test(functionStr)) {
          errorMessage += "Add a condition to stop the loop. ";
        }
        if (!/count\s*\+\+|\+\+\s*count|count\s*=\s*count\s*\+\s*1/.test(functionStr)) {
          errorMessage += "Don't forget to increment your counter! ";
        }
      }
      
      setFeedback({
        type: 'error',
        message: errorMessage
      })
    }
  }

  const copyHintToSolution = (code) => {
    setUserSolution(code)
    setFeedback({
      type: 'info',
      message: '📋 Solution copied to editor!'
    })
    setTimeout(() => setFeedback(null), 2000)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">
          ❤️ Love.bug() ❤️
        </h1>
        <p className="game-subtitle">Fix the broken hearts in the code!</p>
        <div className="stats-container">
          <div className="stat-box">
            <span>⏰ {formatTime(timeLeft)}</span>
          </div>
          <div className="stat-box">
            <span>💝 Score: {score}</span>
          </div>
          <div className="stat-box">
            <span>💡 Hints: {4 - hintLevel}</span>
          </div>
        </div>
      </header>

      {!gameOver ? (
        <Card className="backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle>{commonBugs[currentBug].title}</CardTitle>
            <CardDescription>{commonBugs[currentBug].bugDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="code-display">
              <SyntaxHighlighter 
                language="javascript" 
                style={dracula}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                }}
              >
                {commonBugs[currentBug].code}
              </SyntaxHighlighter>
            </div>

            {feedback && (
              <div className={`my-4 p-4 rounded-lg ${
                feedback.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                feedback.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {feedback.message}
              </div>
            )}

            {hintLevel > 0 && (
              <div className="space-y-4 my-4">
                {commonBugs[currentBug].hints.slice(0, hintLevel).map((hint, index) => (
                  <div key={index} className="hint-box">
                    {typeof hint === 'string' ? (
                      <p>
                        {index === 2 ? '🎯' : '💝'} {hint}
                      </p>
                    ) : (
                      <div>
                        <p className="mb-2">✨ Here's the complete solution:</p>
                        <div className="relative">
                          <SyntaxHighlighter 
                            language="javascript" 
                            style={dracula}
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.5rem',
                            }}
                          >
                            {hint.content}
                          </SyntaxHighlighter>
                          <Button
                            variant="secondary"
                            className="absolute top-2 right-2"
                            onClick={() => copyHintToSolution(hint.content)}
                          >
                            Copy Solution 📋
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <textarea
              className="code-editor"
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              placeholder="Write your solution here..."
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={showNextHint}
              disabled={hintLevel >= 4}
            >
              {hintLevel >= 4 ? 'No More Hints 💔' : `Get Hint (${4 - hintLevel} left) 💭`}
            </Button>
            <Button
              variant="default"
              onClick={checkSolution}
              disabled={!userSolution.trim()}
            >
              Submit Fix 💝
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="text-4xl mb-4">Game Over! 💘</CardTitle>
            <CardDescription className="text-xl">
              Final Score: {score} points!
              <div className="mt-2 text-sm text-valentine-secondary">
                (Score includes time bonus and hint penalties)
              </div>
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button
              variant="default"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Play Again 💕
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default App