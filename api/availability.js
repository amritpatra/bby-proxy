export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  const { sku, zip, apiKey } = req.query;
  const url = `https://api.bestbuy.com/v1/availability/stores(postalCode=${zip}&storeType=BigBox)?skus=${sku}&apiKey=${apiKey}&format=json`;
  const r = await fetch(url);
  const data = await r.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
}
