const cities = [
  {
    Phone: "201-422-9000",
    Area: "Union City",
    //Mesivta Sanz of Hudson County
    Latitude: 40.77282,
    Longitude: -74.027222
  },
  {
    Phone: "203-754-4200",
    Area: "Waterbury",
    //Yeshiva Gedolah
    Latitude: 41.568274,
    Longitude: -73.040671
  },
  {
    Phone: "212-230-1000",
    Area: "Brooklyn/NYC",
    //Shomer Shabbos
    Latitude: 40.632954,
    Longitude: -73.994682
  },
  {
    Phone: "212-230-1000",
    Area: "Washington Heights",
    //KAJ
    Latitude: 40.853358,
    Longitude: -73.935625
  },
  {
    Phone: "215-914-1600",
    Area: "Philadelphia",
    //House of Kosher
    Latitude: 40.092787,
    Longitude: -75.033102
  },
  {
    Phone: "305-919-4900",
    Area: "Miami",
    //Surfside
    Latitude: 25.878082,
    Longitude: -80.124638
  },
  {
    Phone: "410-358-0000",
    Area: "Baltimore",
    //Agudah shul
    Latitude: 39.358051,
    Longitude: -76.693087
  },
  {
    Phone: "410-764-0000",
    Area: "Baltimore",
    //Agudah shul
    Latitude: 39.358051,
    Longitude: -76.693087
  },
  {
    Phone: "416-256-1000",
    Area: "Toronto",
    //Boat shul
    Latitude: 43.715629,
    Longitude: -79.42842
  },
  {
    Phone: "450-434-2222",
    Area: "Tosh",
    //Hatzola office
    Latitude: 45.613483,
    Longitude: -73.872429
  },
  {
    Phone: "514-341-1818",
    Area: "Montreal",
    //Yeshiva Gedola
    Latitude: 45.512879,
    Longitude: -73.620294
  },
  {
    Phone: "718-387-1750",
    Area: "Brooklyn/NYC",
    //Shomer Shabbos
    Latitude: 40.632954,
    Longitude: -73.994682
  },
  {
    Phone: "718-387-1750",
    Area: "Catskills",
    //Camp Munk
    Latitude: 41.740291,
    Longitude: -74.720995
  },
  {
    Phone: "718-387-1750",
    Area: "Rockaways & Nassau County",
    //Darchei
    Latitude: 40.5968,
    Longitude: -73.751511
  },
  {
    Phone: "718-755-8600",
    Area: "Fleischmans",
    //center
    Latitude: 42.155138,
    Longitude: -74.535021
  },
  {
    Phone: "732-370-3600",
    Area: "Lakewood",
    //BMG
    Latitude: 40.096415,
    Longitude: -74.220611
  },
  {
    Phone: "732-531-9988",
    Area: "Jersey Shore",
    //Slices pizza store
    Latitude: 40.259701,
    Longitude: -74.000322
  },
  {
    Phone: "800-613-1911",
    Area: "Los Angeles",
    //R' Bess shul
    Latitude: 34.076619,
    Longitude: -118.346722
  },
  {
    Phone: "845-425-1600",
    Area: "Rockland",
    //Vizhnitz
    Latitude: 41.119015,
    Longitude: -74.066636
  },
  {
    Phone: "845-783-1212",
    Area: "Monroe/KJ",
    //center
    Latitude: 41.34125,
    Longitude: -74.168611
  },
  {
    Phone: "847-504-1500",
    Area: "Chicago",
    //Adas Yeshurun - R' Zev Cohen
    Latitude: 42.012303,
    Longitude: -87.706318
  },
  {
    Phone: "866-487-1750",
    Area: "Union City",
    //Mesivta Sanz of Hudson County
    Latitude: 40.772747,
    Longitude: -74.027212
  },
  {
    Phone: "908-659-9550",
    Area: "Elizabeth NJ",
    //Adath Jeshurun
    Latitude: 40.662489,
    Longitude: -74.222166
  },
  {
    Phone: "914-241-3414",
    Area: "Mt Kisco",
    //Nitra yeshiva
    Latitude: 41.232471,
    Longitude: -73.748058
  },
  {
    Phone: "973-472-1002",
    Area: "Passaic/Clifton",
    //BTU - R' Zupnik shul
    Latitude: 40.852933,
    Longitude: -74.12959
  },
  {
    Phone: "973-773-9988",
    Area: "North NJ",
    //BTU - R' Zupnik shul
    Latitude: 40.852933,
    Longitude: -74.12959
  }
];

function distance(p1, p2) {
  const latDiff = p1.Latitude - p2.Latitude;
  const longDiff = p1.Longitude - p2.Longitude;

  return Math.sqrt(latDiff ** 2 + longDiff ** 2);
}

function getAxis(depth) {
  const k = 2; //k is 2 (lat/long)
  return depth % k === 0 ? "Latitude" : "Longitude";
}

function buildKdTree(cities, depth = 0) {
  const len = cities.length;
  if (!len) return;

  const axis = getAxis(depth);

  cities = cities.sort((a, b) => {
    if (a[axis] > b[axis]) return 1;
    if (a[axis] < b[axis]) return -1;
    return 0;
  });

  const pivot = Math.trunc(len / 2);

  return {
    Pivot: cities[pivot],
    Left: buildKdTree(cities.slice(0, pivot), depth + 1),
    Right: buildKdTree(cities.slice(pivot + 1, len), depth + 1)
  };
}

function naiveNearestPoint(root, point, nearest, depth = 0) {
  if (!root) return nearest;

  const axis = getAxis(depth);

  const nextBranch = point[axis] < root.Pivot[axis] ? root.Left : root.Right;

  if (!nearest || distance(point, root.Pivot) < distance(point, nearest)) {
    nearest = root.Pivot;
  }

  return naiveNearestPoint(nextBranch, point, nearest, depth + 1);
}

function getNearerDistanceToPoint(point, p1, p2) {
  if (!p1) return p2;
  if (!p2) return p1;

  return distance(point, p1) < distance(point, p2) ? p1 : p2;
}

function getNearestPoint(root, point, depth = 0) {
  if (!root) return;

  const axis = getAxis(depth);

  let nextBranch, oppositeBranch;

  if (point[axis] < root.Pivot[axis]) {
    nextBranch = root.Left;
    oppositeBranch = root.Right;
  } else {
    nextBranch = root.Right;
    oppositeBranch = root.Left;
  }

  const result = getNearestPoint(nextBranch, point, depth + 1);
  let nearest = getNearerDistanceToPoint(point, result, root.Pivot);

  if (distance(point, nearest) > Math.abs(point[axis] - root.Pivot[axis])) {
    const oppoNearest = getNearestPoint(oppositeBranch, point, depth + 1);
    nearest = getNearerDistanceToPoint(point, nearest, oppoNearest);
  }

  return nearest;
}

function getNearestHatzolah(latitude, longitude) {
  const tree = buildKdTree(cities);
  const currentLocation = { Latitude: latitude, Longitude: longitude };
  return getNearestPoint(tree, currentLocation);
}

function tests() {
  const testLocations = [
    {
      Latitude: 41.569169,
      Longitude: -73.04499,
      Expected: "Waterbury"
    },
    {
      Latitude: 42.035393,
      Longitude: -87.741373,
      Expected: "Chicago"
    },
    {
      Latitude: 40.60531,
      Longitude: -73.740166,
      Expected: "Rockaways & Nassau County"
    },
    {
      Latitude: 25.819901,
      Longitude: -80.122229,
      Expected: "Miami"
    },
    {
      Latitude: 40.850583,
      Longitude: -73.929665,
      Expected: "Washington Heights"
    }
  ];

  for (let location of testLocations) {
    const result = getNearestHatzolah(location.Latitude, location.Longitude);
    console.assert(
      result.Area === location.Expected,
      `Expected ${location.Expected} but got ${result.Area}`
    );
  }
}

//tests();
