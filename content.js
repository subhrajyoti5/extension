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
    wrapper.style.display = 'block';
    wrapper.style.width = '100%';
    wrapper.style.overflow = 'visible';
    
    // Preserve the table's original position in the DOM
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    
    // Create the download button
    const button = document.createElement('button');
    
    // Choose your preferred icon (uncomment one):
    
    // === EMOJI ICONS ===
    // button.textContent = '📥';           // Download tray (original)
    // button.textContent = '⬇️';          // Down arrow
    // button.textContent = '💾';          // Floppy disk (save)
    // button.textContent = '📊';          // Bar chart (great for tables!)
    // button.textContent = '📋';          // Clipboard
    // button.textContent = '📄';          // Document
    // button.textContent = '📑';          // Bookmark tabs
    // button.textContent = '🔽';          // Down triangle
    // button.textContent = '📈';          // Chart with upward trend
    // button.textContent = '🗃️';          // File cabinet
    
    // === UNICODE SYMBOLS ===
    button.textContent = '↓';           // Simple down arrow
    // button.textContent = '⤓';          // Curved down arrow
    // button.textContent = '⇓';          // Double down arrow
    // button.textContent = '▼';          // Black down triangle
    // button.textContent = '⟳';          // Reload/export symbol
    
    // === TEXT LABELS ===
    // button.textContent = 'XLS';         // Simple text
    // button.textContent = 'DL';          // Download abbreviation
    // button.textContent = '↓XL';        // Arrow + Excel
    
    // === HTML ICONS (using innerHTML) ===
    // button.innerHTML = '&#8595;';       // Down arrow symbol
    // button.innerHTML = '&darr;';        // HTML down arrow
    // button.innerHTML = '⚡';           // Lightning bolt (fast export)

    // button.textContent = '📊';            // Current: Bar chart icon (perfect for tables!)

    button.className = 'table-export-button';
    button.style.position = 'absolute';
    button.style.top = '0px';
    button.style.right = '0px';
    button.style.zIndex = '999999';
    button.style.backgroundColor = '#7cb1f1ff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    button.style.fontWeight = 'bold';
    button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    button.style.transition = 'all 0.3s';
    button.style.opacity = '0.9';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.pointerEvents = 'auto';
    button.title = 'Download this table as Excel file';
    
    // Make sure it's visible above everything
    button.style.transform = 'translateZ(0)';
    button.style.webkitTransform = 'translateZ(0)';
    
    // Hover effect
    button.addEventListener('mouseenter', function() {
      button.style.backgroundColor = '#218838';
      button.style.transform = 'scale(1.1)';
      button.style.opacity = '1';
      button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
      button.style.backgroundColor = '#28a745';
      button.style.transform = 'scale(1) translateZ(0)';
      button.style.opacity = '0.9';
      button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    });
    
    // Append button to the wrapper
    wrapper.appendChild(button);
    
    // Force visibility and positioning
    setTimeout(() => {
      button.style.visibility = 'visible';
      button.style.display = 'flex';
      console.log('Table export button added for table:', index + 1);
    }, 100);
    
    // Add click event to export the specific table
    button.addEventListener('click', async function(e) {
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
        let defaultFilename = 'table';
        
        // Check for table caption
        const caption = table.querySelector('caption');
        if (caption && caption.textContent.trim()) {
          defaultFilename = caption.textContent.trim();
        } else {
          // Look for nearby heading
          let element = table.previousElementSibling;
          while (element && !defaultFilename.match(/^table_\d+$/)) {
            if (element.tagName.match(/^H[1-6]$/)) {
              defaultFilename = element.textContent.trim();
              break;
            }
            element = element.previousElementSibling;
          }
        }
        
        // Clean filename and add index if generic
        defaultFilename = defaultFilename.replace(/[^a-z0-9_\-\s]/gi, '_').substring(0, 50);
        if (defaultFilename === 'table' || !defaultFilename) {
          defaultFilename = `table_${index + 1}`;
        }
        
        // Create custom dialog for filename and path
        const userChoice = await showCustomDialog(defaultFilename);
        
        // If user cancelled, stop
        if (!userChoice) {
          button.textContent = originalText;
          button.disabled = false;
          return;
        }
        
        const { filename, path } = userChoice;
        
        // Generate the file as a blob
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // Create download URL
        const url = URL.createObjectURL(blob);
        
        // Create full file path
        const fullPath = path ? `${path}/${filename}` : filename;
        
        // Create a download link with the specified path
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = fullPath;
        downloadLink.style.display = 'none';
        
        // Add to DOM, click, and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up the blob URL
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
        
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

// Function to create and show custom dialog for filename and path selection
function showCustomDialog(defaultFilename) {
  return new Promise((resolve) => {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 999999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    `;
    
    // Create dialog box
    const dialog = document.createElement('div');
    dialog.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    `;
    
    dialog.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600;">
        📊 Export Table to Excel
      </h3>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #555;">
          📝 Filename (without .xlsx):
        </label>
        <input type="text" id="customFilename" value="${defaultFilename}" 
               style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 25px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #555;">
          📁 Save Location (folder path):
        </label>
        <input type="text" id="customPath" placeholder="e.g., Documents/Reports or leave empty for Downloads" 
               style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
        <small style="color: #666; font-size: 12px; display: block; margin-top: 5px;">
          💡 Tip: Use relative paths like "Documents/MyFolder" or leave empty for default Downloads folder
        </small>
      </div>
      
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="cancelExport" style="
          background: #f1f3f4;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #5f6368;
          transition: all 0.2s;
        ">
          ❌ Cancel
        </button>
        <button id="confirmExport" style="
          background: #28a745;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: white;
          transition: all 0.2s;
        ">
          ✅ Export Excel
        </button>
      </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // Focus on filename input
    const filenameInput = dialog.querySelector('#customFilename');
    const pathInput = dialog.querySelector('#customPath');
    setTimeout(() => {
      filenameInput.focus();
      filenameInput.select();
    }, 100);
    
    // Handle button clicks
    const cancelBtn = dialog.querySelector('#cancelExport');
    const confirmBtn = dialog.querySelector('#confirmExport');
    
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(null);
    });
    
    confirmBtn.addEventListener('click', () => {
      const filename = filenameInput.value.trim() || defaultFilename;
      const path = pathInput.value.trim();
      
      // Clean filename
      const cleanFilename = filename.replace(/[^a-z0-9_\-\s]/gi, '_').substring(0, 50);
      const finalFilename = `${cleanFilename}.xlsx`;
      
      document.body.removeChild(overlay);
      resolve({
        filename: finalFilename,
        path: path
      });
    });
    
    // Handle Enter key
    filenameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        confirmBtn.click();
      }
    });
    
    pathInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        confirmBtn.click();
      }
    });
    
    // Handle Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', escapeHandler);
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
          resolve(null);
        }
      }
    });
    
    // Add hover effects
    cancelBtn.addEventListener('mouseenter', () => {
      cancelBtn.style.background = '#e8eaed';
    });
    cancelBtn.addEventListener('mouseleave', () => {
      cancelBtn.style.background = '#f1f3f4';
    });
    
    confirmBtn.addEventListener('mouseenter', () => {
      confirmBtn.style.background = '#218838';
    });
    confirmBtn.addEventListener('mouseleave', () => {
      confirmBtn.style.background = '#28a745';
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
