//Replace with your actual API keys
const apiKeys = {
  unsplash: "YOUR_UNSPLASH_API_KEY",
  pexels: "YOUR_PEXELS_API_KEY",
  pixabay: "YOUR_PIXABAY_API_KEY"
};

let images = [
  {
    "text": "green plant stem in close up photography",
    "full": "https://images.unsplash.com/photo-1597211165861-29ef11229300?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw3fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1597211165861-29ef11229300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw3fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "turned on pendant lamps",
    "full": "https://images.unsplash.com/photo-1559039616-33af37c928fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw4fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1559039616-33af37c928fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw4fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "a blurry photo of a city street at night",

    "full": "https://images.unsplash.com/photo-1535488518105-67f15b7cab27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw0fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1535488518105-67f15b7cab27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw0fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "a close up of water droplets on a window",
    "full": "https://images.unsplash.com/photo-1557724630-96de91632c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxfHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1557724630-96de91632c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxfHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "black bicycle on green grass field near sea during daytime",
    "full": "https://images.unsplash.com/photo-1629971459025-2c73de204a6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwyfHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1629971459025-2c73de204a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwyfHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "people sitting on beach chairs near beach during daytime",
    "full": "https://images.unsplash.com/photo-1629970815849-402b18449245?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw1fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1629970815849-402b18449245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw1fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "a close up of a bird cage with a blurry background",
    "full": "https://images.unsplash.com/photo-1671996610887-888bda279b38?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw2fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1671996610887-888bda279b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw2fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
    },
  {
    "text": "a pair of scissors sitting on top of a yellow and orange background",
    "full": "https://images.unsplash.com/photo-1557800634-95f2a96fbd64?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwzfHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1557800634-95f2a96fbd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwzfHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
    },
  {
    "text": "a bush with green leaves covered in water droplets",
    "full": "https://images.unsplash.com/photo-1704049492642-230f8ec66166?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw5fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1704049492642-230f8ec66166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHw5fHx1bmRlZmluZWR8ZW58MHx8fHwxNzA2OTc0MDA1fDA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "red and green leaves plant",
    "full": "https://images.unsplash.com/photo-1602690406450-df41069e4778?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxMHx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1602690406450-df41069e4778?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxMHx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "yellow and red leaves in tilt shift lens",
    "full": "https://images.unsplash.com/photo-1613236116431-56bc4aabe4ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxMXx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1613236116431-56bc4aabe4ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxMXx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "selective focus photography of purple petaled flower",
    "full": "https://images.unsplash.com/photo-1531815282385-5e55ccbe64c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxMnx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1531815282385-5e55ccbe64c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxMnx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "green leaf plant in close up photography",
    "full": "https://images.unsplash.com/photo-1631376158521-7055df9fba09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxM3x8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1631376158521-7055df9fba09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxM3x8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "a close up of a bush with green leaves",
    "full": "https://images.unsplash.com/photo-1704049492643-e4d894759972?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxNHx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1704049492643-e4d894759972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxNHx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    "text": "round red fruit",
    "full": "https://images.unsplash.com/photo-1554573885-3c78c628739e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxNXx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=85",
    "url": "https://images.unsplash.com/photo-1554573885-3c78c628739e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTU1MzJ8MHwxfHNlYXJjaHwxNXx8dW5kZWZpbmVkfGVufDB8fHx8MTcwNjk3NDAwNXww&ixlib=rb-4.0.3&q=80&w=1080"
    }
  ];