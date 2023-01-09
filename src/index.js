/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export default {
  async fetch(request) {
    const params = new URL(request.url).searchParams;
    console.log("### params => ", params);
    const { filterObj = {}, nextCursor = undefined } = JSON.parse(
      params.get("data")
    );

    console.log("### nextCursor => ", nextCursor);
    const config = {
      headers: {
        Authorization: request.headers.get("authorization"),
        "Notion-Version": request.headers.get("notion-version"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_size: 100,
        filter: filterObj,
        start_cursor: nextCursor,
      }),
      method: "POST",
    };
    const data = await (
      await fetch(
        `https://api.notion.com/v1/databases/${request.headers.get(
          "database-id"
        )}/query`,
        config
      )
    ).json();

    // console.log(config);
    // console.log("### data => ", JSON.stringify(data));
    return new Response(JSON.stringify(data));
  },
};
