import {
  Carousel,
  CarouselHeaderType,
  CarouselItemsType,
  CarouselType,
  Content,
  Output,
  QuickReplyType,
  SkillResponse,
  SkillResponseType,
  SkillTemplate,
} from '../core-components';
import { BasicCardComponentName } from '../core-components/constants';

export type ChatResponseProps = {
  chats: Content[];
  quickReplies: QuickReplyType[];
};

/**
 * SkillResponse를 생성해주는 헬퍼 함수. Content 배열과 QuickReply 배열을 인자로 받아 완전한 챗봇 응답 데이터를 생성함.
 * @param ChatResponseProps
 * @returns
 */
export function ChatResponse({ chats, quickReplies }: ChatResponseProps): SkillResponseType {
  return SkillResponse({
    skillTemplate: SkillTemplate({
      outputs: chats.map((chat: Content) => {
        return Output({ content: chat });
      }),
      quickReplies: quickReplies,
    }),
  });
}

/**
 * Carousel을 생성해주는 헬퍼 함수. CarouselItemsType을 인자로 받아 Carousel 객체를 알아서 생성함.
 * @param items
 * @param carouselHeader
 * @returns
 */
export function CarouselFactory(items: CarouselItemsType, carouselHeader?: CarouselHeaderType): CarouselType {
  if (items.length === 0) {
    return Carousel({
      cardType: BasicCardComponentName,
      items: items,
      header: carouselHeader,
    });
  }
  return Carousel({
    cardType: items[0].name,
    items: items,
    header: carouselHeader,
  });
}