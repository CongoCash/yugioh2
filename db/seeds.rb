Card.destroy_all
User.destroy_all
Deck.destroy_all

# yugi = Nokogiri::HTML(open('https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&sess=1&pid=13301000&rp=99999'))
#
# for i in 0..10
#   Card.create([{
#     card_name: yugi.css('.card_status strong')[i].text,
#     attack: yugi.css('.atk_power')[0].text.split(" ")[1],
#     defense: yugi.css('.def_power')[0].text.split(" ")[1]
#                }])
# end


Card.create([
  {
    card_name: "Mystical Elf",
    attack: 1800,
    defense: 2000,
    selected: false,
    id: 3,
  },
  {
    card_name: "Feral Imp",
    attack: 1200,
    defense: 2000,
    selected: false,
    id: 4,
  },
  {
    card_name: "Kuriboh",
    attack: 200,
    defense: 300,
    selected: false,
    id: 5,
  },
  {
    card_name: "Summoned Skull",
    attack: 2500,
    defense: 2000,
    selected: false,
    id: 6,
  },
  {
    card_name: "Beaver Warrior",
    attack: 1100,
    defense: 2000,
    selected: false,
    id: 7,
  },
  {
    card_name: "Dark Magician",
    attack: 2500,
    defense: 2000,
    selected: false,
    id: 8,
  },
  {
    card_name: "Gaia The Fierce Knight",
    attack: 2800,
    defense: 1000,
    selected: false,
    id: 9,
  },
  {
    card_name: "Curse of Dragon",
    attack: 800,
    defense: 2000,
    selected: false,
    id: 10,
  },
  {
    card_name: "Celtic Guardian",
    attack: 1800,
    defense: 1000,
    selected: false,
    id: 11,
  },
  {
    card_name: "Mammoth Graveyard",
    attack: 1500,
    defense: 1000,
    selected: false,
    id: 12,
  },
])

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