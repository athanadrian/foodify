# Foodify

#### Track Your Cyprus Foody-Place Search

Project in Action - [Foodify](https://foodify-tour.herokuapp.com/)

#### Run The App Locally

```sh
npm run install-dependencies
```

- rename .env.temp to .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_EXPIRE

```sh
npm start
```

- visit url http://localhost:3000/

#### Setup React App

- create <b>client</b> folder
- open terminal

```sh
cd client
```

```sh
npx create-react-app .
```

```sh
npm start
```

- set editor/browser side by side
- copy/paste assets from complete project

#### Spring Cleaning

- in src remove
- App.css
- App.test.js
- logo.svg
- reportWebVitals.js
- setupTests.js
- fix App.js and index.js

#### Title and Favicon

- change title in public/index.html
- replace favicon.ico in public
- resource [Generate Favicons](https://favicon.io/)

#### Normalize.css and Global Styles

- CSS in JS (styled-components)
- saves times on the setup
- less lines of css
- speeds up the development
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- [normalize docs](https://necolas.github.io/normalize.css/)

```sh
npm install normalize.css
```

- import 'normalize.css' in index.js
- SET BEFORE 'index.css'

### Set Global CSS

Manual Approach

- [coolors](https://coolors.co/)
- [happyhues](https://www.happyhues.co/)
- select your own color
- get shades [shadowlord](https://noeldelgado.github.io/shadowlord/#73fdad)

Faster Approach (Library)

- [bootstrap](https://getbootstrap.com/docs/5.0/customize/color/#color-sass-maps)
- [tailwind](https://tailwindcss.com/docs/customizing-colors#color-palette-reference)

#### Select Grey

- [tailwind](https://tailwindcss.com/docs/customizing-colors#color-palette-reference)

#### Just go with happyhues

- [happyheus](https://www.happyhues.co/)

#### Box Shadow

- [tailwind](https://tailwindcss.com/docs/box-shadow)

#### Landing Page

- markdown preview extension
- get something on the screen
- react router and styled components right after
- create pages directory in the source
- for now Landing.js
- create component (snippets extension)
- setup basic return

```js
<h4>Landing Page<h4>
```

- import logo.svg and main.svg
- import Landing in App.js and render

#### Styled Components

- CSS in JS
- Styled Components
- have logic and styles in component
- no name collisions
- apply javascript logic
- [Styled Components Docs](https://styled-components.com/)
- [Styled Components Course](https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F)

```sh
npm install styled-components
```

```js
import styled from 'styled-components';

const El = styled.el`
  // styles go here
`;
```

- no name collisions, since unique class
- vscode-styled-components extension
- colors and bugs
- style entire react component

#### Logo and Images

- logo built in Figma
- [Cool Images](https://undraw.co/)

#### React Router

- Version 6
- [React Router Docs](https://reactrouter.com/docs/en/v6)

```sh
npm install history@5 react-router-dom@6
```

- import four components

```js
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
```

- Connect to browser's URL with BrowserRouter
- Routes instead of Switch

```js

<BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<div>Error</div>}>
    </Routes>
</BrowserRouter>

```

```js
<nav>
  <Link to='/'>Dashboard</Link>
  <Link to='/register'>Register</Link>
  <Link to='/landing'>Home</Link>
</nav>
```

- go to Landing.js

```js
import { Link } from 'react-router-dom';

return (
  <Link to='/register' className='btn btn-hero'>
    Login / Register
  </Link>
);
```

#### Setup Pages

- create Error, Register, Dashboard pages
- basic return
- create index.js
- import all the pages
- export one by one
- basically the same, as in components
- import App.js
- add to element={}
- remove temp navbar

#### Error Page

```js
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

return (
  <Wrapper className='full-page'>
    <div>
      <img src={img} alt='not found' />
      <h3>text</h3>
      <p>text</p>
      <Link to='/'>back home</Link>
    </div>
  </Wrapper>
);
```

#### Auto Imports

- use while developing
- only sparingly while recording
- better picture
- messes with flow
- just my preference
- still use them, just not all the time

#### Register Page - Setup

- show preview in Browser and themes

```js
import { useState, useEffect } from 'react';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState);

  // global context and useNavigate later

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>

        {/* name field */}
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  );
}
```

#### FormRow Component

- create FormRow.js in <b>components</b>
- setup import/export
- setup one for email and password
- hint "type,name,value"

```js
const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
};

export default FormRow;
```

#### Alert Component

- right away setup as component
- create Alert.js in <b>components</b>

```js
const Alert = () => {
  return <div className='alert alert-danger'>alert goes here</div>;
};

export default Alert;
```

- setup import/export
- alert-danger or alert-success
- eventually setup in global context
- showAlert in initialState (true || false)
- right after h3 login

```js
values.showAlert && <Alert />;
```

#### Toggle Member

```js
const toggleMember = () => {
  setValues({ ...values, isMember: !values.isMember });
};

return (
  <Wrapper>
    {/* control h3 */}

    <h3>{values.isMember ? 'Login' : 'Register'}</h3>

    {/* toggle name */}

    {!values.isMember && (
      <FormRow
        type='text'
        name='name'
        value={values.name}
        handleChange={handleChange}
      />
    )}

    {/* right after submit btn */}
    {/* toggle button */}

    <p>
      {values.isMember ? 'Not a member yet?' : 'Already a member?'}

      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
    </p>
  </Wrapper>
);
```

#### Global Context

- in src create <b>context</b> directory
- actions.js
- reducer.js
- appContext.js

```js
import React, { useState, useReducer, useContext } from 'react';

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
```

- index.js

```js
import { AppProvider } from './context/appContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- Register.js

```js
import { useAppContext } from '../context/appContext';

const { isLoading, showAlert } = useAppContext();
```

- switch to global showAlert

#### useReducer

- [React Tutorial](https://youtu.be/iZhV0bILFb0)
- useReducer vs Redux
- multiple reducers vs one

#### Wire Up Reducer

```js
reducer.js;

const reducer = (state, action) => {
  throw new Error(`no such action :${action.type}`);
};
export default reducer;
```

```js
appContext.js;

import reducer from './reducer';

const [state, dispatch] = useReducer(reducer, initialState);
```

#### Display Alert

```js
actions.js;

export const DISPLAY_ALERT = 'SHOW_ALERT';
```

- setup imports (reducer and appContext)

```js
appContext.js

const displayAlert() =>{
  dispatch({type:DISPLAY_ALERT})
}

```

```js
reducer.js;

if (action.type === DISPLAY_ALERT) {
  return {
    ...state,
    showAlert: true,
    alertType: 'danger',
    alertText: 'Please provide all values!',
  };
}
```

```js
Alert.js in Components;

import { useAppContext } from '../context/appContext';

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
```

#### Display Alert

- [JS Nuggets - Dynamic Object Keys](https://youtu.be/_qxCYtWm0tw)

```js
appContext.js;

const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};
```

- get displayAlert function

```js
appContext.js;

const onSubmit = (e) => {
  e.preventDefault();
  const { name, email, password, isMember } = values;
  if (!email || !password || (!isMember && !name)) {
    displayAlert();
    return;
  }
  console.log(values);
};
```

#### Clear Alert

- technically optional

```js
actions.js;

export const CLEAR_ALERT = 'CLEAR_ALERT';
```

- setup imports (reducer and appContext)

```js
reducer.js;

if (action.type === CLEAR_ALERT) {
  return {
    ...state,
    showAlert: false,
    alertType: '',
    alertText: '',
  };
}
```

```js
appContext.js;

const displayAlert = () => {
  dispatch({
    type: DISPLAY_ALERT,
  });
  clearAlert();
};

const clearAlert = () => {
  setTimeout(() => {
    dispatch({
      type: CLEAR_ALERT,
    });
  }, 3000);
};
```

#### Setup Server

- stop the dev server in client
- cd ..
- start setting up our server
- setup package.json

```sh
npm init -y
```

- create server.js
- console.log('server running...')

```sh
node server
```

#### ES6 vs CommonJS

### How to Use ES6

```js
CommonJS;

const express = require('express');
const app = express();
```

```js
How to Use ES6

import express from 'express'
const app = express()
```

- file extension .mjs

```js
package.json

"type":"module"
```

#### Nodemon and Basic Express Server

```sh
npm install nodemon --save-dev
or
npm i g nodemon (use it globally)
```

```js
package.json

"start":"nodemon server"

```

```sh
npm install express
```

```js
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

#### Not Found Middleware

- in the root create <b>middleware</b> folder
- not-found.js
- setup function
- return 404 with message 'Route does not exist'
- import in server.js
- make sure to use .js extension
- place after home route

#### Error Middleware

- in the middleware create error-handler.js
- setup function
- accept 4 parameters, first one error
- log error
- return 500
- json({msg:'there was an error'})
- import in the server.js
- make sure to use .js extension
- place it last
- eventually handle Mongoose Errors, just like in the node-express
- showcase with async errors

#### ENV Variables

```sh
npm install dotenv
```

- import dotenv from 'dotenv'
- dotenv.config()

- create .env
- PORT=5000
- create .gitignore
- Add to .gitignore (/node_modules), (.env)

#### Connect to MongoDB

- remove Error from '/'

- existing MongoDB Atlas Account

```sh
npm install mongoose
```

- create <b>db</b> folder
- create connect.js
- setup connectDB(url)
- in server.js import connectDB
- use connectDB() function
- get connection string
- setup as MONGO_URL in .env
- provide credentials and DB Name

#### Auth Controller and Route Structure

- create <b>controllers</b>
- authController.js
- create async functions

```js
export { register, login, updateUser };
```

- return res.send('function name')
- create <b>routes</b> folder
- authRoutes.js
- setup express router
- import functions from authController.js

```js
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);

export default router;
```

- import authRouter in server.js

```js
app.use('/api/v1/auth', authRouter);
```

#### Place Controller and Route Structure

- placesController.js
- create async functions

```js
export { createPlace, deletePlace, getAllPlaces, updatePlace, showStats };
```

- return res.send('function name')

- placesRoutes.js
- setup express router
- import functions from placesController.js

```js
router.route('/').post(createPlace).get(getAllPlaces);
// place before :id
router.route('/stats').get(showStats);
router.route('/:id').get(getPlace).delete(deletePlace).patch(updatePlace);

export default router;
```

- in server.js placesRouter

```js
app.use('/api/v1/places', placesRouter);
```

#### Postman

- URL global var
- FOODIFY Collection
- auth and Places folders
- setup routes

#### User Model

- <b>models</b> folder
- User.js
- setup schema
- name, email, password, lastName, location
- all {type:String}

#### Validate Email

```js
validate:{
  validator:(field)=> {return 2 > 1},
  message:'Please provide valid email'
  }
```

- [Validator Package](https://www.npmjs.com/package/validator)

```sh
npm install validator
```

- import in User.js
- validator.isEmail

#### Register User - Initial Setup

- authController
- import User model
- setup temporary try/catch
- await User.create(req.body)
- if success 201 with json({user}) (temp)
- if error 500 with json({msg:'there was an error'})

#### Pass Error to Error Handler

- next(error)

#### Express-Async-Errors Package

- remove try/catch
- [Express-Async-Errors](https://www.npmjs.com/package/express-async-errors)

```sh
npm install express-async-errors

```

- in server.js
- import 'express-async-errors'

- use throw Error('error') instead of next(error)

#### Http Status Codes

- constants for status codes
- personal preference
- provides consistency
- less bugs
- easier to read/manage

- [Http Status Codes](https://www.npmjs.com/package/http-status-codes)

```sh
npm install http-status-codes
```

- import/setup in authController and error-handler
- setup defaultError

#### Custom Errors

#### Refactor Errors

- create errors folder
- create custom-api, bad-request, not-found, index.js files
- add proper imports
- setup index.js just like in the front-end
- import {BadRequestError} in authController
- gotcha "errors/index.js"

#### Hash Passwords

- one way street, only compare hashed values
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)

```sh
npm install bcryptjs
```

- User Model
- import bcrypt from 'bcryptjs'
- await genSalt(10)
- await hash(password , salt)
- await compare(requestPassword , currentPassword)
- [mongoose middleware](https://mongoosejs.com/docs/middleware.html)
- UserSchema.pre('save',async function(){
  "this" points to instance created by UserSchema
  })

#### Mongoose - Custom Instance Methods

[Custom Instance Methods](https://mongoosejs.com/docs/guide.html#methods)

- UserSchema.methods.createJWT = function(){console.log(this)}
- register controller
- right after User.create()
- invoke user.createJWT()

#### JWT

- token
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```sh
npm install jsonwebtoken
```

- User Model
- import jwt from 'jsonwebtoken'
- jwt.sign(payload,secret,options)
- createJWT

```js
return jwt.sign({ userId: this._id }, 'jwtSecret', { expiresIn: '1d' });
```

```js
return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_LIFETIME,
});
```

#### JWT_SECRET and JWT_LIFETIME

- [Keys Generator](https://www.allkeysgenerator.com/)
- RESTART SERVER!!!!

#### Complete Register

- password : {select:false}
- complete response

#### Concurrently

- front-end and backend (server)
- run separate terminals
- [concurrently](https://www.npmjs.com/package/concurrently)

```sh
npm install concurrently --save-dev

```

- package.json

```js
// --kill-others switch, all commands are killed if one dies
// --prefix client - folder
// cd client && npm start
// escape quotes

"scripts": {
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
  },
```

#### Cors Error

[Cors Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- two fixes (cors package and proxy)

#### Cors Package

[cors package](https://www.npmjs.com/package/cors)

```sh
npm install cors
```

```js
import cors from 'cors';

app.use(cors());
```

#### Proxy

- access from anywhere
- don't want to use full url

[cra proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

```js
"proxy":"http://localhost:5001"
```

- my preference to remove trailing slash /
- restart app

#### Register User - Setup

```js
appContext.js;

const initialState = {
  user: null,
  token: null,
  userLocation: '',
};
```

- actions.js REGISTER_USER_BEGIN,SUCCESS,ERROR
- import reducer,appContext

```js
appContext.js;
const registerUser = async (currentUser) => {
  console.log(currentUser);
};
```

- import in Register.js

```js
Register.js;

const currentUser = { name, email, password };
if (isMember) {
  console.log('already a member');
} else {
  registerUser(currentUser);
}

return (
  <button type='submit' className='btn btn-block' disabled={isLoading}>
    submit
  </button>
);
```

#### Axios

- [axios docs](https://axios-http.com/docs/intro)
- stop app
- cd client

```sh
npm install axios
```

- cd ..
- restart app

#### Register User - Complete

```js
appContext.js;

import axios from 'axios';

const registerUser = async (currentUser) => {
  dispatch({ type: REGISTER_USER_BEGIN });
  try {
    const response = await axios.post('/api/v1/auth/register', currentUser);
    console.log(response);
    const { user, token, location } = response.data;
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: {
        user,
        token,
        location,
      },
    });

    // will add later
    // addUserToLocalStorage({
    //   user,
    //   token,
    //   location,
    // })
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: REGISTER_USER_ERROR,
      payload: { msg: error.response.data.msg },
    });
  }
  clearAlert();
};
```

```js
reducer.js;
if (action.type === REGISTER_USER_BEGIN) {
  return { ...state, isLoading: true };
}
if (action.type === REGISTER_USER_SUCCESS) {
  return {
    ...state,
    user: action.payload.user,
    token: action.payload.token,
    userLocation: action.payload.location,
    foodyLocation: action.payload.location,
    isLoading: false,
    showAlert: true,
    alertType: 'success',
    alertText: 'User Created! Redirecting...',
  };
}
if (action.type === REGISTER_USER_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  };
}
```

#### Change State Values With Handle Change

- [JS Nuggets Dynamic Object Keys](https://youtu.be/_qxCYtWm0tw)

#### Create More Foodys

- [Mockaroo](https://www.mockaroo.com/)
- setup mock-data.json in the root

#### Populate Database

- create populate.js in the root

```js
populate.js;

import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Foody from './models/Foody.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Foody.deleteMany();

    const jsonFoodys = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );
    await Foody.create(jsonFoodys);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
```

#### Show Stats - Structure

- aggregation pipeline
- step by step
- [Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)

```js
foodysController.js;

import mongoose from 'mongoose';

const showStats = async (req, res) => {
  let stats = await Foody.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.status(StatusCodes.OK).json({ stats });
};
```

#### Show Stats - Object Setup

- [Reduce Basics](https://youtu.be/3WkW9nrS2mw)
- [Reduce Object Example ](https://youtu.be/5BFkp8JjLEY)

```js
foodysController.js;

const showStats = async (req, res) => {
  let stats = await Foody.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  res.status(StatusCodes.OK).json({ stats });
};
```

#### Show Stats - Default Stats

```js
foodysController.js;

const showStats = async (req, res) => {
  let stats = await Foody.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = [];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

#### Show Stats - Function Setup

```js
actions.js;

export const SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN';
export const SHOW_STATS_SUCCESS = 'SHOW_STATS_SUCCESS';
```

```js
appContext.js

const initialState = {
  stats: {},
  monthlyApplications: []

}

const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/foodys/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
console.log(error.response)
      // logoutUser()
    }

clearAlert()
  }
  value={{showStats}}
```

```js
reducers.js;
if (action.type === SHOW_STATS_BEGIN) {
  return { ...state, isLoading: true, showAlert: false };
}
if (action.type === SHOW_STATS_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    stats: action.payload.stats,
    monthlyApplications: action.payload.monthlyApplications,
  };
}
```

#### Stats Page - Structure

- components
- StatsContainer.js
- ChartsContainer.js
- StatsItem.js
- simple return
- import/export index.js

```js
Stats.js;

import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
```

#### StatsContainer

```js
StatsContainer.js;

import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'foodys declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
```

#### StatItem

```js
StatItem.js;

import Wrapper from '../assets/wrappers/StatItem';

function StatItem({ count, title, icon, color, bcg }) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <div className='icon'>{icon}</div>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
}

export default StatItem;
```

#### Aggregate Foodys Based on Year and Month

```js
foodysController.js;
const username = req.params;
const user = await User.findOne({ username });

let monthlyApplications = await Foody.aggregate([
  { $match: { createdBy: mongoose.Types.ObjectId(user._id) } },
  {
    $group: {
      _id: {
        year: {
          $year: '$createdAt',
        },
        month: {
          $month: '$createdAt',
        },
      },
      count: { $sum: 1 },
    },
  },
  { $sort: { '_id.year': -1, '_id.month': -1 } },
  { $limit: 6 },
]);
```

#### Refactor Data

- install moment.js on the SERVER

```sh
npm install moment

```

```js
foodysController.js;

import moment from 'moment';

monthlyApplications = monthlyApplications
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    // accepts 0-11
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y');
    return { date, count };
  })
  .reverse();
```

#### Charts Container

- BarChart.js
- AreaChart.js

```js
ChartsContainer.js;
import React, { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'AreaChart' : 'BarChart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
}
```

#### Recharts Library

- install in the Client!!!

[Recharts](https://recharts.org)

```sh
npm install recharts
```

#### Bar Chart

```js
BarChart.js;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#2cb1bc' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
```

#### Area Chart

```js
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
```

#### Filter

#### Get All Foodys - Initial Setup

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // NO AWAIT
  let result = Foody.find(queryObject);

  // chain sort conditions

  const foodys = await result;

  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
```

#### Status

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status !== 'all') {
    queryObject.status = status;
  }

  // NO AWAIT
  let result = Foody.find(queryObject);

  // chain sort conditions

  const foodys = await result;

  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
```

#### FoodyType

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status !== 'all') {
    queryObject.status = status;
  }
  if (foodyType !== 'all') {
    queryObject.foodyType = foodyType;
  }
  // NO AWAIT
  let result = Foody.find(queryObject);

  // chain sort conditions

  const foodys = await result;

  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
```

#### Search

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status !== 'all') {
    queryObject.status = status;
  }
  if (foodyType !== 'all') {
    queryObject.foodyType = foodyType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT
  let result = Foody.find(queryObject);

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }
  const foodys = await result;

  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
```

#### Search Context Setup

```js
appContext.js

const initialState = {
  foodyType: 'full-time',
  foodyTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  status: 'pending',
  statusOptions: ['pending', 'interview', 'declined']
  //
  //
  //
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const clearFilters = () =>{
console.log('clear filters')
}

value={{clearFilters}}

// remember this function :)
const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }

```

#### Search Container - Setup

```js
SearchContainer.js;

import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    foodyTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          {/* rest of the inputs */}
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
```

#### Search Container - Complete

```js
SearchContainer.js;

import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    handleChange,
    searchStatus,
    statusOptions,
    foodyTypeOptions,
    searchType,
    clearFilters,
    sort,
    sortOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          {/* search by status */}
          <FormRowSelect
            labelText='foody status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          ></FormRowSelect>
          {/* search by type */}

          <FormRowSelect
            labelText='foody type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...foodyTypeOptions]}
          ></FormRowSelect>
          {/* sort */}

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
```

#### Clear Filters

```js
actions.js;

export const CLEAR_FILTERS = 'CLEAR_FILTERS';
```

```js
appContext.js;

const clearFilters = () => {
  dispatch({ type: CLEAR_FILTERS });
};
```

```js
reducer.js;

if (action.type === CLEAR_FILTERS) {
  return {
    ...state,
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
  };
}
```

#### Refactor Get All Foodys

```js
const getFoodys = async () => {
  // will add page later
  const { search, searchStatus, searchType, sort } = state;
  let url = `/foodys?status=${searchStatus}&foodyType=${searchType}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  dispatch({ type: GET_JOBS_BEGIN });
  try {
    const { data } = await authFetch(url);
    const { foodys, totalFoodys, numOfPages } = data;
    dispatch({
      type: GET_JOBS_SUCCESS,
      payload: {
        foodys,
        totalFoodys,
        numOfPages,
      },
    });
  } catch (error) {
    // logoutUser()
  }
  clearAlert();
};
```

```js
FoodysContainer.js

const FoodysContainer = () => {
  const {
    getFoodys,
    foodys,
    isLoading,
    page,
    totalFoodys,
    search,
    searchStatus,
    searchType,
    sort,

  } = useAppContext()
  useEffect(() => {
    getFoodys()
  }, [ search, searchStatus, searchType, sort])

```

#### Limit and Skip

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (foodyType !== 'all') {
    queryObject.foodyType = foodyType;
  }
  let result = Foody.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  const totalFoodys = await result;

  // setup pagination
  const limit = 10;
  const skip = 1;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2
  const foodys = await result;
  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
```

#### Page and Limit

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (foodyType !== 'all') {
    queryObject.foodyType = foodyType;
  }
  let result = Foody.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);
  // 75
  // 10 10 10 10 10 10 10 5
  const foodys = await result;
  res
    .status(StatusCodes.OK)
    .json({ foodys, totalFoodys: foodys.length, numOfPages: 1 });
};
```

#### Total Foodys and Number Of Pages

```js
foodysController.js;

const getAllFoodys = async (req, res) => {
  const { search, status, foodyType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (foodyType !== 'all') {
    queryObject.foodyType = foodyType;
  }
  let result = Foody.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const foodys = await result;

  const totalFoodys = await Foody.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFoodys / limit);

  res.status(StatusCodes.OK).json({ foodys, totalFoodys, numOfPages });
};
```

#### PaginationContainer Setup

- PaginationContainer.js

```js
FoodysContainer.js;

import PaginationContainer from './PaginationContainer';

const { numOfPages } = useAppContext();

return (
  <Wrapper>
    <h5>
      {totalFoodys} foody{foodys.length > 1 && 's'} found
    </h5>
    <div className='foodys'>
      {foodys.map((foody) => {
        return <Foody key={foody._id} {...foody} />;
      })}
    </div>
    {numOfPages > 1 && <PaginationContainer />}
  </Wrapper>
);
```

#### PaginationContainer - Structure

```js
PaginationContainer.js;

import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PaginationContainer';

const PageButtonContainer = () => {
  const { numOfPages, page } = useAppContext();

  const prevPage = () => {
    console.log('prev page');
  };
  const nextPage = () => {
    console.log('next page');
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className='btn-container'>buttons</div>

      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;
```

#### Button Container

- [Array.from] (https://youtu.be/zg1Bv4xubwo)

```js
PaginationContainer.js;

const pages = Array.from({ length: numOfPages }, (_, index) => {
  return index + 1;
});

return (
  <div className='btn-container'>
    {pages.map((pageNumber) => {
      return (
        <button
          type='button'
          className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
          key={pageNumber}
          onClick={() => console.log(page)}
        >
          {pageNumber}
        </button>
      );
    })}
  </div>
);
```

#### Change Page

```js
actions.js;
export const CHANGE_PAGE = 'CHANGE_PAGE';
```

```js
appContext.js
const changePage = (page) => {
  dispatch({ type: CHANGE_PAGE, payload: { page } })
}
value={{changePage}}
```

```js
reducer.js;

if (action.type === CHANGE_PAGE) {
  return { ...state, page: action.payload.page };
}
```

```js
PaginationContainer.js;

const { changePage } = useAppContext();
return (
  <button
    type='button'
    className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
    key={pageNumber}
    onClick={() => changePage(pageNumber)}
  >
    {pageNumber}
  </button>
);
```

#### Prev and Next Buttons

```js
PaginationContainer.js;
const prevPage = () => {
  let newPage = page - 1;
  if (newPage < 1) {
    // newPage = 1
    // alternative
    newPage = numOfPages;
  }
  changePage(newPage);
};
const nextPage = () => {
  let newPage = page + 1;
  if (newPage > numOfPages) {
    // newPage = numOfPages
    // alternative
    newPage = 1;
  }
  changePage(newPage);
};
```

#### Trigger New Page

```js
appContext.js;

const getFoodys = async () => {
  const { page, search, searchStatus, searchType, sort } = state;

  let url = `/foodys?page=${page}&status=${searchStatus}&foodyType=${searchType}&sort=${sort}`;
  // rest of the code
};
```

```js
FoodysContainer.js;

const { page } = useAppContext();
useEffect(() => {
  getFoodys();
}, [page, search, searchStatus, searchType, sort]);
```

```js
reducer.js;

if (action.type === HANDLE_CHANGE) {
  // *****IMPORTANT******
  // set back to first page

  return { ...state, page: 1, [action.payload.name]: action.payload.value };
}
```

```js
// Calculate Distance from Home/Current location
// EXTERNAL package

npm install geolib

import { getDistance, getPreciseDistance } from 'geolib';


export const getFoodyDistance = (user, foody) => {
  return getDistance(
    { latitude: user.lat, longitude: user.lng },
    { latitude: foody.lat, longitude: foody.lng }
  );
};

export const getPreciseFoodyDistance = (user, foody) => {
  return getPreciseDistance(
    { latitude: user.lat, longitude: user.lng },
    { latitude: foody.lat, longitude: foody.lng }
  );
};

// Calculate Distance from Home/Current location
// Math calculations

// Calculate radius using radians
// Divide distance by radius of Earth
// Earth radius = 3,963 mi / 6,378 km

export const computeDistance = (user, foody) => {
  const prevLatInRad = toRad(user.lat);
  const prevLongInRad = toRad(user.lng);
  const latInRad = toRad(foody.lat);
  const longInRad = toRad(foody.lng);

  const distance =
    // In kilometers
    6377.830272 *
    // In Miles
    // 3,963 *
    Math.acos(
      Math.sin(prevLatInRad) * Math.sin(latInRad) +
        Math.cos(prevLatInRad) *
          Math.cos(latInRad) *
          Math.cos(longInRad - prevLongInRad)
    );
  return distance.toFixed(2);
};
```

#### request google maps api key

```js
// SERVER
// server.js
app.use('/api/v1/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
// CLIENT

//foodyContext

 const getGoogleApiKey = async () => {
    try {
      const { data } = await clientApi.get('/config/google');
      dispatch({ type: GET_GOOGLE_API_KEY, payload: { key: data } });
    } catch (error) {
      console.log('Google API Key Error: ', error);
    }
  };

 useEffect(() => {
    getGoogleApiKey();
    eslint-disable-next-line
  }, []);

  return (
    <FoodyContext.Provider
      value={{
        ...state,
      ...
        getGoogleApiKey,
      ...
      }}
    >
      {children}
    </FoodyContext.Provider>
  );
```

#### Production Setup - Fix Warnings and logoutUser

- getFoodys,deleteFoody,showStats - invoke logoutUser()
- fix warnings

```sh
// eslint-disable-next-line
```

#### Notification Functions

```js
const removeLikeNotification = async (userId, foodyId, userToNotifyId) => {
  // the owner/creator of the foody
  const userToNotify = await Notification.findOne({ toUser: userToNotifyId });

  const notificationToRemove = userToNotify.notifications.find(
    (notification) =>
      notification.type === 'newLike' &&
      notification.foody.toString() === foodyId &&
      notification.fromUser.toString() === userId
  );

  // REMOVE OBJ FROM OBJs ARRAY
  const indexOf = userToNotify.notifications.map((notification) =>
    notification._id.toString().indexOf(notificationToRemove._id.toString())
  );

  userToNotify.notifications.slice(indexOf, 1);

  // OTHER WAY TO REMOVE WITH MONGODB OPERATOR
  // Here we are simply using $pull operator to remove the notification from notifications array.
  // Notice we are finding the notification inside Notifications array by adding its type, userId & foodyId

  await Notification.findOneAndUpdate(
    { user: userToNotifyId },
    {
      $pull: {
        notifications: {
          type: 'newLike',
          user: userId,
          post: postId,
        },
      },
    }
  );

  await userToNotify.save();
};
```

#### Production Setup - Build Front-End Application

- create front-end production application

```js
package.json
"scripts": {
    "build-client": "cd client && npm run build",
    "server": "nodemon server.js --ignore client",
    "client": "cd client && npm run start",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""

  },

```

```js
server.js;

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/foodys', authenticateUser, foodysRouter);

// only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
```

#### Security Packages

- remove log in the error-handler
- [helmet](https://www.npmjs.com/package/helmet)
  Helmet helps you secure your Express apps by setting various HTTP headers.
- [xss-clean](https://www.npmjs.com/package/xss-clean)
  Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.
- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
  Sanitizes user-supplied data to prevent MongoDB Operator Injection.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  Basic rate-limiting middleware for Express.

```sh
npm install helmet xss-clean express-mongo-sanitize express-rate-limit
```

```js
server.js;

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
```

#### Limit Requests

```js
authRoutes.js;

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
```

#### Deploy To Heroku

- heroku login

```js
package.json

"engines": {
    "node": "16.x"
  }
"scripts":{
    "build-client": "cd client && npm run build",
    "install-client": "cd client && npm install",
    "heroku-postbuild": "npm run install-client && npm run build-client",
}
```

```js
Procfile

web: node server.js
```

- rm -rf .git
- git init
- git add .
- git commit -m "first commit"
- heroku create nameOfTheApp
- git remote -v
- add env variables
- git push heroku main/master
