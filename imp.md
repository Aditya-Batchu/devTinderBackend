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