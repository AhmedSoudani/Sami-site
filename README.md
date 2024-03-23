# CS50 Web Final Project!
---
## Site overview
---
So, basically my dad is a technology professor he inspired me to create this topic!
A technology websites that can be a converter of bases (eg..from Hexa to binary) Also gives you the ability to test your knowledge in convertion between bases with MCQ 
also you can view my dad's books that can help you in the conversion and many more (they are in french)
- login/logout/Register 
- view books  
- converter 
- MCQ 

## Distinctiveness and Complexity
---
The project was built using Django as a backend framework and JavaScript as a frontend programming language. All generated information are saved in database (SQLite by default).
As i mentioned this website inspired from my father's topic, it's not similar to any project already done(e-commerce, network...)
i used Three Django models in the back-end and 9 JavaScript Functions in the front-end (all the JS code was in the same file)
And this website is a mobile-responsive

## Files Section
---
- `Sami-site`:contains the Django project
  - `technique`
    - `tech`
    - `static`
      - the three images for: logo, website icon ,reward(after finishing the MCQ successfully)
      - `style.css`: contains all the style code
      - `main.js`: contains the functions let's break them down:
        - `MCQ`: it's the funtion that runs after clicking on start(to get a random question and displays it in the page)
        - `get_question`: the funtion that checks the validity of the response
        - `swap_it`: to checks if the user select two bases to swap or not if yes he'll run `swapOptions`
        - `swapOptions`: to swap two bases
        - `convert_it`: to give the `convertBase` the parameters of the two bases
        - `convertBase`: to convert a number from one base two another
        - `congrats`: that display the congrats div in case of winning
        - `levelsfroms`: the function that runs right after the start button
        - `verify`: to checks the validity of an number two convert it.
    - `templates`
      - `index.html`: to view the books recommended
      - `convert.html`: the page that displays the different bases
      - `layout.html`: handles all the pages
      - `levels.html`: all the MCQ stuffs runs here(i used the single-page application)
      - `register.html`: to register for an new account
      - `login.html`: to login if you already have an account
    - `models.py`: i used Three models
      - `User`: for login and register cases
      - `Exercice`: contains all of the exercices from all the different levels
      - `Books`: that contains informations of the books
    - `urls.py`: contains 7 different paths
    - `views`: contains all of the applications views


[Click here to see the demo video]()
