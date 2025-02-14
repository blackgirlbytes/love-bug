import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from './components/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'
import { commonBugs, getRandomBugs } from './bugs'

function App() {
  const [bugs, setBugs] = useState(() => getRandomBugs(3)) // Get 3 random bugs
  const [currentBug, setCurrentBug] = useState(0)
  const [hintLevel, setHintLevel] = useState(0)
  const [userSolution, setUserSolution] = useState('')
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
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
      // Immediate penalty for using a hint
      setScore(prev => Math.max(0, prev - 5))
      setFeedback({
        type: 'warning',
        message: '💔 -5 points for using a hint!'
      })
      setTimeout(() => setFeedback(null), 2000)
    }
  }

  const checkSolution = () => {
    const currentProblem = bugs[currentBug]
    
    // Create a safe evaluation environment
    const validateCode = (code) => {
      try {
        // Remove any unsafe code patterns
        if (code.includes('eval') || code.includes('Function') || code.includes('import')) {
          return { isValid: false, error: 'Unsafe code detected' };
        }

        const functionStr = code.toString();

        switch(currentProblem.id) {
          case 1: // Infinite Loop of Love
            const hasTimesParam = /function\s+sendLoveMessages\s*\(\s*times\s*\)/.test(functionStr);
            const hasCounter = /let|var\s+count\s*=\s*0/.test(functionStr);
            const hasLoopCondition = /while\s*\(\s*count\s*<\s*times\s*\)/.test(functionStr);
            const hasIncrement = /count\s*\+\+|\+\+\s*count|count\s*=\s*count\s*\+\s*1/.test(functionStr);
            return {
              isValid: hasTimesParam && hasCounter && hasLoopCondition && hasIncrement,
              error: null
            };

          case 2: // Undefined Love
            const hasInLoveParam = /function\s+getLoveMessage\s*\(\s*inLove\s*\)/.test(functionStr);
            const hasDefaultMessage = /message\s*=\s*["'].*["']\s*;/.test(functionStr);
            const hasCorrectTrueCase = functionStr.includes('My heart beats for you!');
            const fn = new Function('return ' + code)();
            const falseCase = fn(false);
            const trueCase = fn(true);
            return {
              isValid: hasInLoveParam && 
                      hasDefaultMessage && 
                      hasCorrectTrueCase &&
                      typeof falseCase === 'string' &&
                      falseCase.length > 0 &&
                      trueCase === "My heart beats for you!",
              error: null
            };

          case 3: // Valentine's String Comparison
            const hasArrowFunction = /const\s+checkValentine\s*=\s*\(\s*message\s*\)\s*=>/.test(functionStr);
            const hasCorrectComparison = /message\s*===\s*sweetMessage/.test(functionStr);
            const hasCorrectReturns = functionStr.includes('Perfect match! 💕') && functionStr.includes('Keep looking! 💔');
            return {
              isValid: hasArrowFunction && hasCorrectComparison && hasCorrectReturns,
              error: null
            };

          case 4: // Love Letter Array
            const hasLettersParam = /const\s+getLastLoveLetter\s*=\s*\(\s*letters\s*\)\s*=>/.test(functionStr);
            const hasCorrectIndex = /letters\s*\[\s*letters\.length\s*-\s*1\s*\]/.test(functionStr);
            return {
              isValid: hasLettersParam && hasCorrectIndex,
              error: null
            };

          case 5: // Sweet Valentine Greeting
            const hasGreetingVar = /const\s+greeting\s*=\s*["']Happy Valentine's Day["']/.test(functionStr);
            const hasProperConcatenation = /greeting\s*\+\s*["']\s*dear\s*["']\s*\+\s*name/.test(functionStr);
            const hasExclamation = /\+\s*["']!["']/.test(functionStr);
            return {
              isValid: hasGreetingVar && hasProperConcatenation && hasExclamation,
              error: null
            };

          case 6: // Love Calculator
            const hasLoveCalcFunction = /function\s+calculateLove\s*\(\s*name1\s*,\s*name2\s*\)/.test(functionStr);
            const hasModulo = /%.*(100|99)/.test(functionStr);
            const hasAddOne = /\+\s*1/.test(functionStr);
            return {
              isValid: hasLoveCalcFunction && hasModulo && hasAddOne,
              error: null
            };

          case 7: // Valentine's Promise
            const hasJsonReturn = /return\s+response\.json\(\)/.test(functionStr);
            const hasMessageLog = /console\.log\([^)]*data\.message[^)]*\)/.test(functionStr);
            return {
              isValid: hasJsonReturn && hasMessageLog,
              error: null
            };

          case 8: // Love Note Scope
            const hasLetMessage = /let\s+message/.test(functionStr);
            const hasForeverConcat = /\+=\s*["']\s*forever\s*["']/.test(functionStr);
            return {
              isValid: hasLetMessage && hasForeverConcat,
              error: null
            };

          case 9: // Heart Drawing
            const hasAwaitFetch = /await\s+fetch/.test(functionStr);
            const hasAwaitJson = /await.*\.json\(\)/.test(functionStr);
            const hasHeartReturn = /return\s*["']❤️/.test(functionStr);
            return {
              isValid: hasAwaitFetch && hasAwaitJson && hasHeartReturn,
              error: null
            };

          case 10: // Love Letter Copy
            const hasSpreadOperator = /\{\s*\.\.\.original\s*\}/.test(functionStr);
            const hasCopyMessage = /copy\.message\s*=/.test(functionStr);
            return {
              isValid: hasSpreadOperator && hasCopyMessage,
              error: null
            };

          default:
            return { isValid: false, error: 'Unknown bug type' };
        }
      } catch (error) {
        return { isValid: false, error: error.message };
      }
    };

    const result = validateCode(userSolution);
    
    if (result.isValid) {
      // Calculate score based on time bonus only since hint penalties are applied immediately
      const timeBonus = Math.floor(timeLeft / 10) // +1 point per 10 seconds left
      const baseScore = 20 // Base score for solving the problem
      const totalScore = baseScore + timeBonus
      
      setScore(prev => prev + totalScore)
      setFeedback({
        type: 'success',
        message: `💖 Perfect! +${totalScore} points (${baseScore} base ${timeBonus > 0 ? `+${timeBonus} time bonus` : ''})`
      })
      
      // Wait a moment before moving to next problem
      setTimeout(() => {
        if (currentBug < bugs.length - 1) {
          setCurrentBug(prev => prev + 1)
          setUserSolution('')
          setHintLevel(0)
          setWrongAttempts(0)
          setFeedback(null)
        } else {
          setGameOver(true)
        }
      }, 2000)
    } else {
      // Increment wrong attempts and apply penalty
      setWrongAttempts(prev => prev + 1)
      const penalty = wrongAttempts + 1; // Increasing penalty for each attempt
      setScore(prev => Math.max(0, prev - penalty))
      
      // Different messages based on number of attempts
      let errorMessage;
      if (wrongAttempts === 0) {
        errorMessage = '💔 Not quite right. (-1 point)';
      } else if (wrongAttempts === 1) {
        errorMessage = '💔💔 Still not correct... Try reviewing the bug description! (-2 points)';
      } else if (wrongAttempts === 2) {
        errorMessage = '💔💔💔 Getting warmer? Maybe a hint would help! (-3 points)';
      } else {
        errorMessage = `💔💔💔💔 Oh no! ${penalty} wrong attempts... (-${penalty} points)`;
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

  // Reset game function
  const resetGame = () => {
    setBugs(getRandomBugs(3))
    setCurrentBug(0)
    setHintLevel(0)
    setUserSolution('')
    setTimeLeft(180)
    setGameOver(false)
    setScore(0)
    setWrongAttempts(0)
    setFeedback(null)
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
        <Card 
          key={`card-${wrongAttempts}`} 
          className={`backdrop-blur-sm bg-white/90 ${feedback?.type === 'error' ? 'animate-shake' : ''}`}
        >
          <CardHeader>
            <CardTitle>{bugs[currentBug].title}</CardTitle>
            <CardDescription>{bugs[currentBug].bugDescription}</CardDescription>
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
                {bugs[currentBug].code}
              </SyntaxHighlighter>
            </div>

            {feedback && (
              <div className={`my-4 p-4 rounded-lg ${
                feedback.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                feedback.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                feedback.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {feedback.message}
              </div>
            )}

            {hintLevel > 0 && (
              <div className="space-y-4 my-4">
                {bugs[currentBug].hints.slice(0, hintLevel).map((hint, index) => (
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
              onClick={resetGame}
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