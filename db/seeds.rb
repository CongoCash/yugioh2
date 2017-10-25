Card.destroy_all

yugi = Nokogiri::HTML(open('https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&sess=1&pid=13301000&rp=99999'))

for i in 0..10
  Card.create([{
    card_name: yugi.css('.card_status strong')[i].text,
    attack: yugi.css('.atk_power')[0].text.split(" ")[1],
    defense: yugi.css('.def_power')[0].text.split(" ")[1]
               }])
end

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