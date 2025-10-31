# API Integration Documentation - TinyPal

## Overview
This document describes the API integration implemented for the TinyPal application, including Flashcard Screen, Did You Know Screen, and Tinu Bottom Sheet components.

## API Base URL
```
https://genai-images-4ea9c0ca90c8.herokuapp.com
```

## Implemented APIs

### 1. `/p13n_answers` API
**Purpose:** Returns educational parenting content with supporting resources for both Did You Know screen & Flashcard screen.

**Endpoint:** `POST /p13n_answers`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "module_id": "1",
  "parent_id": "EXAMPLEPARENT",
  "child_id": "EXAMPLECHILD",
  "responses": [
    {
      "question_id": "q006_tantrums",
      "selected_choice_ids": ["choice_b", "choice_c"],
      "open_response_text": "",
      "timestamp": "2025-10-14T07:25:31.482Z"
    },
    {
      "question_id": "q009_language_dev",
      "selected_choice_ids": ["choice_c", "choice_a"],
      "open_response_text": "",
      "timestamp": "2025-10-14T07:25:31.482Z"
    },
    {
      "question_id": "q008_development_concerns",
      "selected_choice_ids": ["open_response"],
      "open_response_text": "His cognitive abilities being stunted by overuse of mobiles",
      "timestamp": "2025-10-14T07:25:31.482Z"
    }
  ]
}
```

**Response Usage:**
- `dyk_cards` array → Used in Did You Know Screen
- `flash_cards` array → Used in Flashcard Screen

### 2. `/activate_tinu` API
**Purpose:** Returns details for the Tinu Bottom Sheet cards and chips.

**Endpoint:** `POST /activate_tinu`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "child_id": "EXAMPLECHILD",
  "context": "flash_card",
  "module_id": "1",
  "topic": "nutrition_impacts_mood"
}
```

**Response Usage:**
- `cards` array → ScriptCard components in bottom sheet
- `chips` array → ContextChip components in bottom sheet

## Implementation Details

### File Structure
```
src/
├── backend/
│   ├── api.ts          # API service functions and interfaces
│   └── bff.ts          # Backend-for-frontend data transformation
├── screens/
│   ├── FlashcardScreen.tsx      # Displays flashcard data
│   └── DidYouKnowScreen.tsx     # Displays DYK card data
└── components/
    ├── DeepDiveSheet.tsx        # Tinu bottom sheet with API data
    └── Custombackdrop.tsx       # Fixed TypeScript types
```

### Key Components

#### 1. FlashcardScreen.tsx
**Features:**
- Loads flashcards data on component mount using `getFlashcardsData()`
- Displays loading state with ActivityIndicator
- Renders title, description, and points from API response
- Shows appropriate error/empty states

**Data Flow:**
```
API → fetchP13nAnswers() → toFlashcardUi() → getFlashcardsData() → Component State
```

#### 2. DidYouKnowScreen.tsx
**Features:**
- Loads DYK cards data on component mount using `getDidYouKnowData()`
- Displays loading state with ActivityIndicator
- Renders description and reference from API response
- Shows appropriate error/empty states

**Data Flow:**
```
API → fetchP13nAnswers() → toDidYouKnowUi() → getDidYouKnowData() → Component State
```

#### 3. DeepDiveSheet.tsx (Tinu Bottom Sheet)
**Features:**
- Loads Tinu data when bottom sheet is opened
- Displays script cards and context chips dynamically
- Shows loading state with ActivityIndicator
- Handles empty states gracefully

**Data Flow:**
```
Sheet Opens → getTinuData() → activateTinu() → API → Component State
```

### Data Transformation Layer (bff.ts)

The BFF (Backend-for-Frontend) layer provides:

1. **Type Safety:** UI-friendly interfaces for components
2. **Data Mapping:** Transforms API responses to component-friendly structures
3. **Default Values:** Provides fallbacks for missing data
4. **Error Handling:** Gracefully handles API errors

**Interfaces:**
```typescript
- DidYouKnowUiCard: { id, title, description, reference? }
- FlashcardUiItem: { id, title, description?, points? }
- TinuUiData: { cards: [{ title, content }], chips: string[] }
```

### API Service Layer (api.ts)

**Functions:**
- `fetchP13nAnswers(body: P13nAnswersRequest): Promise<P13nAnswersResponse>`
- `activateTinu(body: ActivateTinuRequest): Promise<ActivateTinuResponse>`

**Features:**
- Type-safe interfaces for requests and responses
- Error handling with descriptive messages
- Standardized fetch configuration

## Bug Fixes

### Custombackdrop.tsx TypeScript Fix
**Issue:** Missing TypeScript type definitions for props
**Solution:** Added proper interfaces:
```typescript
interface CustomAnimatedBackdropProps {
  animatedIndex: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
}
```

**Changes Made:**
- Imported proper types from `react-native-reanimated` and `react-native`
- Added explicit type definitions
- Removed unsupported `reducedTransparencyFallbackColor` prop

## Usage Example

### Loading Data in a Component

```typescript
import { getFlashcardsData, FlashcardUiItem } from "../backend/bff";

const MyComponent = () => {
  const [flashcards, setFlashcards] = useState<FlashcardUiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getFlashcardsData();
        setFlashcards(data);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      {loading && <ActivityIndicator />}
      {flashcards.map(card => (
        <Card key={card.id} title={card.title} />
      ))}
    </>
  );
};
```

## Testing

To test the implementation:

1. Run the app: `npm start`
2. Navigate to Flashcard Screen - should display API data
3. Navigate to Did You Know Screen - should display API data
4. Click "Ask Tinu" button - bottom sheet should load API data

## Error Handling

All API calls include:
- Try-catch blocks for error handling
- Loading states during data fetch
- Empty state handling
- Console error logging for debugging

## Future Improvements

1. **Caching:** Implement data caching to reduce API calls
2. **Retry Logic:** Add automatic retry for failed requests
3. **Offline Support:** Cache data for offline viewing
4. **Pagination:** Handle multiple cards/pages
5. **Pull to Refresh:** Add refresh functionality

## Dependencies

- `react`: 19.1.0
- `react-native`: 0.81.0
- `@gorhom/bottom-sheet`: ^5.2.6
- `react-native-linear-gradient`: ^2.8.3
- `@react-native-community/blur`: ^4.4.1
- Native fetch API (built-in)

## Notes

- All API calls use the default request bodies as specified in the requirements
- Data is loaded on component mount (useEffect hooks)
- Loading indicators provide user feedback during API calls
- Error handling ensures the app doesn't crash on API failures
- TypeScript provides type safety throughout the data flow

## Conclusion

The API integration is complete and functional. All three screens (Flashcard, Did You Know, and Tinu Bottom Sheet) successfully fetch and display data from the backend APIs with proper loading states, error handling, and type safety.

