import type { ChatMessage } from './chatMessage';

export interface AiChatInput {
  message: string;
  module?: string;
  history?: ChatMessage[];
}
