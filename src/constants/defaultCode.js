const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Code Editor</title>
</head>
<body>
  <h1>Welcome to the Online Code Editor</h1>
  <p>Edit the code and click "Run" to see the results!</p>
  <button id="btn">Click Me!</button>
  <div id="display-area"></div>
</body>
</html>
`
const css=`body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  margin: 0;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  font-size: 16px;
  color: #666;
}

button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #218838;
}

#display-area {
  margin-top: 20px;
  font-size: 18px;
  color: #555;
  text-align: center;
}
`
const js=`document.getElementById('btn').addEventListener('click', function() {
  document.getElementById('display-area').innerText = 'Button was clicked!';
});
`
export {html ,css ,js}