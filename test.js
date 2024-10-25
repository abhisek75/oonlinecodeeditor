import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function createAndRunFile() {
  // Content to be written to example.js
  const jsContent = `console.log('Hello, this is a dynamically created JavaScript file!');`;

  try {
    // Write the content to example.js
    await fs.writeFile('example.js', jsContent);
    console.log('JavaScript file "example.js" has been created!');

    // Run example.js and capture its output
    const { stdout, stderr } = await execPromise('node example.js');

    if (stderr) {
      console.log(`Error output: ${stderr}`);
    }

    // Save the output in a variable
    const result = stdout.trim();
    console.log(`Captured output: ${result}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  fs.unlink('example.js')
}

// Call the async function
createAndRunFile();
