Crash Course Outline:
    - Folder Structure
    - Components
    - ES7+ React/Redux/React-Native snippets
    - JSX Rules
    - Nesting Components
    - JSX Css
    


#### Folder Structure
    - node_modules
        Contains all dependencies needed by the app.
    - public
        Contains static assets
    - src
        Brain of our app
    - root
        Contains index.html

#### Components (Think of a function)

```js

function Greeting(){
    return <h2> Hello World </h2>
}

// arrow function also works

const Greeting = () => { 
    return <h2> Hello World </h2>
}


```

- It must start with a capital letter (jsx format)
- MUST return something (JSX [returning html])
- ALWAYS close tag components



### ES7+ 
    - rafce (arrow func with export)
    - rfce (regular function with export)

### JSX Rules
    - return single element
        - semantics
        - Fragment - let us group elemnts without adding extra nodes

```js
return <React.Fragment> rest of return </React.Fragment>

// shorthand 

return <> rest of return </>

```