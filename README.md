## STAR WARS API
This is a rails app that communicates with the star wars api at https://swapi.co/ to show star wars related information. It also caches the 'people' and 'species' resources in postgres. 

### Table of contents
- Discussion
- Build Steps

### Discussion
Some points on engineering / code decisions:
- In most situations, simplicity and ease were favored over abstractions - this allowed for faster development since the scope of this project is relatively small
- Rails Models and Controllers focus on data storage and retrieval and do not go far beyond that in terms of data validation and error handling - this was to devote more time to working on the front-end and to implement features that made the most sense
- Tests were completely skipped - again, this was to devote more time to building the app - I'm a strong believer in TDD. If tests were implemented, it would've increased development time by at least 1.5 times
- The auto generated `pages.scss` file was used to include all styles - this let me avoid having to customize the build process for webpack/webpacker and let Rails automatically handle it. This was fine since the scope was small, all the css rules come up to ~100 lines of code. In a production situation I'd create a CSS folder structure that matches the React components - or to use the React javascript styles and include them with the component files.
- Redux was not used for this project for two primary reasons: (1) the application data was not complex (2) the home component was pretty much the parent of everything, so it was easy to pass down props. In fact, React-Router wasn't even needed since the app is just 1 page - it was added initially but then I realized it wasn't necessary.
- Small note on the Models' `as_json` methods: although they are identical at this point, my inituition is that this is one of those scenarios where things start out very similar, but then quickly become very different. Therefore, I decided it's best for each Model to have it's own `as_json` method - otherwise an abstraction would be built today that will quickly become useless and entail other side-effects (I'm happy to discuss this further in-person). Even in a production app my philosophy is the same: only start adding abstractions when I consistently see recurrening method implementations.

### Build Steps
- Clone the repo
- Ensure Rails (5.1+), Bundler, Yarn, and NPM are installed
- Run `bundle install` in a CLI (terminal, iTerm, etc...) - this will download all dependencies
- Building the front-end options: 
  - (1) to build the front-end bundle 1 time run `./bin/webpack`
  - (2) to build the front-end bundle in watch mode so that it is rebuilt when changes are made to Javascript files run `./bin/webpack --watch` (requires a manual refresh of the browswer)
  - (3) to build the front-end bundle with webpack server - this will automatically rebuild the bundle and refresh the browser when changes are made to Javascript files - run `./bin/webpack-dev-server --watch`
- Run `rails s` to start the rails server - this will start the rails server and serve the last built front-end bundle
- Navigate to `localhost:3000` to use the app
