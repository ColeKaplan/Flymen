import { IComment } from "./comment";

export interface IReply {
    id: string;
    user_id: string
    username: string
    created_at: string
    content: string;
    thread_id: string
}
