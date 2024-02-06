addEventListener('fetch', event => {
    console.log("hello")
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // n624.microcms.io の API エンドポイント
    const apiUrl = 'https://n624.microcms.io/api/v1/news'; // *** を実際のエンドポイントに置き換える
  
    // Cloudflare Workers がリクエストを送信するためのオプションを設定
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-MICROCMS-API-KEY': 'uNzMJ5Va607OeMOEb5vDhjRtSiG4v5eQ0xnx' // MicroCMS の API キーをここに入力
      }
    };
  
    // リクエストを送信し、レスポンスを取得
    const response = await fetch(apiUrl, headers);
  
    // レスポンスを加工して出力
    const data = await response.json();
  
    // Workers エンドポイントのレスポンスを設定
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // クロスオリジンリクエストを許可する場合
      }
    });
  }
  