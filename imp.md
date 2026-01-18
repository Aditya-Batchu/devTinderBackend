# Remove Git

- rm -rf .git (Ubuntu)

# Installing Express

- npm i express

# Git Issues

- Login Issues
  - use (gh auth login) for github login
  - install gn using (sudo apt install gh)
- commit changes
  - (git add .)
  - (git commit -m "Initial commit")

# Installing Nodemon

- sudo npm i -g nodemon

# Port Issues

    - see which process is using port 3000
      lsof -i :3000
    - or
      ss -ltnp | grep ':3000'
    - get only the PID
      lsof -t -i:3000

    - graceful kill
      sudo kill $(lsof -t -i:3000)

    -force kill if needed
      sudo kill -9 $(lsof -t -i:3000)

    - alternative
      sudo fuser -k 3000/tcp

    - if it's your Node app and you want to kill by name
      pkill -f 'node.*src/app.js'

    - verify it's gone
      lsof -i :3000 || echo "no process on port 3000"

# Routing order is important.

- ? -> means optional (use () for multiple params)
- - -> means minimum one param
- - -> any number of parameters.
- /a/ -> regex it will work if path contains a inside it
-

# Regular Expressions

  . — any single character except newline
  Example: /a.c/ matches "abc", "a-c"

  ^ — start of string
  Example: /^a/ matches "a..." at start

  $ — end of string
  Example: /a$/ matches "...a" at end

  — 0 or more of previous token (greedy)
  Example: /ab*c/ matches "ac", "abc", "abbbc"
  — 1 or more of previous token (greedy)
  Example: /ab+c/ matches "abc", "abbbc" but not "ac"
  ? — 0 or 1 of previous token (or makes quantifier lazy when after it)
  Example: /ab?c/ matches "ac" or "abc"
  Example lazy: /a.*?b/ matches smallest span between a and b

  {n}, {n,}, {n,m} — exact / min / range quantifiers
  Example: /a{2,4}/ matches "aa", "aaa", "aaaa"

  [] — character class (use - for ranges); [^ ] negates
  Example: /[aeiou]/ matches any vowel

  () — capturing group; (?: ) non-capturing group
  Example: /(ab)+/ captures repeated "ab"

  | — alternation (OR)
  Example: /cat|dog/ matches "cat" or "dog"

  \ — escape special chars or use shorthand classes
  \d digit, \D non-digit, \w word char [A-Za-z0-9_], \W non-word, \s whitespace, \S non-whitespace
  \b word boundary, \B non-boundary

  (?=...), (?!...) — positive / negative lookahead
  Example: /foo(?=bar)/ matches "foo" only if followed by "bar"

  (?<=...), (?<!...) — lookbehind (supported in modern JS)
  Example: /(?<=$)\d+/ matches digits preceded by $

  Flags: i (ignore case), g (global), m (multiline), s (dotAll), u (unicode), y (sticky)

# Middleware
  - Whenever a api call is made it goes through the chain of functions(middlewares) untill it reaches a function(Request-handler) which sends back the response.
  - There can be many middlewares.
  - There can also be many route handlers but only a single route hanlder handles the request for a particular route
  - Use cases
    - Middlewares used to check whether the api call is made by authorised user or not.

# Database
  - instances of Models are documents
  - 

# Resources
 - mongoose documentation
 - libuv documentation
 - 