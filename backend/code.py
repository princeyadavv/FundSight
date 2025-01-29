# // const { parse } = require('json2csv');
# // const fs = require('fs');
# // const csvtojson = require('csvtojson')
# // Example JSON data read from file
# // fs.readFile('result.json', 'utf8', (err, data) => {
# //   if (err) {
# //     console.error('Error reading the file:', err);
# //     return;
# //   }

# //   // Parse the JSON string into an object
# //   let jsonData;
# //   try {
# //     jsonData = JSON.parse(data);
# //   } catch (parseError) {
# //     console.error('Error parsing JSON:', parseError);
# //     return;
# //   }

# //   // Convert JSON to CSV
# //   const csv = parse(jsonData);

# //   // Write the CSV to a file
# //   fs.writeFileSync('output.csv', csv);
# //   console.log('bankai')

# // });
# // console.log('CSV file has been saved!');

# // fs.readFile('result.json', 'utf8', (err, data) => {
# //   if (err) {
# //     console.error('Error reading the file:', err);
# //     return;
# //   }
# //   const jsonData = JSON.parse(data);
# //   const rounds = new Set()
# //   jsonData.map((element)=>{
  
# //     rounds.add(element.round)
# //   })

# //   console.log(rounds)
# // });
# // const csvFilePath = "output.csv"
# // const jsonFilePath = 'result.json'
# // csvtojson()
# //   .fromFile(csvFilePath)
# //   .then((jsonObj) => {
# //     fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
# //     console.log('CSV converted to JSON and saved!');
# //   })
# //   .catch((error) => {
# //     console.error('Error converting CSV to JSON:', error);
# //   });

import pandas as pd

# Load the CSV file
csv_file_path = 'output.csv'  # Replace with your CSV file path
df = pd.read_csv(csv_file_path)

# Remove the 'revenue' column if it exists
if 'revenue' in df.columns:
    df = df.drop(columns=['revenue'])

# Clean the 'amount' field by removing commas
df['amount'] = df['amount'].replace({',': ''}, regex=True)

# Convert 'amount' to numeric type (either int or float)
df['amount'] = pd.to_numeric(df['amount'], errors='coerce')

# Save the updated DataFrame to a JSON file with proper formatting
json_file_path = 'data_cleaned.json'  # Specify the desired output JSON file path
df.to_json(json_file_path, orient='records', indent=4)

print(f"CSV data has been successfully converted to JSON and saved as {json_file_path} without the 'revenue' field and cleaned 'amount' field.")
