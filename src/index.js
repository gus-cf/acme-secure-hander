export default {

   async fetch(request, env, ctx) {
      const url = new URL(request.url);

      if (url.pathname == "/secure" || url.pathname == "/secure/")
      {
         const currentTime = new Date().toUTCString();
         const userEmail = request.headers.get('Cf-Access-Authenticated-User-Email');
         const userCountry = request.headers.get('Cf-Ipcountry');

         const html = `
	            <!DOCTYPE html>
	            <html>
	                <body>
	                    ${userEmail} authenticated at ${currentTime} from 
	                    <a href="/secure/${userCountry}">${userCountry}</a>
	                </body>
	            </html>
	        `;

         return new Response(html, {
            headers: {
               "Content-Type": "text/html",
            },
         });
      }

      let countryUriValue = url.pathname.replaceAll("secure", "").replaceAll("/", "").toLowerCase();
      if (countryUriValue.length != 2) {
         return new Response('Country code should have 2 characters');
      }

      // Retrieve country flag image from R2
      const countryFlagObject = await env.MY_BUCKET.get(countryUriValue + '.png');

      if (countryFlagObject == null) {
         return new Response('Country code ' + countryUriValue + ' is unknown to this server');
      }

      // Write HTTP response
      const headers = new Headers();
      countryFlagObject.writeHttpMetadata(headers);
      headers.set("etag", countryFlagObject.httpEtag);

      return new Response(countryFlagObject.body, {
         headers,
      });
   },
};