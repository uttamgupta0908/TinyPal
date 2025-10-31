// API base URL
const BASE_URL = 'https://genai-images-4ea9c0ca90c8.herokuapp.com';

export interface P13nAnswersRequest {
  module_id: string;
  parent_id: string;
  child_id: string;
  responses: Array<{
    question_id: string;
    selected_choice_ids: string[];
    open_response_text: string;
    timestamp: string;
  }>;
}

export interface DykCard { [key: string]: any }
export interface FlashCard { [key: string]: any }

export interface P13nAnswersResponse {
  dyk_cards: DykCard[];
  flash_cards: FlashCard[];
  [key: string]: any;
}

export async function fetchP13nAnswers(body: P13nAnswersRequest): Promise<P13nAnswersResponse> {
  const res = await fetch(`${BASE_URL}/p13n_answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to fetch p13n answers');
  return res.json();
}

export interface ActivateTinuRequest {
  child_id: string;
  context: string;
  module_id: string;
  topic: string;
}

export interface ActivateTinuResponse {
  cards: any[];
  chips: any[];
  [key: string]: any;
}

export async function activateTinu(body: ActivateTinuRequest): Promise<ActivateTinuResponse> {
  const res = await fetch(`${BASE_URL}/activate_tinu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to activate tinu');
  return res.json();
}
