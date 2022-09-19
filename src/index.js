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
  // API_KEY = '988nruG9nyy-fxOtluOhwi7U69N6Rm_n9qJtJPDA'

  //   DB_ID = 'db08aac8ce36454bbbf0c6fcc7e6ebca'
  async fetch(request) {
    const params = new URL(request.url).searchParams;
    const data = await (
      await fetch(
        "https://api.notion.com/v1/databases/db08aac8ce36454bbbf0c6fcc7e6ebca/query",
        {
          headers: {
            Authorization: `Bearer secret_U9If4fvtnaj7Piw72CZIIdCNaMcTO9C8G5j04NFyEz5`,
            "Notion-Version": "2022-06-28",
          },
          method: "POST",
        }
      )
    ).json();

    // console.log("### data => ", JSON.stringify(data));
    return new Response(JSON.stringify(data));
  },
};
