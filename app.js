/* VECLÉRIA storefront — shared site behaviour */
(function () {
  "use strict";

  const CONFIG = {
    whatsapp: "233534332751",
    phone: "+233 53 433 2751",
    email: "cartoon247412@gmail.com",
    address: "Ghana",
    instagram: "@adjoayeboahclothing",
    instagramUrl: "https://www.instagram.com/adjoayeboahclothing/",
    hours: "Monday to Saturday, 9:00am – 7:00pm",
    currency: "GH₵",
    promo: { VELERIA10: 0.10 }
  };

  const PRODUCTS =   [
      {
          "id": "p01",
          "name": "The Aurelia Evening Dress",
          "category": "Dresses",
          "price": 680,
          "tag": "Bestseller",
          "description": "A refined evening silhouette with an elegant drape and timeless finish."
      },
      {
          "id": "p02",
          "name": "The Celeste Satin Midi",
          "category": "Dresses",
          "price": 520,
          "tag": "New",
          "description": "A fluid midi for celebrations and special evenings."
      },
      {
          "id": "p03",
          "name": "The Solene Occasion Gown",
          "category": "Dresses",
          "price": 890,
          "tag": "Signature",
          "description": "A statement occasion gown with graceful lines."
      },
      {
          "id": "p04",
          "name": "The Amara Tailored Dress",
          "category": "Dresses",
          "price": 460,
          "tag": "Essential",
          "description": "A versatile tailored dress for day-to-evening styling."
      },
      {
          "id": "p05",
          "name": "The Nia Sculpted Top",
          "category": "Tops",
          "price": 220,
          "tag": "New",
          "description": "A polished wardrobe top with a clean, modern silhouette."
      },
      {
          "id": "p06",
          "name": "The Elara Draped Blouse",
          "category": "Tops",
          "price": 260,
          "tag": "Bestseller",
          "description": "A softly draped blouse for workdays and occasions."
      },
      {
          "id": "p07",
          "name": "The Sloane Tailored Trouser",
          "category": "Trousers",
          "price": 340,
          "tag": "Essential",
          "description": "A smart tailored trouser designed for versatile styling."
      },
      {
          "id": "p08",
          "name": "The Amari Wide-Leg Trouser",
          "category": "Trousers",
          "price": 380,
          "tag": "New",
          "description": "A fluid wide-leg silhouette with an elegant finish."
      },
      {
          "id": "p09",
          "name": "The Sol Co-ord Set",
          "category": "Sets and Co-ords",
          "price": 590,
          "tag": "Signature",
          "description": "A coordinated two-piece look for effortless dressing."
      },
      {
          "id": "p10",
          "name": "The Mira Skirt",
          "category": "Skirts",
          "price": 310,
          "tag": "New",
          "description": "A graceful skirt that pairs with statement or minimal tops."
      },
      {
          "id": "p11",
          "name": "The Elise Classic Heel",
          "category": "Shoes",
          "price": 390,
          "tag": "Bestseller",
          "description": "A classic heel for occasion and everyday looks."
      },
      {
          "id": "p12",
          "name": "The Sienna Evening Heel",
          "category": "Shoes",
          "price": 440,
          "tag": "New",
          "description": "An elegant evening shoe with a clean profile."
      },
      {
          "id": "p13",
          "name": "The Muse Minimal Sandal",
          "category": "Shoes",
          "price": 320,
          "tag": "Essential",
          "description": "A minimal sandal for warm-weather outfits."
      },
      {
          "id": "p14",
          "name": "The Noelle Structured Bag",
          "category": "Bags",
          "price": 560,
          "tag": "Bestseller",
          "description": "A structured handbag with a timeless shape."
      },
      {
          "id": "p15",
          "name": "The Camille Shoulder Bag",
          "category": "Bags",
          "price": 480,
          "tag": "New",
          "description": "A polished shoulder bag for everyday elegance."
      },
      {
          "id": "p16",
          "name": "The Siena Mini Bag",
          "category": "Bags",
          "price": 350,
          "tag": "Essential",
          "description": "A compact accessory for dinners and weekends."
      },
      {
          "id": "p17",
          "name": "The Weekend Baseball Cap",
          "category": "Caps",
          "price": 145,
          "tag": "New",
          "description": "A relaxed cap to finish casual looks."
      },
      {
          "id": "p18",
          "name": "The Elegance Leather Belt",
          "category": "Belts",
          "price": 190,
          "tag": "Essential",
          "description": "A refined belt that brings definition to outfits."
      },
      {
          "id": "p19",
          "name": "The Champagne Occasion Fascinator",
          "category": "Fascinators",
          "price": 295,
          "tag": "Signature",
          "description": "A statement fascinator for weddings and special events."
      },
      {
          "id": "p20",
          "name": "The Pearl Detail Hairband",
          "category": "Hair Accessories",
          "price": 125,
          "tag": "Bestseller",
          "description": "A graceful hairband with delicate pearl-inspired detail."
      },
      {
          "id": "p21",
          "name": "The Lumiere Pendant",
          "category": "Jewellery",
          "price": 210,
          "tag": "Signature",
          "description": "A delicate pendant for a subtle finishing touch."
      },
      {
          "id": "p22",
          "name": "The Sol Pearl Earrings",
          "category": "Jewellery",
          "price": 185,
          "tag": "Bestseller",
          "description": "Pearl-inspired earrings with an understated look."
      },
      {
          "id": "p23",
          "name": "The Etoile Cuff",
          "category": "Jewellery",
          "price": 240,
          "tag": "New",
          "description": "A sculptural cuff designed to stand beautifully alone."
      },
      {
          "id": "p24",
          "name": "The Maison Silk Scarf",
          "category": "Accessories",
          "price": 160,
          "tag": "Essential",
          "description": "A versatile scarf for the neck, hair or handbag."
      },
      {
          "id": "p25",
          "name": "The Signature Sunglasses",
          "category": "Accessories",
          "price": 260,
          "tag": "Signature",
          "description": "A modern finishing piece for confident everyday styling."
      },
      {
          "id": "p26",
          "name": "The Little Star Occasion Dress",
          "category": "Children Clothing",
          "price": 280,
          "tag": "New",
          "description": "A special-occasion outfit for little celebrations."
      },
      {
          "id": "p27",
          "name": "The Junior Smart Set",
          "category": "Children Clothing",
          "price": 320,
          "tag": "Bestseller",
          "description": "A smart coordinated outfit for family occasions."
      },
      {
          "id": "p28",
          "name": "The Mini Everyday Sneakers",
          "category": "Children Shoes",
          "price": 210,
          "tag": "Essential",
          "description": "An everyday sneaker style for children."
      },
      {
          "id": "p29",
          "name": "The Little Occasion Shoe",
          "category": "Children Shoes",
          "price": 185,
          "tag": "New",
          "description": "A polished shoe style for children's special outfits."
      },
      {
          "id": "p30",
          "name": "The Mini Explorer Backpack",
          "category": "Children Accessories",
          "price": 195,
          "tag": "New",
          "description": "A playful everyday bag for little adventures."
      },
      {
          "id": "p31",
          "name": "The Abeni Print Midi",
          "category": "Dresses",
          "price": 500,
          "tag": "New",
          "description": "A considered dresses piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p32",
          "name": "The Solara Wrap Dress",
          "category": "Dresses",
          "price": 535,
          "tag": "Bestseller",
          "description": "A considered dresses piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p33",
          "name": "The Zuri Occasion Dress",
          "category": "Dresses",
          "price": 570,
          "tag": "Essential",
          "description": "A considered dresses piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p34",
          "name": "The Amelie Shirt Dress",
          "category": "Dresses",
          "price": 605,
          "tag": "Signature",
          "description": "A considered dresses piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p35",
          "name": "The Kora Evening Gown",
          "category": "Dresses",
          "price": 640,
          "tag": "New",
          "description": "A considered dresses piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p36",
          "name": "The Elodie Pleated Dress",
          "category": "Dresses",
          "price": 500,
          "tag": "Bestseller",
          "description": "A considered dresses piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p37",
          "name": "The Amara Linen Blouse",
          "category": "Tops",
          "price": 215,
          "tag": "Essential",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p38",
          "name": "The Kiki Statement Sleeve Top",
          "category": "Tops",
          "price": 250,
          "tag": "Signature",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p39",
          "name": "The Elodie Button Blouse",
          "category": "Tops",
          "price": 285,
          "tag": "New",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p40",
          "name": "The Zola Knit Top",
          "category": "Tops",
          "price": 320,
          "tag": "Bestseller",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p41",
          "name": "The Aster Wrap Blouse",
          "category": "Tops",
          "price": 180,
          "tag": "Essential",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p42",
          "name": "The Nia Everyday Tee",
          "category": "Tops",
          "price": 215,
          "tag": "Signature",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p43",
          "name": "The Celine Bow Blouse",
          "category": "Tops",
          "price": 250,
          "tag": "New",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p44",
          "name": "The Talia Peplum Top",
          "category": "Tops",
          "price": 285,
          "tag": "Bestseller",
          "description": "A considered tops piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p45",
          "name": "The Arden Straight-Leg Trouser",
          "category": "Trousers",
          "price": 400,
          "tag": "Essential",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p46",
          "name": "The Nia Pleated Pant",
          "category": "Trousers",
          "price": 260,
          "tag": "Signature",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p47",
          "name": "The Kofi Tailored Pant",
          "category": "Trousers",
          "price": 295,
          "tag": "New",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p48",
          "name": "The Sol Wide-Leg Pant",
          "category": "Trousers",
          "price": 330,
          "tag": "Bestseller",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p49",
          "name": "The Elara Ankle Trouser",
          "category": "Trousers",
          "price": 365,
          "tag": "Essential",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p50",
          "name": "The Sloane Classic Jean",
          "category": "Trousers",
          "price": 400,
          "tag": "Signature",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p51",
          "name": "The Amari Relaxed Pant",
          "category": "Trousers",
          "price": 260,
          "tag": "New",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p52",
          "name": "The Celeste Palazzo Trouser",
          "category": "Trousers",
          "price": 295,
          "tag": "Bestseller",
          "description": "A considered trousers piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p53",
          "name": "The Solara Two-Piece Set",
          "category": "Sets and Co-ords",
          "price": 490,
          "tag": "Essential",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p54",
          "name": "The Abeni Print Co-ord",
          "category": "Sets and Co-ords",
          "price": 525,
          "tag": "Signature",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p55",
          "name": "The Celine Lounge Set",
          "category": "Sets and Co-ords",
          "price": 560,
          "tag": "New",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p56",
          "name": "The Zuri Tailored Set",
          "category": "Sets and Co-ords",
          "price": 420,
          "tag": "Bestseller",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p57",
          "name": "The Amara Linen Co-ord",
          "category": "Sets and Co-ords",
          "price": 455,
          "tag": "Essential",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p58",
          "name": "The Elodie Knit Set",
          "category": "Sets and Co-ords",
          "price": 490,
          "tag": "Signature",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p59",
          "name": "The Nala Weekend Co-ord",
          "category": "Sets and Co-ords",
          "price": 525,
          "tag": "New",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p60",
          "name": "The Sade Occasion Set",
          "category": "Sets and Co-ords",
          "price": 560,
          "tag": "Bestseller",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p61",
          "name": "The Mira Resort Set",
          "category": "Sets and Co-ords",
          "price": 420,
          "tag": "Essential",
          "description": "A considered sets and co-ords piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p62",
          "name": "The Celeste Pleated Skirt",
          "category": "Skirts",
          "price": 255,
          "tag": "Signature",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p63",
          "name": "The Abeni Print Skirt",
          "category": "Skirts",
          "price": 290,
          "tag": "New",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p64",
          "name": "The Mira Satin Midi Skirt",
          "category": "Skirts",
          "price": 325,
          "tag": "Bestseller",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p65",
          "name": "The Zuri A-Line Skirt",
          "category": "Skirts",
          "price": 360,
          "tag": "Essential",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p66",
          "name": "The Elara Pencil Skirt",
          "category": "Skirts",
          "price": 220,
          "tag": "Signature",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p67",
          "name": "The Solara Maxi Skirt",
          "category": "Skirts",
          "price": 255,
          "tag": "New",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p68",
          "name": "The Nia Denim Skirt",
          "category": "Skirts",
          "price": 290,
          "tag": "Bestseller",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p69",
          "name": "The Kora Wrap Skirt",
          "category": "Skirts",
          "price": 325,
          "tag": "Essential",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p70",
          "name": "The Amelie Tiered Skirt",
          "category": "Skirts",
          "price": 360,
          "tag": "Signature",
          "description": "A considered skirts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p71",
          "name": "The Celeste Slingback Heel",
          "category": "Shoes",
          "price": 260,
          "tag": "New",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p72",
          "name": "The Nia Strappy Sandal",
          "category": "Shoes",
          "price": 295,
          "tag": "Bestseller",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p73",
          "name": "The Solene Block Heel",
          "category": "Shoes",
          "price": 330,
          "tag": "Essential",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p74",
          "name": "The Amara Everyday Flat",
          "category": "Shoes",
          "price": 365,
          "tag": "Signature",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p75",
          "name": "The Elara Pointed Pump",
          "category": "Shoes",
          "price": 400,
          "tag": "New",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p76",
          "name": "The Mira Weekend Sneaker",
          "category": "Shoes",
          "price": 260,
          "tag": "Bestseller",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p77",
          "name": "The Zuri Occasion Sandal",
          "category": "Shoes",
          "price": 295,
          "tag": "Essential",
          "description": "A considered shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p78",
          "name": "The Solene Top-Handle Bag",
          "category": "Bags",
          "price": 350,
          "tag": "Signature",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p79",
          "name": "The Abeni Woven Tote",
          "category": "Bags",
          "price": 385,
          "tag": "New",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p80",
          "name": "The Mira Crescent Bag",
          "category": "Bags",
          "price": 420,
          "tag": "Bestseller",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p81",
          "name": "The Elara Mini Crossbody",
          "category": "Bags",
          "price": 280,
          "tag": "Essential",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p82",
          "name": "The Celeste Evening Clutch",
          "category": "Bags",
          "price": 315,
          "tag": "Signature",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p83",
          "name": "The Zuri Everyday Tote",
          "category": "Bags",
          "price": 350,
          "tag": "New",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p84",
          "name": "The Amara Shoulder Bag",
          "category": "Bags",
          "price": 385,
          "tag": "Bestseller",
          "description": "A considered bags piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p85",
          "name": "The Heritage Baseball Cap",
          "category": "Caps",
          "price": 240,
          "tag": "Essential",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p86",
          "name": "The Weekend Canvas Cap",
          "category": "Caps",
          "price": 100,
          "tag": "Signature",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p87",
          "name": "The Minimal Monogram Cap",
          "category": "Caps",
          "price": 135,
          "tag": "New",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p88",
          "name": "The City Sport Cap",
          "category": "Caps",
          "price": 170,
          "tag": "Bestseller",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p89",
          "name": "The Classic Cotton Cap",
          "category": "Caps",
          "price": 205,
          "tag": "Essential",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p90",
          "name": "The Everyday Neutral Cap",
          "category": "Caps",
          "price": 240,
          "tag": "Signature",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p91",
          "name": "The Soft-Tone Dad Cap",
          "category": "Caps",
          "price": 100,
          "tag": "New",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p92",
          "name": "The Weekend Club Cap",
          "category": "Caps",
          "price": 135,
          "tag": "Bestseller",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p93",
          "name": "The Signature Street Cap",
          "category": "Caps",
          "price": 170,
          "tag": "Essential",
          "description": "A considered caps piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p94",
          "name": "The Sloane Buckle Belt",
          "category": "Belts",
          "price": 225,
          "tag": "Signature",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p95",
          "name": "The Abeni Woven Belt",
          "category": "Belts",
          "price": 260,
          "tag": "New",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p96",
          "name": "The Elara Slim Leather Belt",
          "category": "Belts",
          "price": 120,
          "tag": "Bestseller",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p97",
          "name": "The Solene Statement Belt",
          "category": "Belts",
          "price": 155,
          "tag": "Essential",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p98",
          "name": "The Classic Gold-Buckle Belt",
          "category": "Belts",
          "price": 190,
          "tag": "Signature",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p99",
          "name": "The Mira Waist Belt",
          "category": "Belts",
          "price": 225,
          "tag": "New",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p100",
          "name": "The Nia Everyday Belt",
          "category": "Belts",
          "price": 260,
          "tag": "Bestseller",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p101",
          "name": "The Celeste Chain Belt",
          "category": "Belts",
          "price": 120,
          "tag": "Essential",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p102",
          "name": "The Heritage Leather Belt",
          "category": "Belts",
          "price": 155,
          "tag": "Signature",
          "description": "A considered belts piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p103",
          "name": "The Aster Feather Fascinator",
          "category": "Fascinators",
          "price": 250,
          "tag": "New",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p104",
          "name": "The Solene Wedding Headpiece",
          "category": "Fascinators",
          "price": 285,
          "tag": "Bestseller",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p105",
          "name": "The Celeste Bow Fascinator",
          "category": "Fascinators",
          "price": 320,
          "tag": "Essential",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p106",
          "name": "The Amara Floral Headpiece",
          "category": "Fascinators",
          "price": 180,
          "tag": "Signature",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p107",
          "name": "The Ophelia Occasion Hat",
          "category": "Fascinators",
          "price": 215,
          "tag": "New",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p108",
          "name": "The Pearl Garden Fascinator",
          "category": "Fascinators",
          "price": 250,
          "tag": "Bestseller",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p109",
          "name": "The Zuri Sculpted Headpiece",
          "category": "Fascinators",
          "price": 285,
          "tag": "Essential",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p110",
          "name": "The Champagne Feather Clip",
          "category": "Fascinators",
          "price": 320,
          "tag": "Signature",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p111",
          "name": "The Elodie Occasion Fascinator",
          "category": "Fascinators",
          "price": 180,
          "tag": "New",
          "description": "A considered fascinators piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p112",
          "name": "The Pearl Bow Hair Clip",
          "category": "Hair Accessories",
          "price": 105,
          "tag": "Bestseller",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p113",
          "name": "The Abeni Beaded Headband",
          "category": "Hair Accessories",
          "price": 140,
          "tag": "Essential",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p114",
          "name": "The Solene Satin Scrunchie Set",
          "category": "Hair Accessories",
          "price": 175,
          "tag": "Signature",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p115",
          "name": "The Celeste Crystal Hair Pin",
          "category": "Hair Accessories",
          "price": 210,
          "tag": "New",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p116",
          "name": "The Nia Claw Clip",
          "category": "Hair Accessories",
          "price": 70,
          "tag": "Bestseller",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p117",
          "name": "The Amara Velvet Headband",
          "category": "Hair Accessories",
          "price": 105,
          "tag": "Essential",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p118",
          "name": "The Zuri Floral Hair Comb",
          "category": "Hair Accessories",
          "price": 140,
          "tag": "Signature",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p119",
          "name": "The Mira Silk Scrunchie",
          "category": "Hair Accessories",
          "price": 175,
          "tag": "New",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p120",
          "name": "The Elara Pearl Barrette",
          "category": "Hair Accessories",
          "price": 210,
          "tag": "Bestseller",
          "description": "A considered hair accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p121",
          "name": "The Abeni Gold Hoop Earrings",
          "category": "Jewellery",
          "price": 100,
          "tag": "Essential",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p122",
          "name": "The Celeste Layered Necklace",
          "category": "Jewellery",
          "price": 135,
          "tag": "Signature",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p123",
          "name": "The Solene Charm Bracelet",
          "category": "Jewellery",
          "price": 170,
          "tag": "New",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p124",
          "name": "The Zuri Pearl Drop Earrings",
          "category": "Jewellery",
          "price": 205,
          "tag": "Bestseller",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p125",
          "name": "The Mira Sculpted Ring",
          "category": "Jewellery",
          "price": 240,
          "tag": "Essential",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p126",
          "name": "The Elara Tennis Bracelet",
          "category": "Jewellery",
          "price": 100,
          "tag": "Signature",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p127",
          "name": "The Amara Pendant Necklace",
          "category": "Jewellery",
          "price": 135,
          "tag": "New",
          "description": "A considered jewellery piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p128",
          "name": "The Solene Silk Scarf",
          "category": "Accessories",
          "price": 160,
          "tag": "Bestseller",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p129",
          "name": "The Abeni Cat-Eye Sunglasses",
          "category": "Accessories",
          "price": 195,
          "tag": "Essential",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p130",
          "name": "The Celeste Card Holder",
          "category": "Accessories",
          "price": 230,
          "tag": "Signature",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p131",
          "name": "The Mira Travel Pouch",
          "category": "Accessories",
          "price": 90,
          "tag": "New",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p132",
          "name": "The Zuri Evening Shawl",
          "category": "Accessories",
          "price": 125,
          "tag": "Bestseller",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p133",
          "name": "The Elara Leather Wallet",
          "category": "Accessories",
          "price": 160,
          "tag": "Essential",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p134",
          "name": "The Amara Sunglasses Case",
          "category": "Accessories",
          "price": 195,
          "tag": "Signature",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p135",
          "name": "The Nia Keyring Charm",
          "category": "Accessories",
          "price": 230,
          "tag": "New",
          "description": "A considered accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p136",
          "name": "The Little Abeni Print Set",
          "category": "Children Clothing",
          "price": 140,
          "tag": "Bestseller",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p137",
          "name": "The Mini Solara Party Dress",
          "category": "Children Clothing",
          "price": 175,
          "tag": "Essential",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p138",
          "name": "The Junior Weekend Outfit",
          "category": "Children Clothing",
          "price": 210,
          "tag": "Signature",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p139",
          "name": "The Little Zuri Shirt Set",
          "category": "Children Clothing",
          "price": 245,
          "tag": "New",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p140",
          "name": "The Mini Celeste Occasion Dress",
          "category": "Children Clothing",
          "price": 280,
          "tag": "Bestseller",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p141",
          "name": "The Little Explorer Overall",
          "category": "Children Clothing",
          "price": 140,
          "tag": "Essential",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p142",
          "name": "The Junior Classic Shirt",
          "category": "Children Clothing",
          "price": 175,
          "tag": "Signature",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p143",
          "name": "The Mini Floral Dress",
          "category": "Children Clothing",
          "price": 210,
          "tag": "New",
          "description": "A considered children clothing piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p144",
          "name": "The Mini Cloud Sneakers",
          "category": "Children Shoes",
          "price": 205,
          "tag": "Bestseller",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p145",
          "name": "The Little Solene Sandal",
          "category": "Children Shoes",
          "price": 240,
          "tag": "Essential",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p146",
          "name": "The Junior Court Shoe",
          "category": "Children Shoes",
          "price": 100,
          "tag": "Signature",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p147",
          "name": "The Mini Everyday Slip-On",
          "category": "Children Shoes",
          "price": 135,
          "tag": "New",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p148",
          "name": "The Little Occasion Mary Jane",
          "category": "Children Shoes",
          "price": 170,
          "tag": "Bestseller",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p149",
          "name": "The Junior Sport Sneaker",
          "category": "Children Shoes",
          "price": 205,
          "tag": "Essential",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p150",
          "name": "The Mini Soft Sole Shoe",
          "category": "Children Shoes",
          "price": 240,
          "tag": "Signature",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p151",
          "name": "The Little Weekend Sandal",
          "category": "Children Shoes",
          "price": 100,
          "tag": "New",
          "description": "A considered children shoes piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p152",
          "name": "The Mini Star Backpack",
          "category": "Children Accessories",
          "price": 115,
          "tag": "Bestseller",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p153",
          "name": "The Little Bow Hair Set",
          "category": "Children Accessories",
          "price": 150,
          "tag": "Essential",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p154",
          "name": "The Junior Canvas Cap",
          "category": "Children Accessories",
          "price": 185,
          "tag": "Signature",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p155",
          "name": "The Mini Lunch Tote",
          "category": "Children Accessories",
          "price": 220,
          "tag": "New",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p156",
          "name": "The Little Travel Pouch",
          "category": "Children Accessories",
          "price": 80,
          "tag": "Bestseller",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p157",
          "name": "The Mini Bucket Hat",
          "category": "Children Accessories",
          "price": 115,
          "tag": "Essential",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p158",
          "name": "The Junior Crossbody Bag",
          "category": "Children Accessories",
          "price": 150,
          "tag": "Signature",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p159",
          "name": "The Little Keepsake Purse",
          "category": "Children Accessories",
          "price": 185,
          "tag": "New",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      },
      {
          "id": "p160",
          "name": "The Mini Sunglasses Case",
          "category": "Children Accessories",
          "price": 220,
          "tag": "Bestseller",
          "description": "A considered children accessories piece selected for a polished, versatile boutique wardrobe."
      }
  ];

  const CATEGORIES = ["All", "Dresses", "Tops", "Trousers", "Sets and Co-ords", "Skirts", "Shoes", "Bags", "Caps", "Belts", "Fascinators", "Hair Accessories", "Jewellery", "Accessories", "Children Clothing", "Children Shoes", "Children Accessories"];
  const KEYS = { cart:"vecleria_cart_v1", saved:"vecleria_saved_v1", promo:"vecleria_promo_v1" };
  const page = document.body.dataset.page || "index";
  const $ = (selector, root=document) => root.querySelector(selector);
  const money = value => CONFIG.currency + Number(value || 0).toLocaleString("en-GH", { maximumFractionDigits: 2 });
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };
  let cart = read(KEYS.cart, []);
  let saved = read(KEYS.saved, []);
  let promoCode = read(KEYS.promo, "");

  function product(id) { return PRODUCTS.find(item => item.id === id); }
  const PRODUCT_IMAGES =   {
      "p01": "https://images.pexels.com/photos/31772348/pexels-photo-31772348.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p02": "https://images.pexels.com/photos/8530276/pexels-photo-8530276.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p03": "https://images.pexels.com/photos/6925410/pexels-photo-6925410.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p04": "https://images.pexels.com/photos/5531540/pexels-photo-5531540.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p31": "https://images.pexels.com/photos/31772340/pexels-photo-31772340.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p32": "https://images.pexels.com/photos/15221657/pexels-photo-15221657.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p33": "https://images.pexels.com/photos/7202775/pexels-photo-7202775.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p34": "https://images.pexels.com/photos/7202815/pexels-photo-7202815.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p05": "https://images.pexels.com/photos/31783612/pexels-photo-31783612.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p06": "https://images.pexels.com/photos/31768847/pexels-photo-31768847.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p37": "https://images.pexels.com/photos/31769241/pexels-photo-31769241.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p38": "https://images.pexels.com/photos/31767488/pexels-photo-31767488.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p39": "https://images.pexels.com/photos/31759894/pexels-photo-31759894.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p40": "https://images.pexels.com/photos/7202895/pexels-photo-7202895.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p41": "https://images.pexels.com/photos/7203477/pexels-photo-7203477.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p42": "https://images.pexels.com/photos/7202823/pexels-photo-7202823.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p07": "https://images.pexels.com/photos/7202826/pexels-photo-7202826.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p08": "https://images.pexels.com/photos/7203892/pexels-photo-7203892.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p45": "https://images.pexels.com/photos/9082613/pexels-photo-9082613.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p46": "https://images.pexels.com/photos/7202782/pexels-photo-7202782.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p47": "https://images.pexels.com/photos/10324419/pexels-photo-10324419.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p48": "https://images.pexels.com/photos/37914449/pexels-photo-37914449.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p49": "https://images.pexels.com/photos/37643675/pexels-photo-37643675.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p50": "https://images.pexels.com/photos/22670642/pexels-photo-22670642.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p09": "https://images.pexels.com/photos/5253944/pexels-photo-5253944.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p53": "https://images.pexels.com/photos/7391128/pexels-photo-7391128.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p54": "https://images.pexels.com/photos/8217459/pexels-photo-8217459.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p55": "https://images.pexels.com/photos/7391126/pexels-photo-7391126.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p56": "https://images.pexels.com/photos/36727369/pexels-photo-36727369.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p57": "https://images.pexels.com/photos/31411871/pexels-photo-31411871.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p58": "https://images.pexels.com/photos/35063590/pexels-photo-35063590.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p59": "https://images.pexels.com/photos/12150978/pexels-photo-12150978.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p10": "https://images.pexels.com/photos/32794637/pexels-photo-32794637.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p62": "https://images.pexels.com/photos/37466308/pexels-photo-37466308.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p63": "https://images.pexels.com/photos/3550237/pexels-photo-3550237.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p64": "https://images.pexels.com/photos/8531226/pexels-photo-8531226.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p65": "https://images.pexels.com/photos/7304339/pexels-photo-7304339.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p66": "https://images.pexels.com/photos/33317708/pexels-photo-33317708.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p67": "https://images.pexels.com/photos/30363549/pexels-photo-30363549.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p68": "https://images.pexels.com/photos/13155693/pexels-photo-13155693.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p11": "https://images.pexels.com/photos/5168531/pexels-photo-5168531.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p12": "https://images.pexels.com/photos/27426618/pexels-photo-27426618.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p13": "https://images.pexels.com/photos/5863636/pexels-photo-5863636.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p71": "https://images.pexels.com/photos/37545569/pexels-photo-37545569.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p72": "https://images.pexels.com/photos/16217395/pexels-photo-16217395.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p73": "https://images.pexels.com/photos/12753202/pexels-photo-12753202.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p74": "https://images.pexels.com/photos/13340660/pexels-photo-13340660.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p75": "https://images.pexels.com/photos/28976815/pexels-photo-28976815.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p14": "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p15": "https://images.pexels.com/photos/5864264/pexels-photo-5864264.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p16": "https://images.pexels.com/photos/14584457/pexels-photo-14584457.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p78": "https://images.pexels.com/photos/14681395/pexels-photo-14681395.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p79": "https://images.pexels.com/photos/14641597/pexels-photo-14641597.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p80": "https://images.pexels.com/photos/10164658/pexels-photo-10164658.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p81": "https://images.pexels.com/photos/5737286/pexels-photo-5737286.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p82": "https://images.pexels.com/photos/8886925/pexels-photo-8886925.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p17": "https://images.pexels.com/photos/8113000/pexels-photo-8113000.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p85": "https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p86": "https://images.pexels.com/photos/8396308/pexels-photo-8396308.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p87": "https://images.pexels.com/photos/4155249/pexels-photo-4155249.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p88": "https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p89": "https://images.pexels.com/photos/1023937/pexels-photo-1023937.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p90": "https://images.pexels.com/photos/65280/pexels-photo-65280.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p91": "https://images.pexels.com/photos/7679788/pexels-photo-7679788.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p18": "https://images.pexels.com/photos/8396300/pexels-photo-8396300.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p94": "https://images.pexels.com/photos/4164506/pexels-photo-4164506.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p95": "https://images.pexels.com/photos/31713105/pexels-photo-31713105.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p96": "https://images.pexels.com/photos/31065906/pexels-photo-31065906.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p97": "https://images.pexels.com/photos/31065905/pexels-photo-31065905.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p98": "https://images.pexels.com/photos/17500754/pexels-photo-17500754.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p99": "https://images.pexels.com/photos/7123549/pexels-photo-7123549.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p100": "https://images.pexels.com/photos/6188294/pexels-photo-6188294.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p19": "https://images.pexels.com/photos/34602190/pexels-photo-34602190.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p103": "https://images.pexels.com/photos/8468151/pexels-photo-8468151.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p104": "https://images.pexels.com/photos/9428778/pexels-photo-9428778.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p105": "https://images.pexels.com/photos/4584413/pexels-photo-4584413.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p106": "https://images.pexels.com/photos/5301351/pexels-photo-5301351.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p107": "https://images.pexels.com/photos/38260162/pexels-photo-38260162.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p108": "https://images.pexels.com/photos/20903826/pexels-photo-20903826.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p20": "https://images.pexels.com/photos/29043373/pexels-photo-29043373.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p112": "https://images.pexels.com/photos/7314466/pexels-photo-7314466.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p113": "https://images.pexels.com/photos/7314460/pexels-photo-7314460.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p114": "https://images.pexels.com/photos/14587263/pexels-photo-14587263.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p115": "https://images.pexels.com/photos/28933801/pexels-photo-28933801.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p116": "https://images.pexels.com/photos/12471823/pexels-photo-12471823.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p117": "https://images.pexels.com/photos/21897124/pexels-photo-21897124.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p118": "https://images.pexels.com/photos/35989689/pexels-photo-35989689.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p21": "https://images.pexels.com/photos/28933799/pexels-photo-28933799.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p22": "https://images.pexels.com/photos/28933800/pexels-photo-28933800.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p23": "https://images.pexels.com/photos/14579309/pexels-photo-14579309.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p121": "https://images.pexels.com/photos/29013500/pexels-photo-29013500.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p122": "https://images.pexels.com/photos/34131455/pexels-photo-34131455.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p123": "https://images.pexels.com/photos/10756339/pexels-photo-10756339.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p124": "https://images.pexels.com/photos/34567763/pexels-photo-34567763.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p125": "https://images.pexels.com/photos/1213558/pexels-photo-1213558.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p24": "https://images.pexels.com/photos/8084059/pexels-photo-8084059.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p25": "https://images.pexels.com/photos/33468174/pexels-photo-33468174.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p128": "https://images.pexels.com/photos/18761007/pexels-photo-18761007.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p129": "https://images.pexels.com/photos/34148341/pexels-photo-34148341.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p130": "https://images.pexels.com/photos/1058140/pexels-photo-1058140.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p131": "https://images.pexels.com/photos/7256082/pexels-photo-7256082.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p132": "https://images.pexels.com/photos/9595286/pexels-photo-9595286.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p133": "https://images.pexels.com/photos/31779620/pexels-photo-31779620.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p26": "https://images.pexels.com/photos/26614516/pexels-photo-26614516.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p27": "https://images.pexels.com/photos/6127570/pexels-photo-6127570.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p136": "https://images.pexels.com/photos/14707139/pexels-photo-14707139.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p137": "https://images.pexels.com/photos/19529148/pexels-photo-19529148.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p138": "https://images.pexels.com/photos/8083844/pexels-photo-8083844.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p139": "https://images.pexels.com/photos/31758137/pexels-photo-31758137.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p140": "https://images.pexels.com/photos/20377118/pexels-photo-20377118.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p141": "https://images.pexels.com/photos/31633098/pexels-photo-31633098.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p28": "https://images.pexels.com/photos/23158374/pexels-photo-23158374.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p29": "https://images.pexels.com/photos/6261894/pexels-photo-6261894.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p144": "https://images.pexels.com/photos/6261891/pexels-photo-6261891.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p145": "https://images.pexels.com/photos/8083835/pexels-photo-8083835.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p146": "https://images.pexels.com/photos/8084472/pexels-photo-8084472.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p147": "https://images.pexels.com/photos/3550238/pexels-photo-3550238.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p148": "https://images.pexels.com/photos/13786287/pexels-photo-13786287.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p149": "https://images.pexels.com/photos/15893780/pexels-photo-15893780.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p30": "https://images.pexels.com/photos/18745880/pexels-photo-18745880.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p152": "https://images.pexels.com/photos/5560083/pexels-photo-5560083.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p153": "https://images.pexels.com/photos/21404458/pexels-photo-21404458.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p154": "https://images.pexels.com/photos/31828299/pexels-photo-31828299.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p155": "https://images.pexels.com/photos/31768845/pexels-photo-31768845.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p156": "https://images.pexels.com/photos/12112062/pexels-photo-12112062.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p157": "https://images.pexels.com/photos/22589303/pexels-photo-22589303.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p158": "https://images.pexels.com/photos/27127377/pexels-photo-27127377.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p35": "https://images.pexels.com/photos/25466377/pexels-photo-25466377.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p43": "https://images.pexels.com/photos/31444321/pexels-photo-31444321.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p51": "https://images.pexels.com/photos/16998408/pexels-photo-16998408.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p60": "https://images.pexels.com/photos/7657229/pexels-photo-7657229.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p76": "https://images.pexels.com/photos/33826162/pexels-photo-33826162.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p83": "https://images.pexels.com/photos/7130024/pexels-photo-7130024.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p126": "https://images.pexels.com/photos/8705779/pexels-photo-8705779.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p127": "https://images.pexels.com/photos/13155692/pexels-photo-13155692.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p134": "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p135": "https://images.pexels.com/photos/7383114/pexels-photo-7383114.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p142": "https://images.pexels.com/photos/5560013/pexels-photo-5560013.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p143": "https://images.pexels.com/photos/34976595/pexels-photo-34976595.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p150": "https://images.pexels.com/photos/13822967/pexels-photo-13822967.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p151": "https://images.pexels.com/photos/35753260/pexels-photo-35753260.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p159": "https://images.pexels.com/photos/4715320/pexels-photo-4715320.jpeg?auto=compress&cs=tinysrgb&w=900",
      "p160": "https://images.pexels.com/photos/7333985/pexels-photo-7333985.jpeg?auto=compress&cs=tinysrgb&w=900"
  };

  function image(id, alt) {
    const src = PRODUCT_IMAGES[id];
    if (!src) return '<div class="ph ph-placeholder" role="img" aria-label="Product image preview being prepared"><span>VECLÉRIA</span><small>Preview image</small></div>';
    return '<div class="ph"><img src="' + src + '" alt="' + escapeHtml(alt) + '" loading="lazy" decoding="async" onerror="this.remove()"></div>';
  }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  }
  function toast(message) {
    let node = $(".toast");
    if (!node) { node = document.createElement("div"); node.className = "toast"; node.setAttribute("role","status"); document.body.appendChild(node); }
    node.textContent = message; node.classList.add("show");
    window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => node.classList.remove("show"), 2400);
  }
  function cartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }
  function saveState() { write(KEYS.cart, cart); write(KEYS.saved, saved); write(KEYS.promo, promoCode); updateCounts(); }
  function updateCounts() {
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(node => node.textContent = count);
    document.querySelectorAll("[data-saved-count]").forEach(node => node.textContent = saved.length);
  }
  function whatsappUrl(message) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(message); }

  function renderShell() {
    const header = $("#siteHeader");
    if (header) header.innerHTML = `
      <div class="topbar">A considered collection · Made to be remembered</div>
      <header class="header"><div class="container header-inner">
        <nav aria-label="Main navigation"><ul class="nav">
          <li><a href="index.html" class="${page==="index"?"active":""}">Home</a></li>
          <li><a href="shop.html" class="${page==="shop"||page==="product"?"active":""}">Shop</a></li>
          <li><a href="about.html" class="${page==="about"?"active":""}">About</a></li>
          <li><a href="journal.html" class="${page==="journal"?"active":""}">Journal</a></li>
          <li><a href="contact.html" class="${page==="contact"?"active":""}">Contact</a></li>
        </ul></nav>
        <a class="logo" href="index.html" aria-label="VECLÉRIA home">VECLÉRIA</a>
        <div class="header-icons">
          <a class="icon-btn" href="shop.html?saved=1" aria-label="Saved items">♡<span class="count" data-saved-count>${saved.length}</span></a>
          <a class="icon-btn" href="cart.html" aria-label="Shopping bag">♧<span class="count" data-cart-count>${cartCount()}</span></a>
        </div>
      </div></header>`;
    const footer = $("#siteFooter");
    if (footer) footer.innerHTML = `
      <footer class="footer"><div class="container">
        <div class="footer-grid">
          <div><a class="logo" href="index.html">VECLÉRIA</a><p>Premium fashion, considered details and pieces made to be remembered.</p><p><a href="https://www.instagram.com/adjoayeboahclothing/" target="_blank" rel="noopener noreferrer">${CONFIG.instagram}</a></p></div>
          <div><h4>Explore</h4><ul><li><a href="shop.html">Shop all</a></li><li><a href="customise.html">Bespoke atelier</a></li><li><a href="about.html">Our story</a></li><li><a href="journal.html">The journal</a></li></ul></div>
          <div><h4>Help</h4><ul><li><a href="contact.html">Contact us</a></li><li><a href="cart.html">Shopping bag</a></li><li><a href="mailto:${CONFIG.email}">Email us</a></li><li><a href="${whatsappUrl("Hello VECLÉRIA, I have an enquiry.")}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
          <div><h4>Visit / Connect</h4><p>${CONFIG.address}<br>${CONFIG.phone}<br><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p><p>${CONFIG.hours}</p></div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} VECLÉRIA. All rights reserved. <span style="float:right">Demo collection · Prices subject to confirmation</span></div>
      </div></footer>`;
  }

  function card(item) {
    const isSaved = saved.includes(item.id);
    return `<article class="card">
      <a href="product.html?id=${encodeURIComponent(item.id)}" aria-label="View ${escapeHtml(item.name)}">${image(item.id, item.name)}</a>
      <span class="tag">${escapeHtml(item.tag)}</span>
      <button class="wish ${isSaved?"on":""}" type="button" data-wish="${item.id}" aria-label="${isSaved?"Remove from":"Add to"} saved items" aria-pressed="${isSaved}">${isSaved?"♥":"♡"}</button>
      <div class="meta">${escapeHtml(item.category)}</div>
      <h3><a href="product.html?id=${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a></h3>
      <div class="price">${money(item.price)}</div>
      <div class="quick"><button class="btn btn-dark" type="button" data-add="${item.id}">Add to bag</button></div>
    </article>`;
  }
  function addToCart(id, qty=1) {
    const item = product(id); if (!item) return;
    const existing = cart.find(row => row.id === id);
    if (existing) existing.qty += qty; else cart.push({ id, qty });
    saveState(); toast("Added to your bag");
  }
  function toggleSaved(id) {
    saved = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
    saveState(); renderShop(); renderFeatured(); renderProduct();
    toast(saved.includes(id) ? "Saved to your favourites" : "Removed from saved items");
  }
  function renderFeatured() {
    const target = $("#featured"); if (!target) return;
    target.innerHTML = PRODUCTS.slice(0, 4).map(card).join("");
    const marquee = $("#marquee");
    if (marquee) marquee.innerHTML = Array(2).fill('<span>VECLÉRIA · DRESS WITH INTENTION · QUIET LUXURY ·</span>').join("");
  }
  function renderShop() {
    const grid = $("#shopGrid"); if (!grid) return;
    const query = ($("#q")?.value || "").trim().toLowerCase();
    const selected = $("#catChips")?.dataset.category || new URLSearchParams(location.search).get("cat") || "All";
    const onlySaved = $("#savedChip")?.getAttribute("aria-pressed") === "true" || new URLSearchParams(location.search).get("saved") === "1";
    let items = PRODUCTS.filter(item => (selected === "All" || item.category === selected) &&
      (!onlySaved || saved.includes(item.id)) &&
      (!query || (item.name + " " + item.category + " " + item.description).toLowerCase().includes(query)));
    const sort = $("#sort")?.value || "featured";
    if (sort === "low") items.sort((a,b)=>a.price-b.price);
    if (sort === "high") items.sort((a,b)=>b.price-a.price);
    $("#count").textContent = items.length + (items.length===1 ? " piece" : " pieces");
    grid.innerHTML = items.length ? items.map(card).join("") : '<div class="empty"><h3>No pieces found</h3><p>Try another search or category.</p></div>';
  }
  function setupShop() {
    const chips = $("#catChips"); if (!chips) return;
    const initial = new URLSearchParams(location.search).get("cat") || "All";
    chips.dataset.category = CATEGORIES.includes(initial) ? initial : "All";
    chips.innerHTML = CATEGORIES.map(cat => `<button type="button" class="chip" data-category="${cat}" aria-pressed="${cat===chips.dataset.category}">${cat}</button>`).join("");
    const savedOnly = new URLSearchParams(location.search).get("saved")==="1";
    $("#savedChip")?.setAttribute("aria-pressed", String(savedOnly));
    $("#q")?.addEventListener("input", renderShop);
    $("#sort")?.addEventListener("change", renderShop);
    chips.addEventListener("click", event => {
      const button = event.target.closest("[data-category]"); if (!button) return;
      chips.dataset.category = button.dataset.category;
      chips.querySelectorAll("button").forEach(node => node.setAttribute("aria-pressed", String(node===button)));
      renderShop();
    });
    $("#savedChip")?.addEventListener("click", event => {
      const button = event.currentTarget;
      button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed")!=="true"));
      renderShop();
    });
    renderShop();
  }
  function renderProduct() {
    const box = $("#productBox"); if (!box) return;
    const id = new URLSearchParams(location.search).get("id") || "p01";
    const item = product(id) || PRODUCTS[0];
    $("#crumb").textContent = item.name;
    box.innerHTML = `
      <div>${image(item.id,item.name)}</div>
      <div><span class="eyebrow">${escapeHtml(item.category)}</span><h1>${escapeHtml(item.name)}</h1>
        <div class="price">${money(item.price)}</div><p>${escapeHtml(item.description)}</p>
        <p class="meta">Demo price · Confirm availability before ordering</p>
        <div class="opt"><b>Quantity</b><div class="qty"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><span id="productQty">1</span><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div></div>
        <div class="hero-actions"><button class="btn btn-dark" type="button" data-add-detail="${item.id}">Add to bag</button><button class="btn btn-line" type="button" data-wish="${item.id}">${saved.includes(item.id)?"♥ Saved":"♡ Save item"}</button></div>
        <p style="margin-top:1.5rem">Need a different fit or finish? <a class="link-btn" href="customise.html">Request a custom piece</a>.</p>
      </div>`;
    const related = $("#related");
    if (related) related.innerHTML = PRODUCTS.filter(p=>p.category===item.category && p.id!==item.id).slice(0,3).map(card).join("");
  }

  function renderCart() {
    const target = $("#cartItems"); if (!target) return;
    if (!cart.length) target.innerHTML = '<div class="empty"><h3>Your bag is waiting</h3><p>Explore the collection and add a piece you love.</p><a class="btn btn-dark" href="shop.html">Explore the collection</a></div>';
    else target.innerHTML = cart.map(row => {
      const item = product(row.id); if (!item) return "";
      return `<div class="line-item"><a href="product.html?id=${item.id}">${image(item.id,item.name)}</a><div><h3><a href="product.html?id=${item.id}">${escapeHtml(item.name)}</a></h3><p class="meta">${escapeHtml(item.category)}</p><div class="qty"><button type="button" data-cart-qty="-1" data-id="${item.id}">−</button><span>${row.qty}</span><button type="button" data-cart-qty="1" data-id="${item.id}">+</button></div><p><button class="link-btn" type="button" data-remove="${item.id}">Remove</button></p></div><strong>${money(item.price*row.qty)}</strong></div>`;
    }).join("");
    const subtotal = cart.reduce((sum,row)=>sum+(product(row.id)?.price||0)*row.qty,0);
    const discount = CONFIG.promo[promoCode] ? subtotal*CONFIG.promo[promoCode] : 0;
    const total = subtotal-discount;
    $("#sumRows").innerHTML = `<div class="row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>${discount?'<div class="row save"><span>Promo ('+escapeHtml(promoCode)+')</span><strong>−'+money(discount)+'</strong></div>':""}<div class="row"><span>Delivery</span><span>Confirmed on WhatsApp</span></div><div class="row total"><span>Estimated total</span><strong>${money(total)}</strong></div>`;
    if ($("#promoInput") && promoCode) $("#promoInput").value = promoCode;
    const order = $("#placeOrder");
    if (order) {
      const lines = cart.map(row => { const item=product(row.id); return item ? "- "+item.name+" × "+row.qty+" = "+money(item.price*row.qty) : ""; }).filter(Boolean).join("\n");
      const details = ["Hello VECLÉRIA, I would like to place an order.","",lines,"","Subtotal: "+money(subtotal),"Discount: "+money(discount),"Estimated total: "+money(total),"","Name: "+($("#cName")?.value||""),"Phone: "+($("#cPhone")?.value||""),"Delivery address: "+($("#cAddr")?.value||""),"Payment preference: "+($("#cPay")?.value||""),"Notes: "+($("#cNotes")?.value||""),"","Please confirm availability, delivery fee and final payment details."].join("\n");
      order.href = whatsappUrl(details);
      order.setAttribute("aria-disabled", String(!cart.length));
      order.style.pointerEvents = cart.length ? "auto" : "none";
      order.style.opacity = cart.length ? "1" : ".5";
    }
  }
  function setupCart() {
    if (!$("#cartItems")) return;
    $("#clearBtn")?.addEventListener("click",()=>{cart=[];promoCode="";saveState();renderCart();});
    $("#applyPromo")?.addEventListener("click",()=>{
      const code = ($("#promoInput")?.value||"").trim().toUpperCase();
      if (CONFIG.promo[code]) { promoCode=code; saveState(); toast("Promo code applied"); }
      else { promoCode=""; saveState(); toast("That demo promo code is not recognised"); }
      renderCart();
    });
    ["cName","cPhone","cAddr","cPay","cNotes"].forEach(id=>$("#"+id)?.addEventListener("input",renderCart));
    renderCart();
  }

  const CUSTOM_OPTIONS = [
    { title:"Piece type", name:"piece", options:["Dress","Two-piece set","Gown","Skirt","Blouse"] },
    { title:"Fabric", name:"fabric", options:["Satin","Lace","Ankara","Chiffon","Crepe","Not sure yet"] },
    { title:"Colour", name:"colour", options:["Forest green","Champagne","Ivory","Black","Burgundy","Custom colour"] },
    { title:"Fit", name:"fit", options:["Relaxed","Tailored","Fitted","Not sure yet"] },
    { title:"Neckline", name:"neckline", options:["Sweetheart","Off shoulder","High neck","V-neck","Halter","Custom"] },
    { title:"Length", name:"length", options:["Mini","Midi","Maxi","Full length"] }
  ];
  function setupCustomise() {
    const host=$("#custGroups"); if (!host) return;
    const choices={piece:"Dress",fabric:"Satin",colour:"Forest green",fit:"Tailored",neckline:"Sweetheart",length:"Midi"};
    host.innerHTML=CUSTOM_OPTIONS.map(group=>`<fieldset class="group"><legend>${group.title}</legend><div class="chips">${group.options.map(option=>`<button type="button" class="chip" data-choice="${group.name}" data-value="${option}" aria-pressed="${option===choices[group.name]}">${option}</button>`).join("")}</div></fieldset>`).join("");
    function update() {
      $("#custSummary").innerHTML=Object.entries(choices).map(([key,value])=>`<li><span>${key.charAt(0).toUpperCase()+key.slice(1)}</span><strong>${escapeHtml(value)}</strong></li>`).join("");
      const details=["Hello VECLÉRIA, I would like to request a custom piece.","",...Object.entries(choices).map(([k,v])=>k+": "+v),"", "Bust: "+($("#mBust")?.value||"Not provided")+" cm","Waist: "+($("#mWaist")?.value||"Not provided")+" cm","Hips: "+($("#mHips")?.value||"Not provided")+" cm","Height: "+($("#mHeight")?.value||"Not provided")+" cm","Name: "+($("#cName")?.value||""),"Needed by: "+($("#fDate")?.value||"Flexible"),"Notes: "+($("#cNotes")?.value||""),"","Please confirm the design, price and timeline."].join("\n");
      $("#custSend").href=whatsappUrl(details);
    }
    host.addEventListener("click",event=>{
      const button=event.target.closest("[data-choice]"); if(!button)return;
      choices[button.dataset.choice]=button.dataset.value;
      host.querySelectorAll("[data-choice='"+button.dataset.choice+"']").forEach(node=>node.setAttribute("aria-pressed",String(node===button)));
      update();
    });
    ["mBust","mWaist","mHips","mHeight","cName","fDate","cNotes"].forEach(id=>$("#"+id)?.addEventListener("input",update));
    update();
  }
  function setupContact() {
    const send=$("#ctSend"); if(!send)return;
    function update() {
      const message=["Hello VECLÉRIA, I have an enquiry.","","Name: "+($("#ctName")?.value||""),"Contact: "+($("#ctContact")?.value||""),"Topic: "+($("#ctTopic")?.value||""),"Message: "+($("#ctMsg")?.value||"")].join("\n");
      send.href=whatsappUrl(message);
    }
    ["ctName","ctContact","ctTopic","ctMsg"].forEach(id=>$("#"+id)?.addEventListener("input",update));
    update();
  }
  function addContactDetails() {
    document.querySelectorAll("[data-cfg]").forEach(node=>{
      const key=node.dataset.cfg;
      if(key==="instagram") node.innerHTML='<a href="'+CONFIG.instagramUrl+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(CONFIG.instagram)+'</a>';
      else node.textContent=CONFIG[key]||"";
    });
  }

  document.addEventListener("click",event=>{
    const wish=event.target.closest("[data-wish]");
    if(wish){event.preventDefault();toggleSaved(wish.dataset.wish);return;}
    const add=event.target.closest("[data-add]");
    if(add){addToCart(add.dataset.add);return;}
    const detail=event.target.closest("[data-add-detail]");
    if(detail){const qty=Math.max(1,Number($("#productQty")?.textContent||1));addToCart(detail.dataset.addDetail,qty);return;}
    const qty=event.target.closest("[data-qty]");
    if(qty){const node=$("#productQty");node.textContent=String(Math.max(1,Math.min(10,Number(node.textContent)+Number(qty.dataset.qty))));return;}
    const cartQty=event.target.closest("[data-cart-qty]");
    if(cartQty){const row=cart.find(item=>item.id===cartQty.dataset.id);if(row){row.qty+=Number(cartQty.dataset.cartQty);if(row.qty<=0)cart=cart.filter(item=>item.id!==row.id);saveState();renderCart();}return;}
    const remove=event.target.closest("[data-remove]");
    if(remove){cart=cart.filter(item=>item.id!==remove.dataset.remove);saveState();renderCart();}
  });

  renderShell();
  addContactDetails();
  updateCounts();
  if(page==="index") renderFeatured();
  if(page==="shop") setupShop();
  if(page==="product") renderProduct();
  if(page==="cart") setupCart();
  if(page==="customise") setupCustomise();
  if(page==="contact") setupContact();

  document.querySelectorAll("img").forEach(img=>img.addEventListener("error",()=>{img.style.display="none";},{once:true}));
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll(".reveal").forEach(node=>observer.observe(node));
  } else document.querySelectorAll(".reveal").forEach(node=>node.classList.add("visible"));
})();