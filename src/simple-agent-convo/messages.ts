interface Message {
  role: "user" | "assistant";
  content: string;
}

export const messages: Message[] = [];

export function appendMessage({
  messages,
  message,
}: {
  messages: Message[];
  message: Message;
}) {
  messages.push(message);
  return messages;
}

export function createMessage(
  role: Message["role"],
  content: Message["content"]
): Message {
  return {
    role,
    content,
  };
}
