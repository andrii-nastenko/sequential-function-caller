# `repeatCalls` Function

The `repeatCalls` function is designed for calling a function multiple times, dividing the calls into chunks and executing them sequentially.

## Import
You can import the `repeatCalls` function in two ways, depending on your preference:

### CommonJS (Node.js)

`const { repeatCalls } = require('sequential-function-caller');`

### ES6 Modules (Browsers, Node.js with ESM)

`import { repeatCalls } from 'sequential-function-caller';`

## Usage

```typescript
import { repeatCalls } from 'sequential-function-caller';

const exampleFunction = (a) => { 
    console.log(a); 
    return a; 
};

repeatCalls({
    functionToExecute: exampleFunction,
    totalCalls: 9,
    chunkSize: 3,
    payloadArray: [1,2,3,4,5,6,7,8,9],
    delayMs: 1000
}).then(response => {
    console.log(response);
});
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details