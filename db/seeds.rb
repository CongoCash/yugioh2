require 'open-uri'
require 'httparty'
Card.destroy_all
Yugi.destroy_all
User.destroy_all
Deck.destroy_all

# yugi = Nokogiri::HTML(open('https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&sess=1&pid=13301000&rp=99999'))
api = 'https://www.ygohub.com/api/card_info?name='

yugi_monsters = ['Battle%20Steer', 'Beaver%20Warrior', 'Celtic%20Guardian',
                 'Curse%20of%20Dragon', 'Dark%20Magician', 'Feral%20Imp',
                 'Gaia%20The%20Fierce%20Knight', 'Giant%20Soldier%20of%20Stone', 'Griffore',
                 'Horn%20Imp', 'Koumori%20Dragon', 'Left%20Arm%20of%20the%20Forbidden%20One',
                 'Left%20Leg%20of%20the%20Forbidden%20One', 'Mammoth%20Graveyard', 'Mystical%20Elf',
                 'Right%20Arm%20of%20the%20Forbidden%20One', 'Right%20Leg%20of%20the%20Forbidden%20One',
                 'Rude%20Kaiser', 'Silver%20Fang', 'Summoned%20Skull',
                 'Torike', 'Zombie%20Warrior', 'Exodia%20the%20Forbidden%20One',
                 'Dark%20Hole']

kaiba_monsters = [
  'Battle%20Ox',
  'Blue-Eyes%20White%20Dragon',
  'Grappler',
  'Gyakutenno%20Megami',
  'Hitotsu-Me%20Giant',
  'Judge%20Man',
  'La%20Jinn%20the%20Mystical%20Genie%20of%20the%20Lamp',
  'Mystic%20Horseman',
  'Rude%20Kaiser',
  'Ryu-Kishin%20Powered',
  'Saggi%20the%20Dark%20Clown',
  'Gadget%20Soldier',
  'Hyozanryu',
  'Vorse%20Raider',
  'X-Head%20Cannon'
]

for i in 0..yugi_monsters.length-1
  response = HTTParty.get(api+ yugi_monsters[i])
  json = JSON.parse(response.body)['card']
  Yugi.create({
    card_name: json['name'],
    attack: json['attack'],
    defense: json['defense'],
    stars: json['stars'],
    card_type: json['type'],
    description: json['text'],
    image_url: json['image_path'],
              })
end

for j in 0..kaiba_monsters.length-1
  response = HTTParty.get(api+ kaiba_monsters[j])
  json = JSON.parse(response.body)['card']
  Kaiba.create({
                card_name: json['name'],
                attack: json['attack'],
                defense: json['defense'],
                stars: json['stars'],
                card_type: json['type'],
                description: json['text'],
                image_url: json['image_path'],
              })
end

User.create([{
  username: "david",
  password: "test"
  },
  {
    username: "test",
    password: "test"
  }])

Deck.create([{
  cards_id: 3,
  users_id: 1
            },
  {
    cards_id: 4,
    users_id: 1
  },
  {
   cards_id: 5,
   users_id: 1
  },
  {
  cards_id: 6,
  users_id: 1
  },
  {
  cards_id: 7,
  users_id: 1
  },
  {
  cards_id: 8,
  users_id: 1
  },
  {
  cards_id: 9,
  users_id: 1
  },
  {
  cards_id: 10,
  users_id: 1
  },
  {
  cards_id: 3,
  users_id: 1
  },
  {
  cards_id: 4,
  users_id: 1
  },
  {cards_id: 3,
  users_id: 2
  },
  {
   cards_id: 4,
   users_id: 2
  },
  {
   cards_id: 5,
   users_id: 2
  },
  {
   cards_id: 6,
   users_id: 2
  },
  {
   cards_id: 7,
   users_id: 2
  },
  {
   cards_id: 8,
   users_id: 2
  },
  {
   cards_id: 9,
   users_id: 2
  },
  {
   cards_id: 10,
   users_id: 2
  },
  {
   cards_id: 3,
   users_id: 2
  },
  {
   cards_id: 4,
   users_id: 2
  }
  ])
