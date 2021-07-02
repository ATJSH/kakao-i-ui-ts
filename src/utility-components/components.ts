import { ChatElement } from 'chat-element-json-ts';
import {
  Carousel,
  CarouselHeaderType,
  CarouselType,
  DefaultCarouselItemsType,
  DefaultContentType,
  Output,
  OutputType,
  QuickReplyType,
  SkillResponse,
  SkillResponseType,
  SkillTemplate,
} from '../core-components';
import { BasicCardElementName } from '../core-components/constants';
import { ArrayOfChatElements, CoreComponentTypeName, Unarray } from '../type-utility';

type OutputOrContent<AllowedContentType> = OutputType<AllowedContentType> | AllowedContentType;

/**
 * 배열 안 요소 중, null 또는 undefined인 요소를 제거해주는 함수.
 * > myArray.filter(notEmpty) 처럼 쓸 수 있음.
 * https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
 *
 */
function notEmpty<TValue>(value: TValue | null | undefined | void): value is TValue {
  return value !== null && value !== undefined;
}

export type SkillResponseFactoryProps<AllowedContentType> = {
  chats: (OutputOrContent<AllowedContentType> | undefined | null | void)[];
  quickReplies?: QuickReplyType[];
};

/**
 * Content 1개를 받아 Output 1개를 쉽게 생성해주는 함수
 * @param content
 * @returns
 */
export function OutputFactory<AllowedContentType extends ChatElement = DefaultContentType>(
  content: AllowedContentType,
): OutputType<AllowedContentType> {
  return Output<AllowedContentType>({
    [content.name]: content,
  });
}

/**
 * SkillResponse를 생성해주는 헬퍼 함수. Content 배열과 QuickReply 배열을 인자로 받아 완전한 챗봇 응답 데이터를 생성함.
 * @param SkillResponseFactoryProps
 * @returns
 */
export function SkillResponseFactory<AllowedContentType extends ChatElement = DefaultContentType>({
  chats,
  quickReplies,
}: SkillResponseFactoryProps<AllowedContentType>): SkillResponseType<AllowedContentType> {
  return SkillResponse<AllowedContentType>({
    version: '2.0',
    template: SkillTemplate<AllowedContentType>({
      outputs: chats.filter(notEmpty).map((chat: OutputOrContent<AllowedContentType>) => {
        if (chat.name === 'output') {
          return chat as OutputType<AllowedContentType>;
        }
        return OutputFactory<AllowedContentType>(chat as AllowedContentType);
      }),
      quickReplies,
    }),
  });
}

/**
 * Carousel을 생성해주는 헬퍼 함수. CarouselItemsType을 인자로 받아 Carousel 객체를 알아서 생성함.
 * @param items 캐로셀에 들어갈 요소들
 * @param carouselHeader CarouselHeader
 * @returns
 */
export function CarouselFactory<CarouselItemsType extends ArrayOfChatElements = DefaultCarouselItemsType>(
  items: CarouselItemsType,
  carouselHeader?: CarouselHeaderType,
): CarouselType<CoreComponentTypeName<Unarray<CarouselItemsType>> | typeof BasicCardElementName, CarouselItemsType> {
  if (items.length === 0) {
    return Carousel<typeof BasicCardElementName, CarouselItemsType>({
      type: BasicCardElementName,
      items,
      header: carouselHeader,
    });
  }
  return Carousel<CoreComponentTypeName<Unarray<CarouselItemsType>>, CarouselItemsType>({
    type: items[0].name as CoreComponentTypeName<Unarray<CarouselItemsType>>,
    items,
    header: carouselHeader,
  });
}
