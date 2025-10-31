import { fetchP13nAnswers, activateTinu, P13nAnswersRequest, DykCard, FlashCard } from './api';

// UI-friendly models used by screens/components
export interface DidYouKnowUiCard {
	id: string;
	title: string;
	description: string;
	reference?: string;
}

export interface FlashcardUiItem {
	id: string;
	title: string;
	description?: string;
	points?: string[];
}

export interface TinuUiData {
	cards: Array<{ title: string; content: string }>; // for ScriptCard
	chips: string[]; // for ContextChip
}

// Default request body per product spec
const DEFAULT_P13N_BODY: P13nAnswersRequest = {
	module_id: '1',
	parent_id: 'EXAMPLEPARENT',
	child_id: 'EXAMPLECHILD',
	responses: [
		{
			question_id: 'q006_tantrums',
			selected_choice_ids: ['choice_b', 'choice_c'],
			open_response_text: '',
			timestamp: '2025-10-14T07:25:31.482Z',
		},
		{
			question_id: 'q009_language_dev',
			selected_choice_ids: ['choice_c', 'choice_a'],
			open_response_text: '',
			timestamp: '2025-10-14T07:25:31.482Z',
		},
		{
			question_id: 'q008_development_concerns',
			selected_choice_ids: ['open_response'],
			open_response_text: 'His cognitive abilities being stunted by overuse of mobiles',
			timestamp: '2025-10-14T07:25:31.482Z',
		},
	],
};

function toDidYouKnowUi(cards: DykCard[] | undefined): DidYouKnowUiCard[] {
	if (!cards || !Array.isArray(cards)) return [];
	return cards.map((c, index) => ({
		id: String(c.id ?? index),
		title: String(c.title ?? ''),
		description: String(c.description ?? c.body ?? ''),
		reference: c.reference ? String(c.reference) : undefined,
	}));
}

function toFlashcardUi(cards: FlashCard[] | undefined): FlashcardUiItem[] {
	if (!cards || !Array.isArray(cards)) return [];
	return cards.map((c, index) => ({
		id: String(c.id ?? index),
		title: String(c.title ?? ''),
		description: c.description ? String(c.description) : undefined,
		points: Array.isArray(c.points)
			? c.points.map((p: any) => String(p))
			: undefined,
	}));
}

export async function getDidYouKnowData(): Promise<DidYouKnowUiCard[]> {
	const res = await fetchP13nAnswers(DEFAULT_P13N_BODY);
	return toDidYouKnowUi(res.dyk_cards);
}

export async function getFlashcardsData(): Promise<FlashcardUiItem[]> {
	const res = await fetchP13nAnswers(DEFAULT_P13N_BODY);
	return toFlashcardUi(res.flash_cards);
}

export async function getTinuData(): Promise<TinuUiData> {
	const res = await activateTinu({
		child_id: 'EXAMPLECHILD',
		context: 'flash_card',
		module_id: '1',
		topic: 'nutrition_impacts_mood',
	});
	const cards = Array.isArray(res.cards)
		? res.cards.map((c: any) => ({
				title: String(c.title ?? ''),
				content: String(c.content ?? c.body ?? ''),
			}))
		: [];
	const chips = Array.isArray(res.chips)
		? res.chips.map((ch: any) => String(ch.text ?? ch.label ?? ch))
		: [];
	return { cards, chips };
}
