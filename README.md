# preact-pdf-reviewer
Preact frontend that reviews pdfs on a domain, % of site urls that are pdf files, average size, whether sample pdf passes accessibility checks. This client side application uses Web Awesome web components and themes for UI, zustand for state management, Vite for build and local development.

<img width="440" height="146" alt="Screenshot 2025-09-30 at 3 48 17 PM" src="https://github.com/user-attachments/assets/e7b66cc0-d627-48a3-a4bb-ae53f5b85392" />

Enter a domain and the sitemap will be found and reviewed, if not available a limited crawl will be run to find pdf files

<img width="1093" height="374" alt="Screenshot 2025-09-30 at 3 49 56 PM" src="https://github.com/user-attachments/assets/9055228b-05f0-4bf9-ac99-0497d1c0557e" />

The pdf discovery phase reviews the amount of pdf files compared to the rest of the content and gets the sizes of the first 50 pdf files to get an average size, then an accessibility audit is initiated on the first pdf file

<img width="1055" height="406" alt="Screenshot 2025-09-30 at 3 52 05 PM" src="https://github.com/user-attachments/assets/d74b6b3a-03cd-477c-893e-148a89e16469" />

The accessibility audit is run with the Verapdf tool. The code that uses this tool is open source at: <a href="https://github.com/ScanGov/verapdf-auditor">https://github.com/ScanGov/verapdf-auditor</a>

<img width="1044" height="428" alt="Screenshot 2025-09-30 at 3 52 11 PM" src="https://github.com/user-attachments/assets/10298eb7-edc6-4b63-a6a8-e52d38bb12ad" />



<img width="1043" height="449" alt="Screenshot 2025-09-30 at 3 52 21 PM" src="https://github.com/user-attachments/assets/1645e2be-4fdf-48ce-9166-dfb979205d41" />

