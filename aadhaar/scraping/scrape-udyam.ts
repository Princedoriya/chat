// scrape-udyam.ts
import puppeteer from "puppeteer";
import fs from "fs-extra";

interface FieldData {
  label: string | null;
  name: string | null;
  id: string | null;
  type: string | null;
  placeholder: string | null;
  maxlength: number | null;
  required: boolean;
}

(async () => {
  const url = "https://udyamregistration.gov.in/UdyamRegistration.aspx";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Step 1: Aadhaar form fields
    const formFields: FieldData[] = await page.evaluate(() => {
      const fields: FieldData[] = [];
      document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        "input, select, textarea"
      ).forEach((el) => {
        const label = el.closest("div")?.querySelector("label")?.innerText?.trim() || null;
        const isInputElement = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
        
        fields.push({
          label,
          name: el.name || null,
          id: el.id || null,
          type: el instanceof HTMLInputElement ? el.type : null,
          placeholder: isInputElement ? (el as HTMLInputElement | HTMLTextAreaElement).placeholder || null : null,
          maxlength: isInputElement && (el as HTMLInputElement | HTMLTextAreaElement).maxLength > 0 
            ? (el as HTMLInputElement | HTMLTextAreaElement).maxLength 
            : null,
          required: el.required || false,
        });
      });
      return fields;
    });

    console.log("Step 1 Fields:", formFields);
    await fs.writeJson("step1-fields.json", formFields, { spaces: 2 });

    // Wait for form elements to be available
    await page.waitForSelector("#txtAadhaar", { timeout: 10000 });
    await page.waitForSelector("#txtName", { timeout: 10000 });
    await page.waitForSelector("#btnValidate", { timeout: 10000 });

    // Fill Aadhaar and Name for demo
    await page.type("#txtAadhaar", "123412341234");
    await page.type("#txtName", "Test User");

    // Click Validate & Generate OTP
    await page.click("#btnValidate");
    
    // Wait for navigation or OTP form to appear
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 2: OTP fields
    const otpFields: FieldData[] = await page.evaluate(() => {
      const fields: FieldData[] = [];
      document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        "input, select, textarea"
      ).forEach((el) => {
        const label = el.closest("div")?.querySelector("label")?.innerText?.trim() || null;
        const isInputElement = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
        
        fields.push({
          label,
          name: el.name || null,
          id: el.id || null,
          type: el instanceof HTMLInputElement ? el.type : null,
          placeholder: isInputElement ? (el as HTMLInputElement | HTMLTextAreaElement).placeholder || null : null,
          maxlength: isInputElement && (el as HTMLInputElement | HTMLTextAreaElement).maxLength > 0 
            ? (el as HTMLInputElement | HTMLTextAreaElement).maxLength 
            : null,
          required: el.required || false,
        });
      });
      return fields;
    });

    console.log("Step 2 Fields:", otpFields);
    await fs.writeJson("step2-fields.json", otpFields, { spaces: 2 });

    console.log("Please manually enter OTP on the site to proceed...");
    
  } catch (error) {
    console.error("Error occurred during scraping:", error);
  } finally {
    // Uncomment to close browser when done
    // await browser.close();
  }
})();
