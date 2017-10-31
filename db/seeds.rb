require 'open-uri'
Card.destroy_all
User.destroy_all
Deck.destroy_all

yugi = Nokogiri::HTML(open('https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&sess=1&pid=13301000&rp=99999'))

images = ['http://940ee6dce6677fa01d25-0f55c9129972ac85d6b1f4e703468e6b.r99.cf2.rackcdn.com/products/pictures/131307.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/717bZz1aPYL._SY550_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/71tRlxtm5wL._SY450_.jpg',
  'http://assets.dacw.co/itemimages/6683.jpg',
  'https://vignette.wikia.nocookie.net/yugioh/images/1/1c/BeaverWarrior-YGLD-EN-C-1E.png/revision/latest/scale-to-width-down/300?cb=20170812192624',
  'http://vignette2.wikia.nocookie.net/myyugiohdeck/images/6/6e/DarkMagician-CT13-EN-UR-LE.png/revision/latest?cb=20160908033031',
  'http://940ee6dce6677fa01d25-0f55c9129972ac85d6b1f4e703468e6b.r99.cf2.rackcdn.com/products/pictures/130705.jpg',
  'https://vignette.wikia.nocookie.net/yugioh/images/c/c8/CurseofDragon-YGLD-EN-C-1E.png/revision/latest/scale-to-width-down/300?cb=20170812185941',
  'https://images-na.ssl-images-amazon.com/images/I/51MJU6iQkJL._SY450_.jpg',
  'https://vignette.wikia.nocookie.net/yugioh/images/2/24/MammothGraveyard-YGLD-EN-C-1E.png/revision/latest/scale-to-width-down/300?cb=20170812194134',
  'https://vignette2.wikia.nocookie.net/yugioh/images/d/d5/GreatWhite-SYE-EN-C-UE.png/revision/latest?cb=20150417180638',
  'https://vignette2.wikia.nocookie.net/yugioh/images/2/2a/SilverFang-LCYW-EN-UR-1E.jpg/revision/latest?cb=20121003155910',
  'https://vignette4.wikia.nocookie.net/yugioh/images/a/a4/GiantSoldierofStone-SDMY-EN-C-1E.png/revision/latest?cb=20161021200132',
  'http://vignette2.wikia.nocookie.net/yugioh/images/3/32/DragonZombie-LCJW-EN-C-1E.png/revision/latest?cb=20131013121017',
  'http://vignette2.wikia.nocookie.net/yugioh/images/9/9e/DomaTheAngelofSilence-MRD-EN-C-UE.png/revision/latest?cb=20150508165718'
]

for i in 0..images.length
  Card.create([{
    card_name: yugi.css('.card_status strong')[i].text,
    attack: yugi.css('.atk_power')[i].text.split(" ")[1],
    defense: yugi.css('.def_power')[i].text.split(" ")[1],
    description: yugi.css('.box_card_text')[i].text.split("\r\n\t\t\r\n\t\t\t\t\t\t\t\t\t\t")[1].split("\r\n\t\t\r\n\t\t\t\t\t\t\t\t\t")[0],
    image_url: images[i],
  }])
end


# Card.create([
#   {
#     card_name: "Mystical Elf",
#     attack: 1800,
#     defense: 2000,
#     selected: false,
#     id: 3,
#     position: 'hand'
#   },
#   {
#     card_name: "Feral Imp",
#     attack: 1200,
#     defense: 2000,
#     selected: false,
#     id: 4,
#     position: 'hand'
#   },
#   {
#     card_name: "Kuriboh",
#     attack: 200,
#     defense: 300,
#     selected: false,
#     id: 5,
#     position: 'hand'
#   },
#   {
#     card_name: "Summoned Skull",
#     attack: 2500,
#     defense: 2000,
#     selected: false,
#     id: 6,
#   },
#   {
#     card_name: "Beaver Warrior",
#     attack: 1100,
#     defense: 2000,
#     selected: false,
#     id: 7,
#     position: 'hand'
#   },
#   {
#     card_name: "Dark Magician",
#     attack: 2500,
#     defense: 2000,
#     selected: false,
#     id: 8,
#   },
#   {
#     card_name: "Gaia The Fierce Knight",
#     attack: 2800,
#     defense: 1000,
#     selected: false,
#     id: 9,
#     position: 'hand'
#   },
#   {
#     card_name: "Curse of Dragon",
#     attack: 800,
#     defense: 2000,
#     selected: false,
#     id: 10,
#     position: 'hand'
#   },
#   {
#     card_name: "Celtic Guardian",
#     attack: 1800,
#     defense: 1000,
#     selected: false,
#     id: 11,
#     position: 'hand'
#   },
#   {
#     card_name: "Mammoth Graveyard",
#     attack: 1500,
#     defense: 1000,
#     selected: false,
#     id: 12,
#     position: 'hand'
#   },
# ])

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
# Card.create([
#   {
#     card_name: "Dark Magician",
#     attack: 2500,
#     defense: 2000,
#     card_type: "dark",
#     stars: 6,
#     card_attribute: "monster",
#     description: "yugi's dark magician"
#   },
#   {
#     card_name: "Dark Magician Girl",
#     attack: 2000,
#     defense: 1500,
#     card_type: "dark",
#     stars: 5,
#     card_attribute: "monster",
#     description: "yugi's dark magician girl"
#   },
#   {
#     card_name: "Summoned Skull",
#     attack: 2500,
#     defense: 1200,
#     card_type: "dark",
#     stars: 6,
#     card_attribute: "monster",
#     description: "yugi's summoned skull"
#   },
#   {
#     card_name: "Dark Magician Girl",
#     attack: 2000,
#     defense: 1500,
#     card_type: "dark",
#     stars: 5,
#     card_attribute: "monster",
#     description: "yugi's dark magician girl"
#   }
#             ])