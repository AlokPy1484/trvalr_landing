import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ItineraryData } from '@/app/trip-details/trips-types';
import { formatDate } from './utils';

export async function exportItineraryToPDF(tripDetails: ItineraryData, note?: string): Promise<void> {
  // Create a temporary container for the PDF content
  const container = document.createElement('div');
  container.id = 'pdf-export-temp';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // A4 width in pixels at 96 DPI
  container.style.padding = '32px';
  container.style.backgroundColor = '#F0F4F3';
  container.style.color = '#1F2937';
  container.style.fontFamily = 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif';
  document.body.appendChild(container);

  try {
    // Build HTML content matching the page UI
    let htmlContent = `
      <div style="background: #F0F4F3; padding: 32px; font-family: var(--font-inter), sans-serif;">
        <!-- Header Section -->
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 16px; font-family: var(--font-playfair-display), serif; color: #1F2937;">
            ${tripDetails.title}
          </h1>
          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #6B7280; margin-bottom: 24px;">
            <span>📍 ${tripDetails.destination}</span>
            <span>📅 ${formatDate(tripDetails.start_date)} - ${formatDate(tripDetails.end_date)}</span>
            <span>👥 ${tripDetails.travellers} ${tripDetails.travellers > 1 ? 'travelers' : 'traveler'}</span>
            <span>💰 ${tripDetails.budget_type}</span>
          </div>
        </div>

        <!-- Description -->
        ${tripDetails.description ? `
        <div style="margin-bottom: 32px; padding: 24px; background: white; border-radius: 8px; border: 1px solid #E5E7EB;">
          <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 12px; font-family: var(--font-playfair-display), serif; color: #1F2937;">
            Trip Overview
          </h2>
          <p style="color: #1F2937; line-height: 1.7;">${tripDetails.description}</p>
        </div>
        ` : ''}

        <!-- Highlights -->
        ${tripDetails.highlights && tripDetails.highlights.length > 0 ? `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; font-family: var(--font-playfair-display), serif; color: #1F2937;">
            Highlights
          </h2>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${tripDetails.highlights.map((highlight, idx) => `
              <li style="display: flex; align-items: start; gap: 12px; margin-bottom: 8px;">
                <span style="color: #009AD7; margin-top: 4px;">✓</span>
                <span style="color: #1F2937;">${highlight}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        ` : ''}

        <!-- User Note -->
        ${note && note.trim() ? `
        <div style="margin-bottom: 32px; padding: 24px; background: #FEF3C7; border-radius: 8px; border: 1px solid #FCD34D;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #1F2937;">📝 Your Notes</h2>
          <p style="color: #1F2937; line-height: 1.7; white-space: pre-wrap;">${note.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
    `;

    // Itinerary by Location
    if (tripDetails.itinerary && tripDetails.itinerary.length > 0) {
      tripDetails.itinerary.forEach((location) => {
        htmlContent += `
          <div style="margin-bottom: 48px;">
            <!-- Location Header -->
            <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid rgba(0, 154, 215, 0.2);">
              <h2 style="font-size: 28px; font-weight: bold; margin-bottom: 8px; font-family: var(--font-playfair-display), serif; color: #1F2937;">
                ${location.location}
              </h2>
              ${location.description ? `<p style="color: #6B7280; line-height: 1.7;">${location.description}</p>` : ''}
            </div>
        `;

        // Days
        if (location.days && location.days.length > 0) {
          location.days.forEach((day) => {
            htmlContent += `
              <div style="margin-bottom: 32px; padding: 24px; background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <!-- Day Header -->
                <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #E5E7EB;">
                  <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 4px; font-family: var(--font-playfair-display), serif; color: #1F2937;">
                    Day ${day.day}: ${day.title}
                  </h3>
                  <p style="font-size: 12px; color: #6B7280;">${formatDate(day.date)}</p>
                </div>

                <!-- Activities -->
                <div style="display: flex; flex-direction: column; gap: 16px;">
            `;

            // Morning
            if (day.activities.morning) {
              htmlContent += `
                <div style="padding: 16px; border-radius: 8px; border: 1px solid #BFDBFE; background: #EFF6FF;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 18px;">🌅</span>
                    <span style="font-weight: 600; color: #1F2937;">Morning</span>
                    ${day.activities.morning.start_time || day.activities.morning.end_time ? `
                      <span style="font-size: 12px; color: #6B7280;">
                        ${day.activities.morning.start_time || ''} - ${day.activities.morning.end_time || ''}
                      </span>
                    ` : ''}
                  </div>
                  <h4 style="font-weight: 500; color: #1F2937; margin-bottom: 4px;">${day.activities.morning.title || ''}</h4>
                  <p style="font-size: 14px; color: #6B7280; line-height: 1.7;">${day.activities.morning.description || ''}</p>
                </div>
              `;
            }

            // Afternoon
            if (day.activities.afternoon) {
              htmlContent += `
                <div style="padding: 16px; border-radius: 8px; border: 1px solid #FDE68A; background: #FFFBEB;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 18px;">☀️</span>
                    <span style="font-weight: 600; color: #1F2937;">Afternoon</span>
                    ${day.activities.afternoon.start_time || day.activities.afternoon.end_time ? `
                      <span style="font-size: 12px; color: #6B7280;">
                        ${day.activities.afternoon.start_time || ''} - ${day.activities.afternoon.end_time || ''}
                      </span>
                    ` : ''}
                  </div>
                  <h4 style="font-weight: 500; color: #1F2937; margin-bottom: 4px;">${day.activities.afternoon.title || ''}</h4>
                  <p style="font-size: 14px; color: #6B7280; line-height: 1.7;">${day.activities.afternoon.description || ''}</p>
                </div>
              `;
            }

            // Evening
            if (day.activities.evening) {
              htmlContent += `
                <div style="padding: 16px; border-radius: 8px; border: 1px solid #FED7AA; background: #FFF7ED;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 18px;">🌆</span>
                    <span style="font-weight: 600; color: #1F2937;">Evening</span>
                    ${day.activities.evening.start_time || day.activities.evening.end_time ? `
                      <span style="font-size: 12px; color: #6B7280;">
                        ${day.activities.evening.start_time || ''} - ${day.activities.evening.end_time || ''}
                      </span>
                    ` : ''}
                  </div>
                  <h4 style="font-weight: 500; color: #1F2937; margin-bottom: 4px;">${day.activities.evening.title || ''}</h4>
                  <p style="font-size: 14px; color: #6B7280; line-height: 1.7;">${day.activities.evening.description || ''}</p>
                </div>
              `;
            }

            // Night
            if (day.activities.night) {
              htmlContent += `
                <div style="padding: 16px; border-radius: 8px; border: 1px solid #E9D5FF; background: #FAF5FF;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 18px;">🌙</span>
                    <span style="font-weight: 600; color: #1F2937;">Night</span>
                    ${day.activities.night.start_time || day.activities.night.end_time ? `
                      <span style="font-size: 12px; color: #6B7280;">
                        ${day.activities.night.start_time || ''} - ${day.activities.night.end_time || ''}
                      </span>
                    ` : ''}
                  </div>
                  <h4 style="font-weight: 500; color: #1F2937; margin-bottom: 4px;">${day.activities.night.title || ''}</h4>
                  <p style="font-size: 14px; color: #6B7280; line-height: 1.7;">${day.activities.night.description || ''}</p>
                </div>
              `;
            }

            htmlContent += `</div>`;

            // Tips
            if (day.tips) {
              htmlContent += `
                <div style="margin-top: 16px; padding: 16px; border-radius: 8px; background: #FEF3C7; border: 1px solid #FCD34D;">
                  <div style="display: flex; align-items: start; gap: 8px;">
                    <span style="font-size: 18px;">💡</span>
                    <div>
                      <span style="font-weight: 600; color: #1F2937;">Tip: </span>
                      <span style="font-size: 14px; color: #1F2937;">${day.tips}</span>
                    </div>
                  </div>
                </div>
              `;
            }

            htmlContent += `</div>`;
          });
        }

        // Hotel Recommendations
        if (location.hotel_recommendations && location.hotel_recommendations.length > 0) {
          htmlContent += `
            <div style="margin-top: 32px; padding: 24px; background: white; border-radius: 8px; border: 1px solid #E5E7EB;">
              <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; font-family: var(--font-playfair-display), serif; color: #1F2937;">
                🏨 Hotel Recommendations
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
          `;

          location.hotel_recommendations.forEach((hotel) => {
            htmlContent += `
              <div style="padding: 16px; border-radius: 8px; border: 1px solid #E5E7EB; background: #F9FAFB;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                  <h4 style="font-weight: 600; color: #1F2937;">${hotel.hotel_name}</h4>
                  <div style="text-align: right;">
                    <div style="font-weight: 600; color: #009AD7;">
                      ${hotel.currency} ${hotel.price_per_night}/night
                    </div>
                    <div style="font-size: 12px; color: #6B7280;">
                      ${hotel.hotel_ratings} ⭐ (${hotel.review_count} reviews)
                    </div>
                  </div>
                </div>
                <p style="font-size: 12px; color: #6B7280; margin-bottom: 8px;">
                  ${hotel.hotel_location.street_name}, ${hotel.hotel_location.city}, ${hotel.hotel_location.country}
                </p>
                ${hotel.why_recommended ? `<p style="font-size: 14px; color: #1F2937; font-style: italic;">${hotel.why_recommended}</p>` : ''}
              </div>
            `;
          });

          htmlContent += `</div></div>`;
        }

        htmlContent += `</div>`;
      });
    }

    // Footer
    htmlContent += `
        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 12px; color: #6B7280;">
          <p>Generated by Trvalr - Your AI Travel Agent</p>
          <p style="margin-top: 4px;">${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    container.innerHTML = htmlContent;

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capture the content as canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#F0F4F3',
      width: container.scrollWidth,
      height: container.scrollHeight,
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add image to PDF
    const imgData = canvas.toDataURL('image/png');
    
    // Handle multi-page PDF
    const pageHeight = 297; // A4 height in mm
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `${tripDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`;
    pdf.save(fileName);

    // Cleanup
    document.body.removeChild(container);
  } catch (error) {
    // Cleanup on error
    if (container.parentNode) {
      document.body.removeChild(container);
    }
    throw error;
  }
}

