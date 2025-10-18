// Function to add export buttons to all tables
function addExportButtonsToTables() {
  // Find all tables on the page
  const tables = document.querySelectorAll('table');
  
  tables.forEach((table, index) => {
    // Skip if button already added
    if (table.dataset.exportButtonAdded === 'true') {
      return;
    }
    
    // Mark table as processed
    table.dataset.exportButtonAdded = 'true';
    
    // Create a wrapper div for positioning
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = '100%';
    
    // Preserve the table's original position in the DOM
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    
    // Create the download button
    const button = document.createElement('button');
    button.textContent = '📥 XLSX';
    button.className = 'table-export-button';
    button.style.position = 'absolute';
    button.style.top = '5px';
    button.style.right = '5px';
    button.style.zIndex = '10000';
    button.style.backgroundColor = '#28a745';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '6px 12px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '12px';
    button.style.fontWeight = 'bold';
    button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    button.style.transition = 'all 0.2s';
    button.title = 'Download this table as Excel file';
    
    // Hover effect
    button.addEventListener('mouseenter', function() {
      button.style.backgroundColor = '#218838';
      button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      button.style.backgroundColor = '#28a745';
      button.style.transform = 'scale(1)';
    });
    
    // Append button to the wrapper
    wrapper.appendChild(button);
    
    // Add click event to export the specific table
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      try {
        // Show loading state
        const originalText = button.textContent;
        button.textContent = '⏳';
        button.disabled = true;
        
        // Create a workbook from this table
        const workbook = XLSX.utils.table_to_book(table, {
          sheet: "Sheet1",
          raw: false
        });
        
        // Generate filename - try to get a meaningful name from table caption or nearby heading
        let filename = 'table';
        
        // Check for table caption
        const caption = table.querySelector('caption');
        if (caption && caption.textContent.trim()) {
          filename = caption.textContent.trim();
        } else {
          // Look for nearby heading
          let element = table.previousElementSibling;
          while (element && !filename.match(/^table_\d+$/)) {
            if (element.tagName.match(/^H[1-6]$/)) {
              filename = element.textContent.trim();
              break;
            }
            element = element.previousElementSibling;
          }
        }
        
        // Clean filename and add index if generic
        filename = filename.replace(/[^a-z0-9_\-\s]/gi, '_').substring(0, 50);
        if (filename === 'table' || !filename) {
          filename = `table_${index + 1}`;
        }
        
        // Trigger download
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        
        // Reset button
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 500);
        
      } catch (error) {
        console.error('Error exporting table:', error);
        button.textContent = '❌';
        setTimeout(() => {
          button.textContent = '📥 XLSX';
          button.disabled = false;
        }, 2000);
      }
    });
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addExportButtonsToTables);
} else {
  addExportButtonsToTables();
}

// Watch for dynamically added tables
const observer = new MutationObserver((mutations) => {
  let shouldCheck = false;
  
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) { // Element node
          if (node.tagName === 'TABLE' || node.querySelector('table')) {
            shouldCheck = true;
            break;
          }
        }
      }
    }
  }
  
  if (shouldCheck) {
    addExportButtonsToTables();
  }
});

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true
});
