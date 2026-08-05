
import { RecognitionResult, CelebrityCategory } from "../types";

// Main function - calls Flask backend for face recognition
export async function recognizeCelebrity(base64Image: string): Promise<RecognitionResult> {
  try {
    // Call Flask backend API endpoint
    const response = await fetch('/api/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Map the response to RecognitionResult format
    const recognitionResult: RecognitionResult = {
      name: result.name || 'Unknown',
      confidence: result.confidence || 0,
      category: mapNameToCategory(result.name) as CelebrityCategory,
      description: generateDescription(result.name),
      referenceImageDescription: generateReferenceDescription(result.name)
    };

    return recognitionResult;
  } catch (error) {
    console.error("Face recognition failed:", error);
    throw new Error('Failed to recognize face. Please try again with a clearer image.');
  }
}

// Helper function to map celebrity names to categories
function mapNameToCategory(name: string): CelebrityCategory {
  const nameMap: { [key: string]: CelebrityCategory } = {
    'Elon Musk': 'Tech',
    'Tom Cruise': 'Action',
    // Add more mappings as needed
  };

  return nameMap[name] || 'Other';
}

// Helper function to generate description
function generateDescription(name: string): string {
  const descriptions: { [key: string]: string } = {
    'Elon Musk': 'CEO of Tesla and SpaceX. Known for groundbreaking innovations in electric vehicles and space exploration.',
    'Tom Cruise': 'Hollywood actor and producer. Famous for action movies and dedication to performing stunts.',
    // Add more descriptions as needed
  };

  return descriptions[name] || `${name || 'Unknown person'} - No description available.`;
}

// Helper function to generate reference image description
function generateReferenceDescription(name: string): string {
  const descriptions: { [key: string]: string } = {
    'Elon Musk': 'Professional photo with good lighting, clear face visibility, neutral background',
    'Tom Cruise': 'High-quality professional headshot with frontal face angle',
    // Add more descriptions as needed
  };

  return descriptions[name] || 'Clear frontal face photo with good lighting and neutral background.';
}
