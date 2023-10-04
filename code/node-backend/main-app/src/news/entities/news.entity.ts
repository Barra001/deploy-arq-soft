import { Types, Document, Schema, model } from "mongoose";

export class News extends Document {
    public id: Types.ObjectId;
    public title: string;
    public date: Date;
    public content: string;
    public stockAssociated: string[];
    public gameId: string;
    constructor(title: string, content: string, gameId: string) {
        super();
        this.title = title;
        this.stockAssociated = [];
        this.content = content;
        this.gameId = gameId;
    }

    public static create(
        title: string,
        date: Date,
        content: string,
        stockAssociated: string[],
        gameId: string

    ): News {
        return {
            title,
            date,
            content,
            stockAssociated,
            gameId
        } as News;
    }


}

export const NewsSchema = new Schema<News>({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    stockAssociated: { type: [String], required: true },
    gameId: { type: String, required: true },
});

export const NewsModel = model<News>("News", NewsSchema);
