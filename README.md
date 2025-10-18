# Table to Excel Exporter 📊

**Turn any website table into an Excel spreadsheet with just one click!**

Ever found yourself manually copying data from a website table into Excel? Not anymore! This simple browser extension automatically adds a download button to every table you see online. Just click it, and boom - you've got a proper Excel file ready to use.

## What Does It Do? 🤔

Imagine you're browsing a website with data tables (like sports statistics, price comparisons, population data, etc.). This extension:

1. **Finds every table** on the page automatically
2. **Adds a small green button** at the top-right corner of each table
3. **Downloads an Excel file** when you click the button - no copy-pasting needed!

Perfect for students, researchers, data analysts, or anyone who works with online data.

## Cool Features ✨

- 🎯 **Works everywhere** - Any website, any table
- 📥 **One-click download** - No complicated steps
- 💾 **Real Excel files** - Opens in Microsoft Excel, Google Sheets, or any spreadsheet app
- 🚀 **Smart detection** - Even finds tables that load later on the page
- 🎨 **Non-intrusive** - Small button that doesn't mess up the page layout
- 📝 **Smart naming** - Automatically names files based on table content (not just "table1.xlsx")

## How to Install 🛠️

Don't worry - it's easier than it sounds! Just follow these steps:

### Step 1: Get the Required File ⬇️

First, you need to download one special file that helps create Excel files:

1. **Click this link**: [Download xlsx.full.min.js](https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js)
2. Your browser might show a page full of code - that's normal!
3. **Right-click** anywhere on that page
4. Select **"Save As"** or **"Save Page As"**
5. Make sure it saves as `xlsx.full.min.js` (not .txt or .html)
6. Save it in the **same folder** as the other extension files

**Why?** This file (called SheetJS) is the magic that converts tables into Excel format. It's free and safe!

### Step 2: Load the Extension in Chrome 🌐

Now let's add the extension to your browser:

1. **Open Google Chrome**
2. **Type this in the address bar**: `chrome://extensions/` (then press Enter)
3. Look at the **top-right corner** - find the switch that says **"Developer mode"**
4. **Turn it ON** (it should turn blue)
5. You'll see new buttons appear - click **"Load unpacked"**
6. A file browser will pop up - **find and select your extension folder**
7. Click **"Select Folder"**

**That's it!** You should now see "Table to Excel Exporter" in your extensions list.

## How to Use It 🎯

Super simple:

1. **Go to any website** that has tables (try Wikipedia, for example)
2. **Look for a green button** labeled "📥 XLSX" at the top-right of each table
3. **Click the button**
4. **Done!** The Excel file downloads automatically to your Downloads folder

**Try it on these websites:**
- Wikipedia articles (tons of data tables)
- Sports stats websites
- Financial data pages
- Stock market websites
- Company financial reports
- Any website with tables!

The file will automatically get a smart name based on what's in the table. Just open it in Excel or Google Sheets!

## Real Examples 📸

Here are some real-world examples of tables you can export with one click:

### Example 1: Stock Market Data (Nifty 50)

![Stock Market Data - Excel Export](example-stock-data.png)

Export daily trading data with Open, High, Low, Close prices and Volume:
- **Use case**: Track stock performance, analyze trends, create charts
- **Before**: Historical price table on Yahoo Finance or similar sites
- **After**: Clean Excel file ready for analysis with all OHLC data

---

### Example 2: Company Balance Sheets

![Company Balance Sheet](example-balance-sheet.png)

Download financial statements from annual reports:
- **Use case**: Compare company finances year-over-year, financial analysis
- **Before**: Balance sheet table on corporate websites
- **After**: Excel file with Equity Capital, Reserves, Assets, Liabilities over multiple years

---

### Example 3: Stock Market Historical Data

![Stock Historical Prices on Website](example-stock-table.png)

See the table **on the website** with export button (notice the green XLSX button):
- **Before**: Complex historical price tables on financial websites
- **After**: One-click export to analyze in Excel

---

### Example 4: Company Rankings & Comparisons

![Company Comparison Table](example-company-comparison.png)

Download comparative tables of multiple companies:
- **Use case**: Compare P/E ratios, market cap, dividend yields, ROE across companies
- **Before**: Comparison table of top companies (TCS, Infosys, HCL, etc.)
- **After**: Excel file for investment research and screening

---

### Example 5: Quarterly Performance Metrics

![Quarterly Performance Data](example-quarterly-data.png)

Export key performance indicators and quarterly results:
- **Use case**: Track sales growth, profit margins, quarterly trends
- **Before**: Tables showing Sales, Expenses, Operating Profit, Net Profit by quarter
- **After**: Spreadsheet ready for forecasting and business analysis

**What you can do with exported data:**
- ✅ Create charts and graphs
- ✅ Perform calculations and analysis
- ✅ Combine data from multiple tables
- ✅ Share with colleagues or classmates
- ✅ Build reports and presentations
- ✅ Import into other tools (Power BI, Tableau, etc.)

## What's in the Folder? 📁

Your extension folder should have these files:

- **manifest.json** - Tells Chrome what the extension does
- **content.js** - The brain of the extension (adds buttons and creates Excel files)
- **xlsx.full.min.js** - The Excel converter (you download this separately)
- **README.md** - This instructions file
- **INSTALLATION.txt** - Quick reference guide

## Test It Out 🧪

Want to see it in action? Try these websites that have lots of tables:

**Simple test pages:**
- [Countries by Population](https://en.wikipedia.org/wiki/List_of_countries_by_population) (Wikipedia)
- [HTML Tables Tutorial](https://www.w3schools.com/html/html_tables.asp) (W3Schools)
- Any Wikipedia article with data tables

Just visit these pages and look for the green download buttons!

## Customization (For Developers) 🔧

Want to tweak the extension? Here's how:

### Change Button Color or Text

Open `content.js` and find these lines (around line 30-40):

```javascript
button.style.backgroundColor = '#28a745';  // Change this color code
button.style.padding = '6px 12px';         // Make button bigger/smaller
button.textContent = '📥 XLSX';             // Change button text
```

### Only Work on Specific Websites

Open `manifest.json` and change this line:

```json
"matches": ["<all_urls>"]  // Change to ["https://example.com/*"] for one site only
```

### Custom Filename Logic

Edit `content.js` around line 70 to change how files are named.

**Note for developers**: The extension uses SheetJS (xlsx.js) for Excel generation and runs as a Manifest V3 content script with MutationObserver for dynamic table detection.

## Help! It's Not Working 😰

### I Don't See Any Buttons

**Most common fix:**
1. Make sure `xlsx.full.min.js` is in your extension folder (check the file size - should be around 800KB)
2. Go to `chrome://extensions/`
3. Find "Table to Excel Exporter"
4. Click the refresh/reload icon 🔄
5. Refresh the webpage you're testing on (press F5)

**Still nothing?**
- Press F12 on the webpage to open Developer Tools
- Click the "Console" tab
- Look for any red error messages (screenshot them if asking for help)

### The Button Appears But Download Doesn't Work

- Check if Chrome is blocking downloads (look for a download icon in the address bar)
- Make sure you have permission to save files in your Downloads folder
- Try a different website with simpler tables first

### The Table Looks Weird After Adding the Button

- This is very rare! The button is designed to not disrupt the page
- Try refreshing the page (F5)
- Some websites have very complex CSS that might conflict

### Where Do My Files Go?

Downloaded Excel files go to your default **Downloads folder**:
- Windows: Usually `C:\Users\[YourName]\Downloads`
- Mac: Usually `/Users/[YourName]/Downloads`
- Check your browser's download history (Ctrl+J in Chrome)

## Which Browsers Work? 🌐

- ✅ **Google Chrome** - Works perfectly!
- ✅ **Microsoft Edge** - Works great (uses same engine as Chrome)
- ⚠️ **Firefox** - Might work with small changes
- ❌ **Safari** - Sorry, needs a different version

## Things to Know ⚠️

**What works:**
- ✅ Any table on any normal website
- ✅ Tables with text, numbers, links
- ✅ Large tables with hundreds of rows
- ✅ Multiple tables on the same page

**Limitations:**
- ❌ Tables inside frames from different websites (browser security prevents this)
- ❌ Some banking or secure sites might block it (security policies)
- ⚠️ Colors and fancy formatting get simplified to basic Excel (data is preserved!)
- ⚠️ Merged cells might not look exactly the same in Excel

## Future Ideas 💡

Things that might be added in the future:

- [ ] Pretty icon for the extension
- [ ] Settings panel to customize button appearance
- [ ] Download ALL tables at once (one button for the entire page)
- [ ] Option to save as CSV instead of Excel
- [ ] Keep colors and formatting in Excel
- [ ] Right-click menu option
- [ ] Choose where to save files

Want to help? Feel free to suggest ideas or contribute!

## Is It Safe? 🔒

**Yes!** This extension:
- ✅ Only runs on the pages you visit (with your permission)
- ✅ Doesn't send your data anywhere (everything happens on your computer)
- ✅ Uses well-known, trusted library (SheetJS) for Excel creation
- ✅ Open source - you can see exactly what it does
- ✅ No tracking, no analytics, no ads

## Legal Stuff 📜

**Free to use!** You can:
- Use it for personal projects
- Use it for work or business
- Modify it however you want
- Share it with others

## Questions? 🤔

**For everyone:**
- Having trouble? Read the troubleshooting section above
- Still stuck? Check the INSTALLATION.txt file for detailed steps

**For developers:**
- Uses [SheetJS (xlsx.js)](https://sheetjs.com) for Excel file generation
- Built with Chrome Extension Manifest V3
- Content script with MutationObserver for dynamic table detection
- Client-side processing only (no server required)

---

**Made with ❤️ for anyone who's tired of copying tables manually!**
