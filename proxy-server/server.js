const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 👇 PASTE YOUR COOKIES HERE (from browser)
const SWIGGY_COOKIES =
  "__SW=2us9HXCbzxcoTrwdmfKBH2ahPhk351m5; _device_id=04e917c1-2e77-cc93-05be-ec4549bd7710; fontsLoaded=1; _gcl_au=1.1.1538466857.1767354809; userLocation={%22lat%22:28.4798255%2C%22lng%22:77.0620247%2C%22address%22:%22Housing%20Board%20Colony%2C%20Sector%2017A%2C%20Sector%2017%2C%20Gurugram%2C%20Haryana%20122007%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _gid=GA1.2.457453632.1769674131; _guest_tid=206b69f0-b331-49b9-9696-632ed4f975e7; _sid=peh5e917-3fa1-47fb-8485-0018a424cb8a; _ga_YE38MFJRBZ=GS2.1.s1769687258$o10$g1$t1769687620$j60$l0$h0; _ga_34JYJ0BCRN=GS2.1.s1769687258$o10$g1$t1769687620$j60$l0$h0; _ga=GA1.2.584228729.1767354809; _gat_0=1; aws-waf-token=3dcb6983-4495-4f1e-bccc-e73cf65a7021:BQoAlqpSO8dRAAAA:BcxlKbXnqDuKxRC+k383uwgstrWLi0p/wHPcPaIHryJDkJ1EClPLYS277FBTNnHp/gGGFv5+U+a5GgfKsfd6jNkaQtKOewhBVXmzIaM+vbV8TeJkhOEoaitFQb3pnsPS/Nah8M/MXyZgFcUrLRv70kNep9x32q54gzBg3tYrGVBVklLrKEvVUIIq9uplJqkpHRBtKroGX/gGM+NA1d2G8vmVFmEkmRChVM2bQrItYy8EUx4fusQF";

app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const { lat = "28.4798255", lng = "77.0620247" } = req.query;

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
        Cookie: SWIGGY_COOKIES, // 👈 Your cookies
      },
    });

    console.log("Status:", response.status);

    if (response.status === 200) {
      const data = await response.json();
      console.log("✅ Success!");
      res.json(data);
    } else {
      res.status(response.status).json({ error: `Status: ${response.status}` });
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("🚀 http://localhost:3001/api/menu/53750");
});
