export function genVertexSuite(markdownTable: string, setupColumns: string[], elementColumns: string[]) {
  // Split the table into lines
  const lines = markdownTable.trim().split('\n');

  // Extract the header row
  const headers = lines[0].split('|').map(header => header.trim()).filter(header => header);

  // Extract the data rows
  const dataRows = lines.slice(2).map(row => row.split('|').map(cell => cell.trim()).filter(cell => cell));

  // Function to generate the formatted JS code for each test case
  function generateTestCaseCode(setupData: Record<string, string>, elementsData: Record<string, string>) {
    const setupObject = JSON.stringify(setupData, null, 2);
    const elementsObject = JSON.stringify(elementsData, null, 2);
    return `{
setup: gen_setup(${setupObject}),
elements: gen_ui_spec(${elementsObject})
}`;
  }

  // Process each row and convert it into a JS code string
  const testCasesCode = dataRows.map(row => {
    // Create the setup object
    const setupData: Record<string, string> = setupColumns.reduce((obj, col) => {
      obj[col] = row[headers.indexOf(col)];
      return obj;
    }, {});

    // Create the elements object
    const elementsData = elementColumns.reduce((obj, col) => {
      obj[col] = row[headers.indexOf(col)];
      return obj;
    }, {});

    // Generate the test case JS code
    return generateTestCaseCode(setupData, elementsData);
  });

  // Combine all test cases into a single JS array declaration
  return `const test_cases = [
${testCasesCode.join(',\n')}
];`;
}
