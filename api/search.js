const BBY_KEY = "Jcg15GTrGHSj12qiuzGpGTNl";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { zip, radius = 25, sku } = req.query;
  if (!zip || !sku) return res.status(400).json({ error: "zip and sku required" });

  const [storesRes, availRes] = await Promise.all([
    fetch(`https://api.bestbuy.com/v1/stores(area(${zip},${radius}))?show=storeId,name,city,region,address,distance,hours,phone&pageSize=15&apiKey=${BBY_KEY}&format=json`),
    fetch(`https://api.bestbuy.com/v1/availability/stores(postalCode=${zip}&storeType=BigBox)?skus=${sku}&apiKey=${BBY_KEY}&format=json`)
  ]);

  const [stores, availability] = await Promise.all([storesRes.json(), availRes.json()]);
  return res.status(200).json({ stores, availability });
}
