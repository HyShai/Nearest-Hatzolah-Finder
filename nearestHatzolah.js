const cities = [
  {
    Area: "Baltimore",
    Phone: "410-358-0000",
    Latitude: 39.362695,
    Longitude: -76.689162
  },
  {
    Area: "Boro Park",
    Phone: "718-387-1750",
    Latitude: 40.629262,
    Longitude: -73.987335
  },
  {
    Area: "Brooklyn",
    Phone: "718-230-1000",
    Latitude: 40.624437,
    Longitude: -73.947158
  },
  {
    Area: "Catskills",
    Phone: "718-387-1750",
    Latitude: 41.655647,
    Longitude: -74.689328
  },
  {
    Area: "Chicago",
    Phone: "847-504-1500",
    Latitude: 42.029484,
    Longitude: -87.711108
  },
  {
    Area: "Crown Heights",
    Phone: "718-387-1750",
    Latitude: 40.668993,
    Longitude: -73.94287
  },
  {
    Area: "Jersey Shore",
    Phone: "732-531-9988",
    Latitude: 40.269167,
    Longitude: -73.991667
  },
  {
    Area: "Flatbush",
    Phone: "718-230-1000",
    Latitude: 40.615891,
    Longitude: -73.954788
  },
  {
    Area: "Fleischmanns",
    Phone: "845-254-5555",
    Latitude: 42.158847,
    Longitude: -74.519254
  },
  {
    Area: "Los Angeles",
    Phone: "800-613-1911",
    Latitude: 34.054712,
    Longitude: -118.390203
  },
  {
    Area: "Kiryas Joel",
    Phone: "845-783-1212",
    Latitude: 41.342366,
    Longitude: -74.169065
  },
  {
    Area: "Kiryas Tosh",
    Phone: "450-434-2222",
    Latitude: 45.613523,
    Longitude: -73.872362
  },
  {
    Area: "Lakewood",
    Phone: "732-370-3600",
    Latitude: 40.106688,
    Longitude: -74.224094
  },
  {
    Area: "Mexico",
    Phone: "5888-9999",
    Latitude: 19.432608,
    Longitude: -99.133208
  },
  {
    Area: "Miami-Dade",
    Phone: "305-919-4900",
    Latitude: 25.924016,
    Longitude: -80.176905
  },
  {
    Area: "Mill Basin",
    Phone: "718-230-1000",
    Latitude: 40.616275,
    Longitude: -73.912611
  },
  {
    Area: "Montreal (M)",
    Phone: "514-341-1818",
    Latitude: 45.52795,
    Longitude: -73.616037
  },
  {
    Area: "Montreal (D&W)",
    Phone: "514-341-1818",
    Latitude: 45.51633,
    Longitude: -73.625491
  },
  {
    Area: "New York City",
    Phone: "212-230-1000",
    Latitude: 40.714135,
    Longitude: -73.986433
  },
  {
    Area: "Passaic",
    Phone: "973-472-1002",
    Latitude: 40.856766,
    Longitude: -74.128476
  },
  {
    Area: "Philadelphia",
    Phone: "215-677-6700",
    Latitude: 40.109719,
    Longitude: -75.043844
  },
  {
    Area: "Queens",
    Phone: "718-387-1750",
    Latitude: 40.704841,
    Longitude: -73.830298
  },
  {
    Area: "Riverdale",
    Phone: "212-230-1000",
    Latitude: 40.903981,
    Longitude: -73.914126
  },
  {
    Area: "Rockaways & Nassau County",
    Phone: "212-230-1000",
    Latitude: 40.600852,
    Longitude: -73.745726
  },
  {
    Area: "Rockland",
    Phone: "845-425-1600",
    Latitude: 41.11101,
    Longitude: -74.070756
  },
  {
    Area: "Toronto",
    Phone: "416-256-1000",
    Latitude: 43.718501,
    Longitude: -79.433084
  },
  {
    Area: "Union City",
    Phone: "201-422-9000",
    Latitude: 40.772552,
    Longitude: -74.027212
  },
  {
    Area: "Middlesex County",
    Phone: "732-640-5545",
    Latitude: 40.526424,
    Longitude: -74.386982
  },
  {
    Area: "Elizabeth",
    Phone: "908-659-9550",
    Latitude: 40.651752,
    Longitude: -74.214998
  },
  {
    Area: "Washington Heights",
    Phone: "212-230-1000",
    Latitude: 40.840145,
    Longitude: -73.938921
  },
  {
    Area: "Williamsburg",
    Phone: "718-387-1750",
    Latitude: 40.706151,
    Longitude: -73.952202
  },
  {
    Area: "Waterbury",
    Phone: "203-754-4200",
    Latitude: 41.562749,
    Longitude: -73.040038
  },
  {
    Area: "The West Side (NYC)",
    Phone: "212-230-1000",
    Latitude: 40.787292,
    Longitude: -73.973244
  }
];


function distance(p1, p2) {
  const latDiff = p1.Latitude - p2.Latitude;
  const longDiff = p1.Longitude - p2.Longitude;

  return Math.sqrt(latDiff ** 2 + longDiff ** 2);
}

function getNearerDistanceToPoint(point, p1, p2) {
  if (!p1) return p2;
  if (!p2) return p1;

  return distance(point, p1) < distance(point, p2) ? p1 : p2;
}


/*

  #####                       #######                      
 #     # #    #   ##   #####     #    #####  ###### ###### 
 #     # #    #  #  #  #    #    #    #    # #      #      
 #     # #    # #    # #    #    #    #    # #####  #####  
 #   # # #    # ###### #    #    #    #####  #      #      
 #    #  #    # #    # #    #    #    #   #  #      #      
  #### #  ####  #    # #####     #    #    # ###### ###### 
                                                           
*/

class Box {
  constructor(latitude, longitude, halfDimension){
    this.Latitude = latitude;
    this.Longitude = longitude;
    this.halfDimension = halfDimension;
  }

  containsPoint(point){
    return (this.Latitude + this.halfDimension >= point.Latitude &&
    this.Latitude - this.halfDimension <= point.Latitude &&
    this.Longitude + this.halfDimension >= point.Longitude &&
    this.Longitude - this.halfDimension <= point.Longitude);
  }

  intersectsBox(box){

  }
}

class QuadTree {

  QT_NODE_CAPACITY = 4;

  constructor(box){
    this.boundary = box;
    this.points = [];
    this.isSubdivided = false;
  }

  insert(point){
    if(!this.boundary.containsPoint(point)) {
      return;
    }

    if(this.points.length < this.QT_NODE_CAPACITY && !this.isSubdivided){
      this.points.push(point);
      return;
    }

    if(!this.isSubdivided){
      this.subdivide();
    }

    this.northWest.insert(point);
    this.northEast.insert(point);
    this.southWest.insert(point);
    this.southEast.insert(point);
  }

  subdivide(){
    const newHalf = this.boundary.halfDimension / 2;
    const lat = this.boundary.Latitude;
    const long = this.boundary.Longitude;

    const nwBoundary = new Box(lat + newHalf, long - newHalf, newHalf);
    this.northWest = new QuadTree(nwBoundary);
    const neBoundary = new Box(lat + newHalf, long + newHalf, newHalf);
    this.northEast = new QuadTree(neBoundary);
    const swBoundary = new Box(lat - newHalf, long - newHalf, newHalf);
    this.southWest = new QuadTree(swBoundary);
    const seBoundary = new Box(lat - newHalf, long + newHalf, newHalf);
    this.southEast = new QuadTree(seBoundary);
    
    this.isSubdivided = true;
  }

  findNearest(point, nearest){
    if(!this.boundary.containsPoint(point)){
      return nearest;
    }

    for (let p of this.points){
      nearest = getNearerDistanceToPoint(point, nearest, p);
    }

    if(!this.isSubdivided){
      return nearest;
    }

    nearest = this.northEast.findNearest(point, nearest);
    nearest = this.northWest.findNearest(point, nearest);
    nearest = this.southEast.findNearest(point, nearest);
    nearest = this.southWest.findNearest(point, nearest);

    return nearest;
  }
}

function buildQuadTree(cities){
  let boundary = new Box(0, 0, 180);
  let tree = new QuadTree(boundary);
  
  for(let city of cities){
    tree.insert(city);
  }

  return tree;
}

function getNearestHatzolahQuadTree(latitude, longitude) {
  const tree = buildQuadTree(cities);
  const currentLocation = { Latitude: latitude, Longitude: longitude };
  return tree.findNearest(currentLocation);
}


/*

 #    #           #######                      
 #   #  #####        #    #####  ###### ###### 
 #  #   #    #       #    #    # #      #      
 ###    #    #       #    #    # #####  #####  
 #  #   #    #       #    #####  #      #      
 #   #  #    #       #    #   #  #      #      
 #    # #####        #    #    # ###### ###### 
                                          
*/

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

function getNearestHatzolahKdTree(latitude, longitude) {
  const tree = buildKdTree(cities);
  const currentLocation = { Latitude: latitude, Longitude: longitude };
  return getNearestPoint(tree, currentLocation);
}

/**
 * Tests
*/
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
      Expected: "Miami-Dade"
    },
    {
      Latitude: 40.850583,
      Longitude: -73.929665,
      Expected: "Washington Heights"
    }
  ];

  console.log('testing kdtree');
  for (let location of testLocations) {
    const result = getNearestHatzolahKdTree(location.Latitude, location.Longitude);
    console.assert(
      result.Area === location.Expected,
      `Expected ${location.Expected} but got ${result.Area}`
    );
  }

  console.log('testing quadtree');
  for (let location of testLocations) {
    const result = getNearestHatzolahQuadTree(location.Latitude, location.Longitude);
    console.assert(
      result.Area === location.Expected,
      `Expected ${location.Expected} but got ${result.Area}`
    );
  }
}

//tests();
