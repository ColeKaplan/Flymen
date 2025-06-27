import { IComment } from "./comment";

export interface IConversation {
    id: string;
    user: string;
    content: string;
    timestamp: string;
    comments: IComment[];
}
