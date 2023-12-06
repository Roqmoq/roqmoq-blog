import {Client} from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export async function GetBlogPosts() {
    const databaseId = '413e22c1840c42eaab895871d37b6939';

    // データベースからページの情報を取得
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    // 取得したページの情報を整形
    return response.results.map((page) => {
        return {
            id: page.id,
            title: page.properties.title.title[0].text.content,
            content: page.properties.content.rich_text[0].text.content,
        };
    });
}