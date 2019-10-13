Carson Cass
500821516

CPS 511 Computer Graphics (Assignment 1)
========================================
This project uses:
    webGL
    gl-matrix [https://www.npmjs.com/package/gl-matrix] (library for matrix manipulation)
    typescript
    webpack
    and was written in VSCode (with ESLint for syntax highlighting).

Structure:
    The src folder contains all the code used for webGL.
    src/index.ts would be main.cpp

    The dist folder contains an html page and a script (main.js).
    main.js is just a minified version of all the code in the src folder that index.html refrerences.

Running
=======
Option 1:
    Open dist/index.html in a web browser (this will use the pre-compiled main.js)
    or visit http://carsoncass.com

Option 2: (Compile yourself)
    1. Install nodeJS  (https://nodejs.org/en/)

    (At the project root)
    2. Run 'npm install' (node package manager will install all the dependencies)
    3. Run 'npm run dev' to open a live development server (should open a browser window,
    any changes made to src will be applied automatically when you save a file)
    

