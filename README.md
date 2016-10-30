# HEIG.TWEB.Project01

## Descripiton
GitHubExplorer let you see some statistics about the repositories of your choice. Like :

- Users participation
- Commits per users
- Activities in time

These statistics are going to be saved in a database so you can look at previous requests.
The idea in this project is to learn web technologies by using :

- Jekyll
- Git
- AngularJs
- Chartjs
- MongoDB
- Grunt
- Jquery
- Express
- Bootstrap
- Node
- Heroku
- ui-router
- npm

And the following languages :

- Javascript
- HTML
- CSS

We also are using asynchronous programming with promises.
All the data you'll see are directly from the GitHub API

## Landing page
You can jump in the application landing page with the 
following link :
https://mathieuurstein.github.io/HEIG.TWEB.Project01/

## GitHubExplorer page
If you want to go directly to the GitHubExplorer app page, you can by 
following this link :
https://heig-tweb-projet01.herokuapp.com/

## Installation

### Pre dependencies
first be sure to have the following technologies installed :

- git
- grunt
- jekyll
- node
- npm
- docker

### Clone
then you can clone this repo with the following command :

    $ git clone git@github.com:MathieuUrstein/HEIG.TWEB.Project01.git

### Post dependencies
Now that you have the repo and npm, you can install all the needed 
dependencies by typing the following command :

    $ npm install

### Landing page
The landing page is made differently than the rest of the app.
This is because it will be hosted on github using Jekyll.

If you want to edit it, you have to go the gh-pages branch

    $ git checkout gh-pages
    $ git pull
    
Then, if you want to see the changes you do, you have to set the following
command to start a server (the local server adress will be shown in
the console).

    $ bundle exec jekyll serve
    
The compiled website will be found in 

    _site/
    
### GitHubExplorer
Once you have installed all dependencies, you can watch every new
modifications to be taken with :

    $ grunt watch
    
or if you want to manually do it just type :

    $ grunt
    
The visible part of the application can be found in the following
folder :

    public/
    
If you want to serve the application dynamically with node and therefore
benefits the history capabilities, you have to start a mongodb instance.
You can do it with the following command :

    $ docker build -t mongogithubexplorer .
    $ docker run -p 27017:27017 mongogithubexplorer
    
optionally you can try to connect to mongodb using :

    $ mongo
    
Then start the server with :

    $ node index.js
    
the app will be accssible at the following url :
http://localhost:5000/

## Configuration
The configuration variables can be found in the /index.js file.


## Sources
- Template :
https://startbootstrap.com/template-overviews/landing-page/
- Style guide :
https://github.com/johnpapa/angular-styleguide

## Authors
- Sébastien Boson
- Mathieu Urstein

## License
MIT