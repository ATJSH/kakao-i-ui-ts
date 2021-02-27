import { ChatElement } from "../CoreChatElement.component";

export interface QuickReplyElementPropsType {
  label: string;
  action: string;
  messageText: string;
  blockId: string;
  extra?: Record<string, any>;
}

export type QuickReplyType = ChatElement<QuickReplyElementPropsType>;

export interface QuickReplyParameter {
  label: string;
  action: "message" | "block";
  messageText: string;
  blockId: string;
  extra: Record<string, any>;
}

export function QuickReply({
  label,
  action,
  messageText,
  blockId,
  extra,
}: QuickReplyParameter): QuickReplyType {
  return new ChatElement("quickReply", <QuickReplyElementPropsType>{
    label,
    action,
    messageText,
    blockId,
    extra,
  });
}