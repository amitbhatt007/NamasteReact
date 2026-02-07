const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 👇 PASTE YOUR COOKIES HERE (from browser)
const SWIGGY_COOKIES =
  "__SW=2us9HXCbzxcoTrwdmfKBH2ahPhk351m5; _device_id=04e917c1-2e77-cc93-05be-ec4549bd7710; _gcl_au=1.1.1538466857.1767354809; userLocation={%22lat%22:28.4798255%2C%22lng%22:77.0620247%2C%22address%22:%22Housing%20Board%20Colony%2C%20Sector%2017A%2C%20Sector%2017%2C%20Gurugram%2C%20Haryana%20122007%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; _gid=GA1.2.558063412.1770101824; _guest_tid=f379fd9e-7ebe-425a-a343-97bb11de9aa9; _sid=phr34e9f-9598-4570-ae95-db7a9ca3487f; _ga_YE38MFJRBZ=GS2.1.s1770111137$o12$g1$t1770111643$j60$l0$h0; _ga_34JYJ0BCRN=GS2.1.s1770111137$o12$g1$t1770111643$j60$l0$h0; _ga=GA1.2.584228729.1767354809; _gat_0=1; aws-waf-token=188b1e8a-b0f3-4062-950f-656be0e0ac4c:BQoAZxlDj/UgAAAA:sf8+BtL/WoVTpPeGmJQvQIhDEUbR8TlhVepY39n7tnsh0jvoIv69p8FjCuUmbJ7sDm7u4EIMcuttlNlaK6cUPSPofZo3eYIzk7RpJVaNTO+y0Ym0DonFqHe7BxlOT8aqUiD7ZAM560EPJj2LZwZ9f3EBZ4n1ycWcPX9/tq5xO6P2N22LPG0z2+E23/idaDYDyktMK8CZVhpoU4MG8gfjdXpyWagUBAw5RQ/cyamhSmniW3kMgKGL";

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
