/**
 * Helper to generate official WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(responseId: string, customMessage?: string): string {
  // Default or configured number from environment variable
  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.WHATSAPP_NUMBER ||
    "";

  // Clean the phone number (remove +, spaces, dashes)
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");

  const defaultMessage = `❤️ Pvi completed the apology experience.\nResponse ID: ${responseId}`;
  const messageToSend = customMessage || defaultMessage;
  const encodedText = encodeURIComponent(messageToSend);

  if (!cleanNumber) {
    // If no number configured yet, wa.me can open with just text or fallback
    return `https://wa.me/?text=${encodedText}`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
