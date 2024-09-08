// Select the draggable components and the builder area
const components = document.querySelectorAll('.component');
const builderArea = document.getElementById('builder-area');

// Handle drag start
components.forEach(component => {
  component.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('component', e.target.dataset.component);
  });
});

// Handle the drop into the builder area
builderArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

builderArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const componentType = e.dataTransfer.getData('component');

  let droppedComponent = document.createElement('div');
  droppedComponent.className = 'dropped-component';

  // Customize the components dropped in the builder area
  switch (componentType) {
    case 'order-form':
      droppedComponent.innerHTML = `
        <h3>Order Form</h3>
        <form>
          <label>Product Name: <input type="text" name="product"></label><br>
          <label>Quantity: <input type="number" name="quantity"></label><br>
          <button type="submit">Submit Order</button>
        </form>`;
      break;
    case 'payment-gateway':
      droppedComponent.innerHTML = `
        <h3>Payment Gateway</h3>
        <label>Card Number: <input type="text" name="card"></label><br>
        <label>Expiry: <input type="text" name="expiry"></label><br>
        <button type="submit">Pay</button>`;
      break;
    case 'invoice':
      droppedComponent.innerHTML = `
       <h3>Payment Invoice</h3>
        <label>order Number: <input type="text" name="card"></label><br>
        <label>Expiry: <input type="text" name="expiry"></label><br>
        <label>price: <input type="text" name="card"></label><br>
        <button type="submit">Pay</button>`;
      break;
    default:
      droppedComponent.innerHTML = `<p>Unknown component</p>`;
  }

  builderArea.appendChild(droppedComponent);
});

// Export store as a ZIP file
document.getElementById('export-store').addEventListener('click', () => {
  const zip = new JSZip();
  
  // Generate HTML content from the builder
  const builderContent = document.getElementById('builder-area').innerHTML;
  // Get the store name from the input field
const storeName = document.getElementById('store-name').value || 'My E-commerce Store';

const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${storeName}</title>  <!-- Store name in title -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>${storeName}</h1>  <!-- Store name as header in the body -->
    ${builderContent}
    <script src="app.js"></script>
  </body>
  </html>
`;


  // Add files to the ZIP
  zip.file("index.html", htmlContent);
  zip.file("style.css", `
    body { font-family: Arial, sans-serif; }
    .dropped-component { border: 1px solid #333; padding: 20px; margin: 10px; }
  `);
  zip.file("app.js", `
    // Add custom logic for form submission, payments, etc.
    console.log('Store is ready!');
  `);

  // Generate the ZIP file and trigger download
 // Get the store name from the input field and set it as the ZIP file name
const storeName = document.getElementById('store-name').value || 'My_E-commerce_Store';

// Generate the ZIP file and trigger download with dynamic file name
zip.generateAsync({ type: "blob" }).then(content => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  
  // Replace spaces with underscores for the file name
  link.download = `${storeName.replace(/\s+/g, '_')}.zip`;  // dynamic file name based on store name
  
  link.click();
});

});

