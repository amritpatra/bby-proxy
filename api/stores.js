export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  const { zip, radius = 25, apiKey } = req.query;
  const url = `https://api.bestbuy.com/v1/stores(area(${zip},${radius}))?show=storeId,name,city,region,address,distance,hours,phone&pageSize=15&apiKey=${apiKey}&format=json`;
  const r = await fetch(url);
  const data = await r.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
}
